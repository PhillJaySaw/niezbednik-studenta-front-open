/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-api-middleware';
import { setAuthToken } from '../../../api/header';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';

export const fetchLinksData = (page) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}useful-link?page=${page}&size=30`,
        method: 'GET',
        headers: setAuthToken(),
        types: [types.FETCH_LINKS_PENDING, types.FETCH_LINKS_SUCCESS, types.FETCH_LINKS_ERROR],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteLink = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}useful-link/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [types.DELETE_LINK_STARTED, types.DELETE_LINK_SUCCESS, types.DELETE_LINK_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchLinksData(0));
    }

    return actionResponse;
  };
};

export const addLink = (name, url) => {
  const data = JSON.stringify({
    name,
    url,
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}useful-link`,
        method: 'POST',
        body: data,
        headers: setAuthToken(),
        types: [types.ADD_LINK_STARTED, types.ADD_LINK_SUCCESS, types.ADD_LINK_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchLinksData(0));
    }

    return actionResponse;
  };
};
