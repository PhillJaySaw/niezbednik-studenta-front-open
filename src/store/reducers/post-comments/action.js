/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-api-middleware';
import { setAuthToken } from '../../../api/header';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';
import { store } from '../..';

const changeCommentsSize = (action, postId) => ({
  type: types.CHANGE_COMMENT_SIZE,
  payload: {
    action,
    postId,
  },
});

export const fetchPostCommentsData = (postId, page) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${postId}/comments?sort=date,desc&page=${page}&size=5`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_POST_COMMENTS_PENDING,
          types.FETCH_POST_COMMENTS_SUCCESS,
          types.FETCH_POST_COMMENTS_ERROR,
        ],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const addPostComment = (postId, content, isAnswer) => {
  const data = JSON.stringify({
    content,
    isAnswer,
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${postId}/add-comment`,
        method: 'POST',
        body: data,
        headers: setAuthToken(),
        types: [types.ADD_COMMENT_STARTED, types.ADD_COMMENT_SUCCESS, types.ADD_COMMENT_FAILURE],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      store.dispatch(changeCommentsSize('ADD', postId));
      dispatch(fetchPostCommentsData(postId, 0));
    }

    return actionResponse;
  };
};

export const editComment = (id, content) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/comment/${id}`,
        method: 'PUT',
        body: JSON.stringify({ content }),
        headers: setAuthToken(),
        types: [
          types.EDIT_COMMENT_STARTED,
          { type: types.EDIT_COMMENT_SUCCESS, payload: { id, content } },
          types.EDIT_COMMENT_FAILURE,
        ],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteComment = (id, postId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/comment/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [
          types.DELETE_COMMENT_STARTED,
          types.DELETE_COMMENT_SUCCESS,
          types.DELETE_COMMENT_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      if (actionResponse.type === types.DELETE_COMMENT_SUCCESS) {
        store.dispatch(changeCommentsSize('DELETE', postId));
      }
      dispatch(fetchPostCommentsData(postId, 0));
    }

    return actionResponse;
  };
};

export const userLikeComment = (commentId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/comment/${commentId}/add-like`,
        method: 'POST',
        headers: setAuthToken(),
        types: [
          types.COMMENT_LIKE_REQUEST,
          {
            type: types.COMMENT_LIKE_SUCCESS,
            payload: { commentId },
          },
          types.COMMENT_LIKE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received error', actionResponse);
    }

    return actionResponse;
  };
};

export const acceptAnswer = (commentId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/comment/${commentId}/accept-answer`,
        method: 'POST',
        headers: setAuthToken(),
        types: [
          types.ACCEPT_ANSWER_REQUEST,
          {
            type: types.ACCEPT_ANSWER_SUCCESS,
            payload: { commentId },
          },
          types.ACCEPT_ANSWER_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received error', actionResponse);
    }

    return actionResponse;
  };
};
