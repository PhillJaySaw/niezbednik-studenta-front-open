import * as type from './types';

const initialState = {
  pending: false,
  fetchPending: false,
  linksList: {},
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  error: '',
};

const helpfulLinks = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_LINKS_PENDING:
      return {
        ...state,
        fetchPending: true,
      };
    case type.ADD_LINK_STARTED:
    case type.DELETE_LINK_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.FETCH_LINKS_SUCCESS:
      return {
        ...state,
        fetchPending: false,
        linksList:
          Object.keys(state.linksList).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.linksList, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.ADD_LINK_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        totalElements: state.totalElements + 1,
      };
    case type.DELETE_LINK_SUCCESS:
      return {
        ...state,
        pending: false,
        linksList: [...state.linksList.filter((link) => link.id !== action.payload)],
        totalElements: state.totalElements - 1,
      };
    case type.FETCH_LINKS_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.payload.error,
      };
    case type.ADD_LINK_FAILURE:
    case type.DELETE_LINK_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default helpfulLinks;
