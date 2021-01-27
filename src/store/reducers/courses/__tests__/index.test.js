import * as type from '../types';
import courses from '../reducers';

const course = {
  content: [
    { id: 1, name: 'Matematyka' },
    { id: 2, name: 'Programowanie' },
  ],
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
};

const deletedCourseId = 2;

describe('Course reducer', () => {
  it('Should return default state', () => {
    const newState = courses(undefined, {});

    expect(newState).toEqual({
      pending: false,
      courses: [],
      userCourses: [],
      totalPages: 0,
      pageNumber: 0,
      error: '',
      fetchPending: false,
      fetchUserPending: false,
      joinPending: false,
      courseUsers: [],
      fetchCoursesUsersPending: false,
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      courses: [],
      error: '',
      pending: false,
      userCourses: [],
      totalPages: 0,
      pageNumber: 0,
      fetchPending: true,
      fetchUserPending: false,
      joinPending: false,
      courseUsers: [],
      fetchCoursesUsersPending: false,
    };

    const newState = courses(undefined, {
      type: type.FETCH_COURSES_PENDING,
      payload: course,
    });

    expect(newState).toEqual(data);
  });

  it('Should return the updated state after removing the item', () => {
    const data = {
      courses: [
        { id: 1, name: 'Matematyka' },
        { id: 2, name: 'Programowanie' },
      ],
    };
    const dataAfterRemovingCourse = {
      pending: false,
      courses: [{ id: 1, name: 'Matematyka' }],
    };

    const newState = courses(data, {
      type: type.DELETE_COURSE_SUCCESS,
      payload: deletedCourseId,
    });

    expect(newState).toEqual(dataAfterRemovingCourse);
  });

  it('Should return new state if reciving type success', () => {
    const data = {
      courses: [
        { id: 1, name: 'Matematyka' },
        { id: 2, name: 'Programowanie' },
      ],
      error: '',
      pending: false,
      totalPages: 0,
      pageNumber: 0,
      userCourses: [],
      fetchPending: false,
      fetchUserPending: false,
      joinPending: false,
      courseUsers: [],
      fetchCoursesUsersPending: false,
    };

    const newState = courses(undefined, {
      type: type.FETCH_COURSES_SUCCESS,
      payload: course,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      courses: [],
      error: undefined,
      pending: false,
      userCourses: [],
      totalPages: 0,
      pageNumber: 0,
      fetchPending: false,
      fetchUserPending: false,
      joinPending: false,
      courseUsers: [],
      fetchCoursesUsersPending: false,
    };

    const newState = courses(undefined, {
      type: type.FETCH_COURSES_ERROR,
      payload: course,
    });

    expect(newState).toEqual(data);
  });
});
