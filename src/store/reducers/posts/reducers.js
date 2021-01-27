import * as type from './types';

const initialState = {
  pending: false,
  postsList: {},
  error: '',
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  postById: {},
  postByIdPending: false,
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_POSTS_PENDING:
    case type.FETCH_POST_BY_ID_PENDING:
      return {
        ...state,
        postByIdPending: true,
      };
    case type.ADD_POST_STARTED:
    case type.POST_LIKE_REQUEST:
    case type.EDIT_POST_STARTED:
    case type.DELETE_POST_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.CHANGE_COMMENT_SIZE:
      if (action.payload.action === 'ADD') {
        return {
          ...state,
          postsList: [
            ...state.postsList.filter((post) => {
              if (post.id === action.payload.postId) {
                post.totalComments += 1;
              }
              return post;
            }),
          ],
        };
      } else if (action.payload.action === 'DELETE') {
        return {
          ...state,
          postsList: [
            ...state.postsList.filter((post) => {
              if (post.id === action.payload.postId) {
                post.totalComments -= 1;
              }
              return post;
            }),
          ],
        };
      } else {
        return {
          ...state,
        };
      }
    case type.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        pending: false,
        postsList:
          Object.keys(state.postsList).length === 0 || action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.postsList, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.DELETE_POST_SUCCESS:
      return {
        ...state,
        pending: false,
        postsList: [...state.postsList.filter((post) => post.id !== action.payload)],
        totalElements: state.totalElements - 1,
      };
    case type.ADD_POST_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case type.EDIT_POST_SUCCESS:
      return {
        ...state,
        pending: false,
        postsList: state.postsList.map((post) =>
          post.id === action.payload.postId
            ? { ...post, content: action.payload.content, edited: true }
            : post,
        ),
      };
    case type.POST_LIKE_SUCCESS:
      return {
        ...state,
        pending: false,
        // TODO rewrite this nested teranry to switch
        postsList: state.postsList.map((post) =>
          post.id === action.payload.postId
            ? !post.userLikedIt
              ? { ...post, likes: post.likes + 1, userLikedIt: true }
              : { ...post, likes: post.likes - 1, userLikedIt: false }
            : post,
        ),
      };
    case type.FETCH_POST_BY_ID_SUCCESS:
      return {
        ...state,
        postById: action.payload,
        postByIdPending: false,
      };
    case type.FETCH_POSTS_ERROR:
    case type.FETCH_POST_BY_ID_ERROR:
    case type.POST_LIKE_FAILURE:
    case type.ADD_POST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case type.EDIT_POST_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default posts;
