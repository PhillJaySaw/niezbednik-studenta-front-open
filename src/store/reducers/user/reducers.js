import * as type from './types';

const initialState = {
  pending: false,
  user: [],
  userById: '',
  userByIdPending: false,
  userNotifications: [],
  notificationsRead: '',
  notificationsPending: false,
  users: [],
  error: '',
  locale: '',
  usersTotalPages: 0,
  usersPageNumber: 0,
  notificationsTotalPages: 0,
  notificationsPageNumber: 0,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_USER_PENDING:
    case type.FETCH_USERS_PENDING:
    case type.SET_USER_EMAIL_PENDING:
    case type.HANDLE_ADMIN_PERMISSIONS_PENDING:
    case type.DELETE_USER_NOTIFICATION_PENDING:
    case type.SET_USER_NOTIFICATIONS_PENDING:
    case type.CHECK_USER_NOTIFICATIONS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case type.FETCH_USER_BY_ID_PENDING:
      return {
        ...state,
        userByIdPending: true,
      };
    case type.FETCH_USER_NOTIFICATIONS_PENDING:
      return {
        ...state,
        notificationsPending: true,
      };
    case type.FETCH_USER_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notificationsPending: false,
        userNotifications:
          Object.keys(state.userNotifications).length === 0 ||
          action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.userNotifications, ...action.payload.content],
        notificationsTotalPages: action.payload.totalPages - 1,
        notificationsPageNumber: action.payload.pageable.pageNumber,
      };
    case type.FETCH_USER_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notificationsPending: false,
        error: action.error,
      };
    case type.DELETE_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        pending: false,
        userNotifications: [
          ...state.userNotifications.filter((notification) => notification.id !== action.payload),
        ],
      };
    case type.FETCH_USER_SUCCESS:
      return {
        ...state,
        pending: false,
        user: action.payload,
      };
    case type.FETCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        userByIdPending: false,
        userById: action.payload,
      };
    case type.FETCH_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        users:
          Object.keys(state.users).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.users, ...action.payload.content],
        usersTotalPages: action.payload.totalPages - 1,
        usersPageNumber: action.payload.pageable.pageNumber,
      };
    case type.SET_USER_EMAIL_SUCCESS:
      return {
        ...state,
        pending: false,
        user: { ...state.user, email: action.payload },
      };
    case type.HANDLE_ADMIN_PERMISSIONS_SUCCESS:
      return {
        ...state,
        users: [
          ...state.users.filter((user) => {
            if (user.id === action.payload.userId) {
              user.admin = !user.admin;
            }
            return user;
          }),
        ],
      };
    case type.SET_USER_LOCALE:
      return {
        ...state,
        locale: action.payload.locale,
      };
    case type.SET_USER_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        pending: false,
        notificationsRead: true,
      };
    }
    case type.CHECK_USER_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        pending: false,
        notificationsRead: action.payload,
      };
    }
    case type.FETCH_USER_ERROR:
    case type.FETCH_USER_BY_ID_ERROR:
    case type.FETCH_USERS_ERROR:
    case type.SET_USER_EMAIL_ERROR:
    case type.HANDLE_ADMIN_PERMISSIONS_ERROR:
    case type.DELETE_USER_NOTIFICATION_ERROR:
    case type.SET_USER_NOTIFICATIONS_ERROR:
    case type.CHECK_USER_NOTIFICATIONS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default user;
