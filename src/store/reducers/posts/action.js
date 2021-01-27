/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-api-middleware';
import { setAuthToken } from '../../../api/header';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';

export const fetchPostsData = (courseId, page, data) => {
  let endpoint = `${endpointUrl}forum/${courseId}/posts`;
  if (page !== null) {
    endpoint = `${endpointUrl}forum/${courseId}/posts?sort=date,desc&page=${page}&size=30`;
  }
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: endpoint,
        method: 'POST',
        headers: setAuthToken(),
        body: data !== undefined ? JSON.stringify(data) : '',
        types: [types.FETCH_POSTS_PENDING, types.FETCH_POSTS_SUCCESS, types.FETCH_POSTS_ERROR],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deletePost = (courseId, id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [types.DELETE_POST_STARTED, types.DELETE_POST_SUCCESS, types.DELETE_POST_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchPostsData(courseId, 0));
    }

    return actionResponse;
  };
};

export const userLikePost = (postId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${postId}/add-like`,
        method: 'POST',
        headers: setAuthToken(),
        types: [
          types.POST_LIKE_REQUEST,
          {
            type: types.POST_LIKE_SUCCESS,
            payload: { postId },
          },
          types.POST_LIKE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse);
    }

    return actionResponse;
  };
};

export const addPost = (courseId, content) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${courseId}/add-post`,
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: setAuthToken(),
        types: [types.ADD_POST_STARTED, types.ADD_POST_SUCCESS, types.ADD_POST_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchPostsData(courseId, 0));
    }

    return actionResponse;
  };
};

export const editPost = (postId, content) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${postId}`,
        method: 'PUT',
        body: JSON.stringify({ content }),
        headers: setAuthToken(),
        types: [
          types.EDIT_POST_STARTED,
          { type: types.EDIT_POST_SUCCESS, payload: { postId, content } },
          types.EDIT_POST_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const fetchPostById = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}forum/${id}`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_POST_BY_ID_PENDING,
          types.FETCH_POST_BY_ID_SUCCESS,
          types.FETCH_POST_BY_ID_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }
    return actionResponse;
  };
};
