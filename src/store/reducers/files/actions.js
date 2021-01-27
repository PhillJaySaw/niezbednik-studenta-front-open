import { createAction } from 'redux-api-middleware';
import * as types from './types';
import { setAuthToken } from '../../../api/header';
import { endpointUrl } from '../../../helpers/endpointUrl';

export function uploadFile({ courseId, file }) {
  const formData = new FormData();
  formData.append('file', file);
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}${courseId}/file/upload`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          secretToken: setAuthToken().secretToken,
          token: setAuthToken().token,
        },
        body: formData,
        types: [
          types.UPLOAD_FILE_PENDING,
          {
            type: types.UPLOAD_FILE_SUCCESS,
            payload: { file },
          },
          types.UPLOAD_FILE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse);
    } else {
      dispatch(getAllFiles(courseId, 0));
    }

    return actionResponse;
  };
}

export function getAllFiles(courseId, page, data) {
  let endpoint = `${endpointUrl}${courseId}/file/all`;
  if (page !== null) {
    endpoint = `${endpointUrl}${courseId}/file/all?sort=createdDate,desc&page=${page}&size=30`;
  }

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: endpoint,
        method: 'POST',
        headers: setAuthToken(),
        body: data !== undefined ? JSON.stringify(data) : '',
        types: [
          types.GET_FILES_LIST_PENDING,
          types.GET_FILES_LIST_SUCCESS,
          types.GET_FILES_LIST_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse);
    }

    return actionResponse;
  };
}

export function getFile(courseId, fileId) {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}${courseId}/file/${fileId}`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.GET_FILE_PENDING,
          {
            type: types.GET_FILE_SUCCESS,
            payload: (action, state, res) => res.url,
          },
          types.GET_FILE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse);
    }

    return actionResponse;
  };
}

export function deleteFile(courseId, fileId) {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}${courseId}/file/${fileId}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [
          types.DELETE_FILE_PENDING,
          {
            type: types.DELETE_FILE_SUCCESS,
            payload: { fileId },
          },
          types.DELETE_FILE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received action error', actionResponse);
    } else {
      dispatch(getAllFiles(courseId, 0));
    }

    return actionResponse;
  };
}
