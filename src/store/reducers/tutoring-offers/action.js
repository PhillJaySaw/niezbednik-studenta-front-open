/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-api-middleware';
import { setAuthToken } from '../../../api/header';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';

export const fetchTutoringOffersData = (
  page,
  userFilter = null,
  courseName = null,
  type = null,
) => {
  const data = JSON.stringify({
    userFilter,
    courseName,
    type,
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}private-lessons/all?sort=createdDate,desc&page=${page}&size=30`,
        method: 'POST',
        body: data,
        headers: setAuthToken(),
        types: [
          types.FETCH_TUTORING_OFFERS_PENDING,
          types.FETCH_TUTORING_OFFERS_SUCCESS,
          types.FETCH_TUTORING_OFFERS_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteTutoringOffer = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}private-lessons/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [
          types.DELETE_TUTORING_OFFER_STARTED,
          types.DELETE_TUTORING_OFFER_SUCCESS,
          types.DELETE_TUTORING_OFFER_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchTutoringOffersData(0));
    }

    return actionResponse;
  };
};

export const addTutoringOffer = (type, content, courseId) => {
  const data = JSON.stringify({
    type,
    content,
    course: {
      id: courseId,
    },
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}private-lessons`,
        method: 'POST',
        body: data,
        headers: setAuthToken(),
        types: [
          types.ADD_TUTORING_OFFER_STARTED,
          types.ADD_TUTORING_OFFER_SUCCESS,
          types.ADD_TUTORING_OFFER_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      dispatch(fetchTutoringOffersData(0));
    }

    return actionResponse;
  };
};

export const editTutoringOffer = (type, content, course, offerId) => {
  const data = JSON.stringify({
    type,
    content,
    course: {
      id: course.id,
    },
  });

  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}private-lessons/${offerId}`,
        method: 'PUT',
        body: data,
        headers: setAuthToken(),
        types: [
          types.EDIT_TUTORING_OFFER_STARTED,
          {
            type: types.EDIT_TUTORING_OFFER_SUCCESS,
            payload: { offerId, type, course, content },
          },
          types.EDIT_TUTORING_OFFER_FAILURE,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const addOfferInterest = (offerId) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}private-lessons/${offerId}/interested`,
        method: 'PUT',
        headers: setAuthToken(),
        types: [
          types.OFFER_INTEREST_PENDING,
          {
            type: types.OFFER_INTEREST_SUCCESS,
            payload: offerId,
          },
          types.OFFER_INTEREST_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};
