import { store } from '../store';

export const defaultHeaders = (headers = {}) => ({
  ...headers,
  'Content-Type': 'application/json',
});

export const setAuthToken = (headers = {}) => {
  const state = store.getState();
  return {
    ...defaultHeaders(headers),
    token: state.userLogin.oAuthToken,
    secretToken: state.userLogin.oAuthTokenSecret,
  };
};

export const getCurrentUser = () => {
  const state = store.getState();
  return `${state.user.user.name} ${state.user.user.surname}`;
};

export const getAuthTokens = () => {
  const state = store.getState();
  return {
    token: state.userLogin.oAuthToken,
    secretToken: state.userLogin.oAuthTokenSecret,
  };
};
