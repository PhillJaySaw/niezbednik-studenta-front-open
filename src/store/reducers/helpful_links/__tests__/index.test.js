import * as type from '../types';
import helpfulLinks from '../reducers';

const links = {
  content: { id: 1, name: 'Github', url: 'https://github.com' },
  totalElements: 1,
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
};
const deletedLinkId = 2;

describe('Helpful links reducer', () => {
  it('Should return default state', () => {
    const newState = helpfulLinks(undefined, {});

    expect(newState).toEqual({
      pending: false,
      fetchPending: false,
      linksList: {},
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      error: '',
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      linksList: {},
      error: '',
      fetchPending: true,
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      pending: false,
    };

    const newState = helpfulLinks(undefined, {
      type: type.FETCH_LINKS_PENDING,
      payload: links,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if fetching data and reciving type success', () => {
    const data = {
      linksList: { id: 1, name: 'Github', url: 'https://github.com' },
      totalElements: 1,
      error: '',
      pending: false,
      fetchPending: false,
      totalPages: 0,
      pageNumber: 0,
    };

    const newState = helpfulLinks(undefined, {
      type: type.FETCH_LINKS_SUCCESS,
      payload: links,
    });

    expect(newState).toEqual(data);
  });

  it('Should return the updated state after removing the item', () => {
    const data = {
      linksList: [
        { id: 1, name: 'Github', url: 'https://github.com' },
        { id: 2, name: 'Github', url: 'https://github.com' },
      ],
      totalElements: 2,
      totalPages: 0,
      pageNumber: 0,
    };
    const dataAfterRemovingLink = {
      linksList: [{ id: 1, name: 'Github', url: 'https://github.com' }],
      totalElements: 1,
      pending: false,
      totalPages: 0,
      pageNumber: 0,
    };

    const newState = helpfulLinks(data, {
      type: type.DELETE_LINK_SUCCESS,
      payload: deletedLinkId,
    });

    expect(newState).toEqual(dataAfterRemovingLink);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      linksList: {},
      error: undefined,
      totalElements: 0,
      pending: false,
      fetchPending: false,
      totalPages: 0,
      pageNumber: 0,
    };

    const newState = helpfulLinks(undefined, {
      type: type.FETCH_LINKS_ERROR,
      payload: links,
    });

    expect(newState).toEqual(data);
  });
});
