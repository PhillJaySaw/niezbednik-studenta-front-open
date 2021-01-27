/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-api-middleware';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';
import { setAuthToken } from '../../../api/header';

const REQUEST = types.FETCH_USER_PENDING;
const RECEIVE = types.FETCH_USER_SUCCESS;
const FAILURE = types.FETCH_USER_ERROR;

export const fetchUserData = () => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}user/profile`,
        method: 'GET',
        headers: setAuthToken(),
        types: [REQUEST, RECEIVE, FAILURE],
      }),
    );

    if (typeof actionResponse.error !== 'undefined' && actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }
    return actionResponse;
  };
};

export const fetchUserById = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}user/${id}`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_USER_BY_ID_PENDING,
          types.FETCH_USER_BY_ID_SUCCESS,
          types.FETCH_USER_BY_ID_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }
    return actionResponse;
  };
};

export const fetchUserNotifications = (page) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}notification?sort=createdTime,desc&page=${page}&size=30`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_USER_NOTIFICATIONS_PENDING,
          types.FETCH_USER_NOTIFICATIONS_SUCCESS,
          types.FETCH_USER_NOTIFICATIONS_ERROR,
        ],
      }),
    );

    if (typeof actionResponse.error !== 'undefined' && actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(userReadNotifications());
    }
    return actionResponse;
  };
};

export const deleteUserNotification = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}notification/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [
          types.DELETE_USER_NOTIFICATION_PENDING,
          {
            type: types.DELETE_USER_NOTIFICATION_SUCCESS,
            payload: id,
          },
          types.DELETE_USER_NOTIFICATION_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const userReadNotifications = () => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}user/read`,
        method: 'PUT',
        headers: setAuthToken(),
        types: [
          types.SET_USER_NOTIFICATIONS_PENDING,
          types.SET_USER_NOTIFICATIONS_SUCCESS,
          types.SET_USER_NOTIFICATIONS_ERROR,
        ],
      }),
    );

    if (typeof actionResponse.error !== 'undefined' && actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }
    return actionResponse;
  };
};

export const checkUserNotifications = () => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}notification/is-read`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.CHECK_USER_NOTIFICATIONS_PENDING,
          types.CHECK_USER_NOTIFICATIONS_SUCCESS,
          types.CHECK_USER_NOTIFICATIONS_ERROR,
        ],
      }),
    );

    if (typeof actionResponse.error !== 'undefined' && actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }
    return actionResponse;
  };
};

export const setUserLocale = (locale) => ({
  type: types.SET_USER_LOCALE,
  payload: {
    locale,
  },
});

export const fetchUsers = (page, data) => {
  let urlEndpoint = `${endpointUrl}user/all`;
  if (data === null && page !== null) {
    urlEndpoint = `${endpointUrl}user/all?sort=surname&page=${page}&size=30`;
  }
  if (data === null) {
    data = {
      name: '',
      surname: '',
      isAdmin: 0,
    };
  }

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: urlEndpoint,
        method: 'POST',
        headers: setAuthToken(),
        body: JSON.stringify(data),
        types: [types.FETCH_USERS_PENDING, types.FETCH_USERS_SUCCESS, types.FETCH_USERS_ERROR],
      }),
    );

    if (typeof actionResponse.error !== 'undefined' && actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const setUserEmail = (email) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}user/email`,
        method: 'PUT',
        body: email,
        headers: setAuthToken(),
        types: [
          types.SET_USER_EMAIL_PENDING,
          {
            type: types.SET_USER_EMAIL_SUCCESS,
            payload: email,
          },
          types.SET_USER_EMAIL_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const handleAdminPermissions = (userId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}user/admin/${userId}`,
        method: 'PUT',
        headers: setAuthToken(),
        types: [
          types.HANDLE_ADMIN_PERMISSIONS_PENDING,
          {
            type: types.HANDLE_ADMIN_PERMISSIONS_SUCCESS,
            payload: { userId },
          },
          types.HANDLE_ADMIN_PERMISSIONS_ERROR,
        ],
      }),
    );

    if (typeof actionResponse.error !== 'undefined' && actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};
