import { createAction } from 'redux-api-middleware';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import * as types from './types';
import { endpointUrl } from '../../../helpers/endpointUrl';
import { setAuthToken } from '../../../api/header';
import { getIntl } from '../../../helpers/intl';

const intl = getIntl();

export const sendReport = (data) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}ticket`,
        method: 'POST',
        headers: setAuthToken(),
        body: JSON.stringify(data),
        types: [types.SEND_REPORT_PENDING, types.SEND_REPORT_SUCCESS, types.SEND_REPORT_ERROR],
      }),
    );
    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    } else {
      Swal.fire({
        icon: 'success',
        text: intl.formatMessage({ id: 'message-box.send-report.success' }),
      });
    }

    return actionResponse;
  };
};

export const fetchNotifications = (page) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}ticket?sort=createdDate,desc&page=${page}&size=30`,
        method: 'GET',
        headers: setAuthToken(),
        types: [
          types.FETCH_NOTIFICATIONS_PENDING,
          types.FETCH_NOTIFICATIONS_SUCCESS,
          types.FETCH_NOTIFICATIONS_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};

export const deleteNotification = (id) => {
  return async (dispatch) => {
    const actionResponse = await dispatch(
      createAction({
        endpoint: `${endpointUrl}ticket/${id}`,
        method: 'DELETE',
        headers: setAuthToken(),
        types: [
          types.DELETE_NOTIFICATION_PENDING,
          types.DELETE_NOTIFICATION_SUCCESS,
          types.DELETE_NOTIFICATION_ERROR,
        ],
      }),
    );

    if (actionResponse.error) {
      throw new Error('Promise flow received actioin error', actionResponse);
    }

    return actionResponse;
  };
};
