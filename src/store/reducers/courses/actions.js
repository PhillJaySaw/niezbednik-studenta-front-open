import { createAction } from 'redux-api-middleware';
import axios from 'axios';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';
import { setAuthToken } from '../../../api/header';

const fetchCoursesData = (data, page, sortParam) => {
  let sort = sortParam ? sortParam : 'id,desc';
  let urlEndpoint = `${endpointUrl}course/all?sort=${sort}`;
  if (data === undefined) data = null;
  if (data === null && page === null) {
    urlEndpoint = `${endpointUrl}course/all?sort=${sort}`;
  }
  if (data === null && page !== undefined) {
    urlEndpoint = `${endpointUrl}course/all?sort=${sort}&page=${page}&size=30`;
  }
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: urlEndpoint,
        method: 'POST',
        headers: setAuthToken(),
        body: data !== null ? JSON.stringify(data) : '',
        types: [
          types.FETCH_COURSES_PENDING,
          types.FETCH_COURSES_SUCCESS,
          types.FETCH_COURSES_ERROR,
        ],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteCourse = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course/${id}`,
        headers: setAuthToken(),
        method: 'DELETE',
        types: [
          types.DELETE_COURSE_STARTED,
          types.DELETE_COURSE_SUCCESS,
          types.DELETE_COURSE_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchCoursesData(null, 0));
    }

    return actionResponse;
  };
};

export const fetchUserCourses = (data) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course/my-courses`,
        method: 'POST',
        headers: setAuthToken(),
        body: data !== undefined ? JSON.stringify(data) : '',
        types: [
          types.FETCH_USER_COURSES_PENDING,
          types.FETCH_USER_COURSES_SUCCESS,
          types.FETCH_USER_COURSES_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const addCourse = (name, degrees, studiesMajors, links, terms, coordinators) => {
  const data = JSON.stringify({
    name,
    courseInformation: {
      degrees,
      studiesMajors,
      links,
      terms,
      coordinators,
    },
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course`,
        method: 'POST',
        body: data,
        headers: setAuthToken(),
        types: [types.ADD_COURSE_STARTED, types.ADD_COURSE_SUCCESS, types.ADD_COURSE_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchCoursesData(null, 0));
    }

    return actionResponse;
  };
};

export const editCourse = (id, name, degrees, studiesMajors, links, terms, coordinators) => {
  const data = JSON.stringify({
    id,
    name,
    courseInformation: {
      degrees,
      studiesMajors,
      links,
      terms,
      coordinators,
    },
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course`,
        method: 'PUT',
        body: data,
        headers: setAuthToken(),
        types: [types.EDIT_COURSE_STARTED, types.EDIT_COURSE_SUCCESS, types.EDIT_COURSE_FAILURE],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchCoursesData(null, 0));
    }

    return actionResponse;
  };
};

export const fetchCourseUsers = (courseId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course/${courseId}/members`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_COURSE_USERS_STARTED,
          types.FETCH_COURSE_USERS_SUCCESS,
          types.FETCH_COURSE_USERS_FAILURE,
        ],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const joinToCourse = (courseId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course/join?courseId=${courseId}`,
        method: 'POST',
        headers: setAuthToken(),
        types: [
          types.JOIN_COURSE_STARTED,
          {
            type: types.JOIN_COURSE_SUCCESS,
            payload: courseId,
          },
          types.JOIN_COURSE_FAILURE,
        ],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const leaveCourse = (courseId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}course/${courseId}/leave`,
        method: 'POST',
        headers: setAuthToken(),
        types: [
          types.LEAVE_COURSE_STARTED,
          {
            type: types.LEAVE_COURSE_SUCCESS,
            payload: courseId,
          },
          types.LEAVE_COURSE_FAILURE,
        ],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const fetchCourseData = async (id) => {
  const result = await axios.get(`${endpointUrl}course/${id}`, {
    headers: setAuthToken(),
  });
  return result.data;
};

export const checkIfUserIsMember = async (id) => {
  const result = await axios.get(`${endpointUrl}course/is-member?courseId=${id}`, {
    headers: setAuthToken(),
  });
  return result.data;
};

export default fetchCoursesData;
