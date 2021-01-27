import { createAction } from 'redux-api-middleware';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';

const REQUEST = types.FETCH_TERM_PENDING;
const RECEIVE = types.FETCH_TERM_SUCCESS;
const FAILURE = types.FETCH_TERM_ERROR;

const fetchTermData = () => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}term`,
        method: 'GET',
        types: [REQUEST, RECEIVE, FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export default fetchTermData;
