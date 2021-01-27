import * as type from './types';

const initialState = {
  pending: false,
  commentsList: {},
  error: '',
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
};

const postComments = (state = initialState, action) => {
  switch (action.type) {
    case type.ADD_COMMENT_STARTED:
    case type.COMMENT_LIKE_REQUEST:
    case type.ACCEPT_ANSWER_REQUEST:
    case type.FETCH_POST_COMMENTS_PENDING:
    case type.EDIT_COMMENT_STARTED:
    case type.DELETE_COMMENT_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case type.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        commentsList: state.commentsList.map((comment) =>
          comment.id === action.payload.id
            ? { ...comment, content: action.payload.content, edited: true }
            : comment,
        ),
      };
    case type.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        pending: false,
        commentsList: [...state.commentsList.filter((comment) => comment.id !== action.payload)],
        totalElements: state.totalElements - 1,
      };
    case type.FETCH_POST_COMMENTS_SUCCESS:
      const list =
        Object.keys(state.commentsList).length === 0 || action.payload.pageable.pageNumber === 0
          ? action.payload.content
          : [...state.commentsList, ...action.payload.content];
      return {
        ...state,
        pending: false,
        commentsList: list.reverse(),
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.COMMENT_LIKE_SUCCESS:
      return {
        ...state,
        pending: false,
        commentsList: state.commentsList.map((comment) =>
          comment.id === action.payload.commentId
            ? !comment.userLikedIt
              ? { ...comment, likes: comment.likes + 1, userLikedIt: true }
              : { ...comment, likes: comment.likes - 1, userLikedIt: false }
            : comment,
        ),
      };
    case type.ACCEPT_ANSWER_SUCCESS:
      return {
        ...state,
        pending: false,
        commentsList: state.commentsList.map((comment) =>
          comment.id === action.payload.commentId
            ? !comment.isAcceptedAnswer
              ? { ...comment, isAcceptedAnswer: 1 }
              : { ...comment, isAcceptedAnswer: 0 }
            : comment,
        ),
      };
    case type.FETCH_POST_COMMENTS_ERROR:
    case type.COMMENT_LIKE_FAILURE:
    case type.ACCEPT_ANSWER_FAILURE:
    case type.ADD_COMMENT_FAILURE:
    case type.EDIT_COMMENT_FAILURE:
    case type.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default postComments;
