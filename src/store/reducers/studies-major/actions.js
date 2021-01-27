import { createAction } from 'redux-api-middleware';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';

const REQUEST = types.FETCH_STUDIES_MAJOR_PENDING;
const RECEIVE = types.FETCH_STUDIES_MAJOR_SUCCESS;
const FAILURE = types.FETCH_STUDIES_MAJOR_ERROR;

const fetchStudiesMajorData = () => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}studies-major`,
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

export default fetchStudiesMajorData;
