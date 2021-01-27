import * as type from './types';

const initialState = {
  pending: false,
  fetchPending: false,
  noticesList: {},
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  error: '',
};

const notices = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_NOTICES_PENDING:
      return {
        ...state,
        fetchPending: false,
      };
    case type.ADD_NOTICE_STARTED:
    case type.EDIT_NOTICE_STARTED:
    case type.DELETE_NOTICE_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.FETCH_NOTICES_SUCCESS:
      return {
        ...state,
        fetchPending: false,
        noticesList:
          Object.keys(state.noticesList).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.noticesList, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.DELETE_NOTICE_SUCCESS:
      return {
        ...state,
        pending: false,
        noticesList: [...state.noticesList.filter((notice) => notice.id !== action.payload)],
      };
    case type.ADD_NOTICE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case type.EDIT_NOTICE_SUCCESS:
      return {
        ...state,
        pending: false,
        noticesList: state.noticesList.map((notice) =>
          notice.id === action.payload.noticeId
            ? { ...notice, content: action.payload.content, edited: true }
            : notice,
        ),
      };
    case type.FETCH_NOTICES_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.error,
      };
    case type.ADD_NOTICE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case type.EDIT_NOTICE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default notices;
