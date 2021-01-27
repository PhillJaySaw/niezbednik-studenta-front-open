import { createAction } from 'redux-api-middleware';
import * as types from './types'
import { endpointUrl } from '../../../helpers/endpointUrl'

const REQUEST = types.FETCH_TUTOR_DEGREE_PENDING;
const RECEIVE = types.FETCH_TUTOR_DEGREE_SUCCESS;
const FAILURE = types.FETCH_TUTOR_DEGREE_ERROR;


const fetchTutorDegreeData = () => {
    return async (dispatch) => {
        const actionResponse = await dispatch(
            createAction({
                endpoint: `${endpointUrl}coordinator-degree`,
                method: 'GET',
                types: [
                    REQUEST, RECEIVE, FAILURE
                ]
            })
        )

        if (actionResponse.error) {
            throw new Error('Promise flow received actioin error', actionResponse);
        }

        return actionResponse;
    }
}

export default fetchTutorDegreeData;