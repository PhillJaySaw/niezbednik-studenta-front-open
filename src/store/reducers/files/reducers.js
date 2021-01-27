import * as type from './types';
import { USER_LOGOUT_SUCCESS } from '../userLogin/types';

const initialState = {
  uploadPending: false,
  getFilesListPending: false,
  getFilePending: false,
  deletePending: false,
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  filesList: [],
  error: '',
};

const files = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_FILE_PENDING:
      return {
        ...state,
        getFilePending: true,
      };

    case type.UPLOAD_FILE_PENDING:
      return {
        ...state,
        uploadPending: true,
      };

    case type.DELETE_FILE_PENDING:
      return {
        ...state,
        deletePending: true,
      };

    case type.GET_FILES_LIST_PENDING:
      return {
        ...state,
        getFilesListPending: true,
      };

    case type.GET_FILES_LIST_SUCCESS:
      return {
        ...state,
        getFilesListPending: false,
        filesList:
          Object.keys(state.filesList).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.filesList, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };

    case type.GET_FILE_SUCCESS:
      return {
        ...state,
        getFilePending: false,
        downloadFile: action.payload,
      };

    case type.DELETE_FILE_SUCCESS:
      return {
        ...state,
        deletePending: false,
        filesList: state.filesList.filter((file) => file.id !== action.payload.fileId),
        totalElements: state.totalElements - 1,
      };

    case type.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        uploadPending: false,
        totalElements: state.totalElements + 1,
      };

    case type.GET_FILE_FAILURE:
      return {
        ...state,
        getFilePending: false,
        error: action.payload.error,
      };

    case type.GET_FILES_LIST_FAILURE:
      return {
        ...state,
        getFilesListPending: false,
        error: action.payload.error,
      };

    case type.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        uploadPending: false,
        error: action.payload.error,
      };

    case type.DELETE_FILE_FAILURE:
      return {
        ...state,
        deletePending: false,
        error: action.payload.error,
      };

    case USER_LOGOUT_SUCCESS:
      return initialState;

    default:
      return state;
  }
};

export default files;
