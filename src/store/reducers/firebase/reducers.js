import * as type from './types';

const initialState = {
  pending: false,
  firebaseToken: '',
  error: '',
};

const firebase = (state = initialState, action) => {
  switch (action.type) {
    case type.SEND_FIREBASE_TOKEN_PENDING:
      return {
        ...state,
        pending: true,
      };
    case type.SEND_FIREBASE_TOKEN_SUCCESS:
      return {
        ...state,
        firebaseToken: action.payload.token,
        pending: false,
      };
    case type.SEND_FIREBASE_TOKEN_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default firebase;
