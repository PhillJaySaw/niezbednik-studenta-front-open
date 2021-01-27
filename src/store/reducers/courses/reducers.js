import * as type from './types';

const initialState = {
  pending: false,
  courses: [],
  fetchPending: false,
  fetchUserPending: false,
  fetchCoursesUsersPending: false,
  joinPending: false,
  userCourses: [],
  courseUsers: [],
  totalPages: 0,
  pageNumber: 0,
  error: '',
};

const courses = (state = initialState, action) => {
  switch (action.type) {
    case type.LEAVE_COURSE_STARTED:
    case type.JOIN_COURSE_STARTED:
      return {
        ...state,
        joinPending: true,
      };
    case type.LEAVE_COURSE_SUCCESS:
      const courses = state.courses.filter((course) => {
        if (course.id === action.payload) {
          course.isUserBelong = !course.isUserBelong;
        }
        return course;
      });
      return {
        ...state,
        courses: courses,
        userCourses: [...state.userCourses.filter((course) => course.id !== action.payload)],
        joinPending: false,
      };
    case type.JOIN_COURSE_SUCCESS:
      const allCourses = state.courses.filter((course) => {
        if (course.id === action.payload) {
          course.isUserBelong = !course.isUserBelong;
        }
        return course;
      });
      return {
        ...state,
        courses: allCourses,
        joinPending: false,
      };
    case type.LEAVE_COURSE_FAILURE:
    case type.JOIN_COURSE_FAILURE:
      return {
        ...state,
        joinPending: false,
        error: action.error,
      };
    case type.FETCH_COURSE_USERS_STARTED:
      return {
        ...state,
        fetchCoursesUsersPending: true,
      };
    case type.FETCH_COURSE_USERS_SUCCESS:
      return {
        ...state,
        courseUsers: action.payload,
        fetchCoursesUsersPending: false,
      };
    case type.FETCH_COURSE_USERS_FAILURE:
      return {
        ...state,
        fetchCoursesUsersPending: false,
        error: action.error,
      };
    case type.FETCH_COURSES_PENDING:
      return {
        ...state,
        fetchPending: true,
      };
    case type.FETCH_USER_COURSES_PENDING:
      return {
        ...state,
        fetchUserPending: true,
      };
    case type.ADD_COURSE_STARTED:
    case type.DELETE_COURSE_STARTED:
    case type.EDIT_COURSE_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.ADD_COURSE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case type.EDIT_COURSE_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case type.DELETE_COURSE_SUCCESS:
      return {
        ...state,
        pending: false,
        courses: [...state.courses.filter((course) => course.id !== action.payload)],
      };
    case type.FETCH_COURSES_SUCCESS:
      return {
        ...state,
        fetchPending: false,
        courses:
          Object.keys(state.courses).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.courses, ...action.payload.content],
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.FETCH_USER_COURSES_SUCCESS:
      return {
        ...state,
        fetchUserPending: false,
        userCourses: action.payload.content,
      };
    case type.FETCH_COURSES_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.payload.error,
      };
    case type.FETCH_USER_COURSES_ERROR:
      return {
        ...state,
        fetchUserPending: false,
        error: action.payload.error,
      };
    case type.ADD_COURSE_FAILURE:
    case type.EDIT_COURSE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default courses;
