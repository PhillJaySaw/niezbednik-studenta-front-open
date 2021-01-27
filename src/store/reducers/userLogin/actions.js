import { RSAA, createAction } from 'redux-api-middleware';
import * as types from './types';
import { endpointUrl, frontUrl } from '../../../helpers/endpointUrl';
import { checkUserNotifications, fetchUserData } from '../user/action';
import { setAuthToken } from '../../../api/header';

const REQUEST = types.GET_LOGIN_LINK_REQUEST;
const RECEIVE = types.GET_LOGIN_LINK_SUCCESS;
const FAILURE = types.GET_LOGIN_LINK_FAILURE;

export function getLoginLink() {
  return {
    [RSAA]: {
      endpoint: `${endpointUrl}authorization/request-token?oauthCallback=${frontUrl}`,
      method: 'GET',
      types: [REQUEST, RECEIVE, FAILURE],
    },
  };
}

export function getAccessToken(token, secretToken, oauthVerifier) {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}authorization/access-token?oauthToken=${token}&oauthTokenSecret=${secretToken}&oauthVerifier=${oauthVerifier}`,
        method: 'GET',
        types: [
          types.GET_ACCESS_TOKEN_REQUEST,
          types.GET_ACCESS_TOKEN_SUCCESS,
          types.GET_ACCESS_TOKEN_FAILURE,
        ],
      }),
    ).then((value) => {
      if (value && value.type.includes('SUCCESS')) {
        dispatch(fetchUserData()).then((value) => {
          if (value && value.type.includes('SUCCESS')) {
            dispatch(checkUserNotifications());
          }
        });
      }
    });

    if (
      actionResponse !== undefined &&
      typeof actionResponse.error !== 'undefined' &&
      actionResponse.error
    ) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
}

export function userLogout(oauthToken, oauthTokenSecret) {
  return async (dispatch) => {
    const actionRespone = await dispatch(
      createAction({
        endpoint: `${endpointUrl}authorization/logout?oauthToken=${oauthToken}&oauthTokenSecret=${oauthTokenSecret}`,
        method: 'GET',
        types: [types.USER_LOGOUT_REQUEST, types.USER_LOGOUT_SUCCESS, types.USER_LOGOUT_FAILURE],
      }),
    );

    if (actionRespone.error) {
      throw new Error('Promise flow received actioin error', actionRespone);
    }

    return actionRespone;
  };
}
