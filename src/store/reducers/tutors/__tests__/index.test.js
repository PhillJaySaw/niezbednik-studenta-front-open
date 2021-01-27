import * as type from '../types';
import tutors from '../reducers';

const tutor = {
  content: [
    { id: 1, name: 'Piotr', surname: 'Piotrkowski' },
    { id: 2, name: 'Bartek', surname: 'Bartkowiak' },
  ],
  totalElements: 2,
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
};

const course = [
  { id: 1, name: 'Matematyka' },
  { id: 2, name: 'Programowanie' },
];

const deletedTutorId = 2;

const editedTutor = {
  id: 2,
  name: 'Łukasz',
  surname: 'Łukowski',
  information: 'Testowe',
  page: '',
  coordinatorDegree: {
    id: 2,
    name: 'dr',
  },
};

describe('Tutors reducer', () => {
  it('Should return default state', () => {
    const newState = tutors(undefined, {});

    expect(newState).toEqual({
      pending: false,
      tutors: [],
      tutorCourses: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      fetchPending: false,
      error: null,
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: false,
      fetchPending: true,
      tutors: [],
      tutorCourses: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      error: null,
    };

    const newState = tutors(undefined, {
      type: type.FETCH_TUTOR_PENDING,
      payload: tutor,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if fetching and reciving type success', () => {
    const data = {
      tutors: [
        { id: 1, name: 'Piotr', surname: 'Piotrkowski' },
        { id: 2, name: 'Bartek', surname: 'Bartkowiak' },
      ],
      totalElements: 2,
      totalPages: 0,
      pageNumber: 0,
      tutorCourses: [],
      error: null,
      pending: false,
      fetchPending: false,
    };

    const newState = tutors(undefined, {
      type: type.FETCH_TUTOR_SUCCESS,
      payload: tutor,
    });

    expect(newState).toEqual(data);
  });

  it('Should return the updated state after removing the item', () => {
    const data = {
      tutors: [
        { id: 1, name: 'Piotr', surname: 'Piotrkowski' },
        { id: 2, name: 'Bartek', surname: 'Bartkowiak' },
      ],
      totalElements: 2,
    };
    const dataAfterRemovingTutor = {
      pending: false,
      tutors: [{ id: 1, name: 'Piotr', surname: 'Piotrkowski' }],
      totalElements: 1,
    };

    const newState = tutors(data, {
      type: type.DELETE_TUTOR_SUCCESS,
      payload: deletedTutorId,
    });

    expect(newState).toEqual(dataAfterRemovingTutor);
  });

  it('Should return the updated state after editing it', () => {
    const data = {
      tutors: [
        {
          id: 1,
          name: 'Piotr',
          surname: 'Piotrkowski',
          information: '',
          page: '',
          coordinatorDegree: {
            id: 1,
            name: 'mgr',
          },
        },
        {
          id: 2,
          name: 'Bartek',
          surname: 'Bartkowiak',
          information: 'Testowe',
          page: '',
          coordinatorDegree: {
            id: 1,
            name: 'mgr',
          },
        },
      ],
    };
    const dataAfterEditingTutor = {
      pending: false,
      tutors: [
        {
          id: 1,
          name: 'Piotr',
          surname: 'Piotrkowski',
          information: '',
          page: '',
          coordinatorDegree: {
            id: 1,
            name: 'mgr',
          },
        },
        {
          id: 2,
          name: 'Łukasz',
          surname: 'Łukowski',
          information: 'Testowe',
          page: '',
          coordinatorDegree: {
            id: 2,
            name: 'dr',
          },
        },
      ],
    };

    const newState = tutors(data, {
      type: type.EDIT_TUTOR_SUCCESS,
      payload: editedTutor,
    });

    expect(newState).toEqual(dataAfterEditingTutor);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      tutors: [],
      tutorCourses: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      error: undefined,
      fetchPending: false,
    };

    const newState = tutors(undefined, {
      type: type.FETCH_TUTOR_ERROR,
      payload: tutor,
    });

    expect(newState).toEqual(data);
  });
});

describe('Tutors courses reducer', () => {
  it('Should return default state', () => {
    const newState = tutors(undefined, {});

    expect(newState).toEqual({
      pending: false,
      tutors: [],
      tutorCourses: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      error: null,
      fetchPending: false,
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: true,
      tutors: [],
      tutorCourses: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      error: null,
      fetchPending: false,
    };

    const newState = tutors(undefined, {
      type: type.FETCH_TUTOR_COURSES_PENDING,
      payload: course,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type success', () => {
    const data = {
      tutors: [],
      tutorCourses: [
        { id: 1, name: 'Matematyka' },
        { id: 2, name: 'Programowanie' },
      ],
      error: null,
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      pending: false,
      fetchPending: false,
    };

    const newState = tutors(undefined, {
      type: type.FETCH_TUTOR_COURSES_SUCCESS,
      payload: course,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      tutors: [],
      tutorCourses: [],
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      error: undefined,
      fetchPending: false,
    };

    const newState = tutors(undefined, {
      type: type.FETCH_TUTOR_COURSES_ERROR,
      payload: course,
    });

    expect(newState).toEqual(data);
  });
});
