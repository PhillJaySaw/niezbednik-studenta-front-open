import * as type from '../types';
import adminNotifications from '../reducers';

const notifications = {
  content: [
    { id: 1, message: 'testowa wiadomość', topic: 'testowy', type: 'SUGGESTED_CHANGES' },
    { id: 2, message: 'test', topic: 'testowy 2', type: 'SUGGESTED_CHANGES' },
  ],
  totalElements: 2,
};

const deletedId = 2;

describe('Admin notifications reducer', () => {
  it('Should return default state', () => {
    const newState = adminNotifications(undefined, {});

    expect(newState).toEqual({
      pending: false,
      notifications: [],
      totalElements: 0,
      error: '',
      totalPages: 0,
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: true,
      notifications: [],
      totalElements: 0,
      error: '',
      totalPages: 0,
    };

    const newState = adminNotifications(undefined, {
      type: type.FETCH_NOTIFICATIONS_PENDING,
      payload: notifications,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if reciving type success', () => {
    const data = {
      notifications: [
        { id: 1, message: 'testowa wiadomość', topic: 'testowy', type: 'SUGGESTED_CHANGES' },
        { id: 2, message: 'test', topic: 'testowy 2', type: 'SUGGESTED_CHANGES' },
      ],
      totalElements: 2,
      error: '',
      pending: false,
    };

    const newState = adminNotifications(undefined, {
      type: type.FETCH_NOTIFICATIONS_SUCCESS,
      payload: notifications,
    });

    expect(newState).toEqual(data);
  });

  it('Should return the updated state after removing the item', () => {
    const data = {
      notifications: [
        { id: 1, message: 'testowa wiadomość', topic: 'testowy', type: 'SUGGESTED_CHANGES' },
        { id: 2, message: 'test', topic: 'testowy 2', type: 'SUGGESTED_CHANGES' },
      ],
      totalElements: 2,
      error: '',
      pending: false,
    };
    const dataAfterRemoving = {
      notifications: [
        { id: 1, message: 'testowa wiadomość', topic: 'testowy', type: 'SUGGESTED_CHANGES' },
      ],
      totalElements: 1,
      error: '',
      pending: false,
    };

    const newState = adminNotifications(data, {
      type: type.DELETE_NOTIFICATION_SUCCESS,
      payload: deletedId,
    });

    expect(newState).toEqual(dataAfterRemoving);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      notifications: [],
      totalElements: 0,
      error: undefined,
      totalPages: 0,
    };

    const newState = adminNotifications(undefined, {
      type: type.FETCH_NOTIFICATIONS_ERROR,
      payload: notifications,
    });

    expect(newState).toEqual(data);
  });
});
