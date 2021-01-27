import * as type from './types';

const initialState = {
  pending: false,
  notifications: [],
  totalElements: 0,
  error: '',
  totalPages: 0,
};

const adminNotifications = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_NOTIFICATIONS_PENDING:
    case type.SEND_REPORT_PENDING:
    case type.DELETE_NOTIFICATION_PENDING:
      return {
        ...state,
        pending: true,
      };
    case type.FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        notifications:
          Object.keys(state.notifications).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.notifications, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages,
      };
    case type.SEND_REPORT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        totalElements: state.totalElements + 1,
      };
    case type.DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        pending: false,
        notifications: [
          ...state.notifications.filter((notification) => notification.id !== action.payload),
        ],
        totalElements: state.totalElements - 1,
      };
    case type.FETCH_NOTIFICATIONS_ERROR:
    case type.SEND_REPORT_ERROR:
    case type.DELETE_NOTIFICATION_ERROR:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default adminNotifications;
