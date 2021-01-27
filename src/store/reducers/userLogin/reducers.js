import * as type from './types';
import getParamsFromUrl from '../../../helpers/getParamsFromUrl';

const initialState = {
  loginUrl: '',
  oAuthToken: '',
  oAuthTokenSecret: '',
  oAuthTokenLogin: '',
  oAuthTokenSecretLogin: '',
  oAuthCallbackConfirmed: false,
  isPending: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.GET_LOGIN_LINK_REQUEST:
      return {
        ...state,
        isPending: true,
      };

    case type.GET_LOGIN_LINK_SUCCESS:
      return {
        ...state,
        loginUrl: action.payload.loginUrl,
        oAuthTokenLogin: getParamsFromUrl(action.payload.loginUrl).oauth_token,
        oAuthTokenSecretLogin: getParamsFromUrl(action.payload.loginUrl).oauth_token_secret,
        oAuthCallbackConfirmed: getParamsFromUrl(action.payload.loginUrl).oauth_callback_confirmed,
        isPending: false,
      };

    case type.GET_LOGIN_LINK_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isPending: false,
      };

    case type.GET_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        isPending: true,
      };

    case type.GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        loginUrl: '',
        oAuthToken: action.payload.oauthToken,
        oAuthTokenSecret: action.payload.oauthTokenSecret,
        oAuthTokenLogin: '',
        oAuthTokenSecretLogin: '',
        oAuthCallbackConfirmed: false,
        isPending: false,
      };

    case type.GET_ACCESS_TOKEN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isPending: false,
      };

    case type.USER_LOGOUT_REQUEST:
      return {
        ...state,
        isPending: true,
      };

    case type.USER_LOGOUT_SUCCESS:
      return initialState;

    case type.USER_LOGOUT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isPending: false,
      };

    default:
      return state;
  }
};
