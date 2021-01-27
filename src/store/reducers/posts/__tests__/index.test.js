import * as type from '../types';
import posts from '../reducers';

const post = {
  content: {
    id: 1,
    date: '2020-06-02T20:02:21.140701',
    content: 'Testowy post',
    likes: 0,
  },
  totalElements: 5,
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
};

const deletedPostId = 2;

const editedPost = {
  postId: 1,
  content: 'Testowy zmieniony po edycji post',
};

describe('Posts reducer', () => {
  it('Should return default state', () => {
    const newState = posts(undefined, {});

    expect(newState).toEqual({
      pending: false,
      postsList: {},
      error: '',
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      postById: {},
      postByIdPending: false,
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: false,
      postsList: {},
      error: '',
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      postById: {},
      postByIdPending: true,
    };

    const newState = posts(undefined, {
      type: type.FETCH_POSTS_PENDING,
      payload: post,
    });

    expect(newState).toEqual(data);
  });

  it('Should return new state if fetching data and reciving type success', () => {
    const data = {
      postsList: { id: 1, date: '2020-06-02T20:02:21.140701', content: 'Testowy post', likes: 0 },
      pending: false,
      error: '',
      totalElements: 5,
      totalPages: 0,
      pageNumber: 0,
      postById: {},
      postByIdPending: false,
    };

    const newState = posts(undefined, {
      type: type.FETCH_POSTS_SUCCESS,
      payload: post,
    });

    expect(newState).toEqual(data);
  });

  it('Should return the updated state after removing the item', () => {
    const data = {
      postsList: [
        { id: 1, date: '2020-06-02T20:02:21.140701', content: 'Testowy post', likes: 0 },
        { id: 2, date: '2020-06-02T20:02:21.140701', content: 'Testowy post', likes: 0 },
      ],
      totalElements: 2,
    };
    const dataAfterRemovingPost = {
      postsList: [{ id: 1, date: '2020-06-02T20:02:21.140701', content: 'Testowy post', likes: 0 }],
      pending: false,
      totalElements: 1,
    };

    const newState = posts(data, {
      type: type.DELETE_POST_SUCCESS,
      payload: deletedPostId,
    });

    expect(newState).toEqual(dataAfterRemovingPost);
  });

  it('Should return the updated number of totalComments after adding comment', () => {
    const data = {
      postsList: [
        {
          id: 1,
          date: '2020-06-02T20:02:21.140701',
          content: 'Testowy post',
          likes: 0,
          totalComments: 3,
        },
      ],
    };
    const dataAfterAddingComment = {
      postsList: [
        {
          id: 1,
          date: '2020-06-02T20:02:21.140701',
          content: 'Testowy post',
          likes: 0,
          totalComments: 4,
        },
      ],
    };

    const newState = posts(data, {
      type: type.CHANGE_COMMENT_SIZE,
      payload: {
        action: 'ADD',
        postId: 1,
      },
    });

    expect(newState).toEqual(dataAfterAddingComment);
  });

  it('Should return the updated number of totalComments after deleting comment', () => {
    const data = {
      postsList: [
        {
          id: 1,
          date: '2020-06-02T20:02:21.140701',
          content: 'Testowy post',
          likes: 0,
          totalComments: 3,
        },
      ],
    };
    const dataAfterDeletingComment = {
      postsList: [
        {
          id: 1,
          date: '2020-06-02T20:02:21.140701',
          content: 'Testowy post',
          likes: 0,
          totalComments: 2,
        },
      ],
    };

    const newState = posts(data, {
      type: type.CHANGE_COMMENT_SIZE,
      payload: {
        action: 'DELETE',
        postId: 1,
      },
    });

    expect(newState).toEqual(dataAfterDeletingComment);
  });

  it('Should return the updated state after editing it', () => {
    const data = {
      postsList: [
        {
          id: 1,
          date: '2020-06-02T20:02:21.140701',
          content: 'Testowy post',
          likes: 0,
          totalComments: 2,
        },
      ],
    };
    const dataAfterEditingPost = {
      pending: false,
      postsList: [
        {
          id: 1,
          date: '2020-06-02T20:02:21.140701',
          content: 'Testowy zmieniony po edycji post',
          likes: 0,
          totalComments: 2,
          edited: true,
        },
      ],
    };

    const newState = posts(data, {
      type: type.EDIT_POST_SUCCESS,
      payload: editedPost,
    });

    expect(newState).toEqual(dataAfterEditingPost);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      postsList: {},
      error: undefined,
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
      postById: {},
      postByIdPending: false,
    };

    const newState = posts(undefined, {
      type: type.FETCH_POSTS_ERROR,
      payload: post,
    });

    expect(newState).toEqual(data);
  });
});
