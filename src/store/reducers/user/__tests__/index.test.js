import * as type from '../types';
import user from '../reducers';

const userData = [
  { admin: true, email: 'test@test.pl', id: 12349, name: 'Tomek', surname: 'Testowy' },
];

const users = {
  content: [
    { admin: true, email: 'test@test.pl', id: 23433, name: 'Krzyś', surname: 'Test' },
    { admin: true, email: 'test@test.pl', id: 12349, name: 'Tomek', surname: 'Testowy' },
  ],
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
};

describe('User reducer', () => {
  it('Should return default state', () => {
    const newState = user(undefined, {});

    expect(newState).toEqual({
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
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: true,
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

    const newState = user(undefined, {
      type: type.FETCH_USER_PENDING,
      payload: userData,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type success', () => {
    const data = {
      user: [{ admin: true, email: 'test@test.pl', id: 12349, name: 'Tomek', surname: 'Testowy' }],
      pending: false,
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

    const newState = user(undefined, {
      type: type.FETCH_USER_SUCCESS,
      payload: userData,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      user: [],
      userById: '',
      userByIdPending: false,
      userNotifications: [],
      notificationsRead: '',
      notificationsPending: false,
      users: [],
      error: undefined,
      locale: '',
      usersTotalPages: 0,
      usersPageNumber: 0,
      notificationsTotalPages: 0,
      notificationsPageNumber: 0,
    };

    const newState = user(undefined, {
      type: type.FETCH_USER_ERROR,
      payload: userData,
    });

    expect(newState).toEqual(data);
  });
});

describe('Users reducer', () => {
  it('Should return default state', () => {
    const newState = user(undefined, {});

    expect(newState).toEqual({
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
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: true,
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

    const newState = user(undefined, {
      type: type.FETCH_USERS_PENDING,
      payload: users,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type success', () => {
    const data = {
      user: [],
      users: [
        { admin: true, email: 'test@test.pl', id: 23433, name: 'Krzyś', surname: 'Test' },
        { admin: true, email: 'test@test.pl', id: 12349, name: 'Tomek', surname: 'Testowy' },
      ],
      pending: false,
      userById: '',
      userByIdPending: false,
      userNotifications: [],
      notificationsRead: '',
      notificationsPending: false,
      error: '',
      locale: '',
      usersTotalPages: 0,
      usersPageNumber: 0,
      notificationsTotalPages: 0,
      notificationsPageNumber: 0,
    };

    const newState = user(undefined, {
      type: type.FETCH_USERS_SUCCESS,
      payload: users,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      user: [],
      userById: '',
      userByIdPending: false,
      userNotifications: [],
      notificationsRead: '',
      notificationsPending: false,
      users: [],
      error: undefined,
      locale: '',
      usersTotalPages: 0,
      usersPageNumber: 0,
      notificationsTotalPages: 0,
      notificationsPageNumber: 0,
    };

    const newState = user(undefined, {
      type: type.FETCH_USERS_ERROR,
      payload: users,
    });

    expect(newState).toEqual(data);
  });
});
