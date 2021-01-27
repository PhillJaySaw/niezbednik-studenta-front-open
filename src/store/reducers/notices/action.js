/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-api-middleware';
import { setAuthToken } from '../../../api/header';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';

export const fetchNoticesData = (page, data) => {
  let endpoint = `${endpointUrl}notice/all`;
  if (page !== null) {
    endpoint = `${endpointUrl}notice/all?sort=createdDate,desc&page=${page}&size=30`;
  }
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: endpoint,
        method: 'POST',
        headers: setAuthToken(),
        body: data !== undefined ? JSON.stringify(data) : '',
        types: [
          types.FETCH_NOTICES_PENDING,
          types.FETCH_NOTICES_SUCCESS,
          types.FETCH_NOTICES_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteNotice = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}notice/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [
          types.DELETE_NOTICE_STARTED,
          types.DELETE_NOTICE_SUCCESS,
          types.DELETE_NOTICE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchNoticesData(0));
    }

    return actionResponse;
  };
};

export const addNotice = (content) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}notice`,
        method: 'POST',
        body: JSON.stringify({ content }),
        headers: setAuthToken(),
        types: [types.ADD_NOTICE_STARTED, types.ADD_NOTICE_SUCCESS, types.ADD_NOTICE_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchNoticesData());
    }

    return actionResponse;
  };
};

export const editNotice = (noticeId, content) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}notice/${noticeId}`,
        method: 'PUT',
        body: JSON.stringify({ content }),
        headers: setAuthToken(),
        types: [
          types.EDIT_NOTICE_STARTED,
          {
            type: types.EDIT_NOTICE_SUCCESS,
            payload: { noticeId, content },
          },
          types.EDIT_NOTICE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};
