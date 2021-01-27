import * as type from './types';

const initialState = {
  pending: false,
  fetchPending: false,
  tutors: [],
  tutorCourses: [],
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  error: null,
};

const tutors = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TUTOR_PENDING:
      return {
        ...state,
        fetchPending: true,
      };
    case type.ADD_TUTOR_STARTED:
    case type.FETCH_TUTOR_COURSES_PENDING:
    case type.DELETE_TUTOR_STARTED:
    case type.EDIT_TUTOR_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.ADD_TUTOR_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
        totalElements: state.totalElements + 1,
      };
    case type.EDIT_TUTOR_SUCCESS:
      return {
        ...state,
        tutors: [
          ...state.tutors.filter((tutor) => {
            if (tutor.id === action.payload.id) {
              tutor.name = action.payload.name;
              tutor.surname = action.payload.surname;
              tutor.information = action.payload.information;
              tutor.page = action.payload.page;
              tutor.coordinatorDegree.id = action.payload.coordinatorDegree.id;
              tutor.coordinatorDegree.name = action.payload.coordinatorDegree.name;
            }
            return tutor;
          }),
        ],
        pending: false,
      };
    case type.FETCH_TUTOR_SUCCESS:
      return {
        ...state,
        fetchPending: false,
        tutors:
          Object.keys(state.tutors).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.tutors, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.FETCH_TUTOR_COURSES_SUCCESS:
      return {
        ...state,
        pending: false,
        tutorCourses: action.payload,
      };
    case type.DELETE_TUTOR_SUCCESS:
      return {
        ...state,
        pending: false,
        tutors: [...state.tutors.filter((tutor) => tutor.id !== action.payload)],
        totalElements: state.totalElements - 1,
      };
    case type.FETCH_TUTOR_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.payload.error,
      };
    case type.ADD_TUTOR_FAILURE:
    case type.FETCH_TUTOR_COURSES_ERROR:
    case type.DELETE_TUTOR_FAILURE:
    case type.EDIT_TUTOR_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default tutors;
