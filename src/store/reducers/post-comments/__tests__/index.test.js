import * as type from '../types';
import postComment from '../reducers';

const postComments = {
  content: {
    id: 1,
    content: 'siema',
    isAcceptedAnswer: false,
    isAnswer: false,
    likes: 0,
    userId: 499009,
    postId: 49,
  },
  totalPages: 1,
  pageable: {
    pageNumber: 0,
  },
  totalElements: 1,
};

const deletedCommentId = 2;

const editedComment = {
  id: 1,
  content: 'edytowany komentarz',
};

describe('PostComments reducer', () => {
  it('Should return default state', () => {
    const newState = postComment(undefined, {});

    expect(newState).toEqual({
      pending: false,
      commentsList: {},
      error: '',
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
    });
  });

  it('Should return new state if reciving type pending', () => {
    const data = {
      pending: true,
      commentsList: {},
      error: '',
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
    };

    const newState = postComment(undefined, {
      type: type.FETCH_POST_COMMENTS_PENDING,
      payload: postComments,
    });
    expect(newState).toEqual(data);
  });

  it('Should return the updated state after removing the item', () => {
    const data = {
      commentsList: [
        {
          id: 1,
          content: 'siema',
          isAcceptedAnswer: false,
          isAnswer: false,
          likes: 0,
          userId: 499009,
          postId: 49,
        },
        {
          id: 2,
          content: 'siema',
          isAcceptedAnswer: false,
          isAnswer: false,
          likes: 0,
          userId: 499009,
          postId: 49,
        },
      ],
      totalElements: 2,
    };
    const dataAfterRemovingComment = {
      commentsList: [
        {
          id: 1,
          content: 'siema',
          isAcceptedAnswer: false,
          isAnswer: false,
          likes: 0,
          userId: 499009,
          postId: 49,
        },
      ],
      pending: false,
      totalElements: 1,
    };

    const newState = postComment(data, {
      type: type.DELETE_COMMENT_SUCCESS,
      payload: deletedCommentId,
    });

    expect(newState).toEqual(dataAfterRemovingComment);
  });

  it('Should return the updated state after editing it', () => {
    const data = {
      commentsList: [
        {
          id: 1,
          content: 'siema',
          isAcceptedAnswer: false,
          isAnswer: false,
          likes: 0,
          userId: 499009,
          postId: 49,
        },
      ],
    };
    const dataAfterEditingComment = {
      pending: false,
      commentsList: [
        {
          id: 1,
          content: 'edytowany komentarz',
          isAcceptedAnswer: false,
          isAnswer: false,
          likes: 0,
          userId: 499009,
          postId: 49,
          edited: true,
        },
      ],
    };

    const newState = postComment(data, {
      type: type.EDIT_COMMENT_SUCCESS,
      payload: editedComment,
    });

    expect(newState).toEqual(dataAfterEditingComment);
  });

  it('Should return new state if reciving type error', () => {
    const data = {
      pending: false,
      commentsList: {},
      error: undefined,
      totalElements: 0,
      totalPages: 0,
      pageNumber: 0,
    };

    const newState = postComment(undefined, {
      type: type.FETCH_POST_COMMENTS_ERROR,
      payload: postComments,
    });

    expect(newState).toEqual(data);
  });
});
