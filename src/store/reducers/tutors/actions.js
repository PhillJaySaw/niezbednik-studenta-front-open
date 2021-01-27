import { createAction } from 'redux-api-middleware';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';
import { setAuthToken } from '../../../api/header';

const fetchTutorData = (page, sortParam, data) => {
  let endpoint = `${endpointUrl}coordinator/all`;
  let sort = sortParam ? sortParam : 'id,desc';
  if (page !== undefined && page !== null) {
    endpoint = `${endpointUrl}coordinator/all?sort=${sort}&page=${page}&size=30`;
  } else {
    endpoint = `${endpointUrl}coordinator/all?&page=${0}&size=100`;
  }
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: endpoint,
        method: 'POST',
        body: data !== undefined ? JSON.stringify(data) : '',
        headers: setAuthToken(),
        types: [types.FETCH_TUTOR_PENDING, types.FETCH_TUTOR_SUCCESS, types.FETCH_TUTOR_ERROR],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteTutor = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}coordinator/${id}`,
        headers: setAuthToken(),
        method: 'DELETE',
        types: [types.DELETE_TUTOR_STARTED, types.DELETE_TUTOR_SUCCESS, types.DELETE_TUTOR_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchTutorData(0));
    }

    return actionResponse;
  };
};

export const addTutor = (coordinatorDegree, name, surname, page, information) => {
  const data = JSON.stringify({
    coordinatorDegree,
    name,
    surname,
    page,
    information,
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}coordinator`,
        method: 'POST',
        body: data,
        headers: setAuthToken(),
        types: [types.ADD_TUTOR_STARTED, types.ADD_TUTOR_SUCCESS, types.ADD_TUTOR_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchTutorData(0));
    }

    return actionResponse;
  };
};

export const editTutor = (data) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}coordinator`,
        method: 'PUT',
        body: JSON.stringify(data),
        headers: setAuthToken(),
        types: [
          types.EDIT_TUTOR_STARTED,
          {
            type: types.EDIT_TUTOR_SUCCESS,
            payload: data,
          },
          types.EDIT_TUTOR_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const fetchTutorCoursesData = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}coordinator/${id}/courses`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_TUTOR_COURSES_PENDING,
          types.FETCH_TUTOR_COURSES_SUCCESS,
          types.FETCH_TUTOR_COURSES_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export default fetchTutorData;
