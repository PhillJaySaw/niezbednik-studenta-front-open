import { createAction } from 'redux-api-middleware';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';
import { setAuthToken } from '../../../api/header';

export function sendFCMToken(token) {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}user/token?token=${token}`,
        method: 'PUT',
        headers: setAuthToken(),
        types: [
          types.SEND_FIREBASE_TOKEN_PENDING,
          {
            type: types.SEND_FIREBASE_TOKEN_SUCCESS,
            payload: { token },
          },
          types.SEND_FIREBASE_TOKEN_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }
    return actionResponse;
  };
}
