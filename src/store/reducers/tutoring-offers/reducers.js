import * as type from './types';

const initialState = {
  pending: false,
  fetchPending: false,
  tutoringOffersList: {},
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
  error: '',
};

const tutoringOffers = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_TUTORING_OFFERS_PENDING:
      return {
        ...state,
        fetchPending: true,
      };
    case type.OFFER_INTEREST_PENDING:
    case type.FETCH_IS_USER_INTERESTED_PENDING:
    case type.ADD_TUTORING_OFFER_STARTED:
    case type.EDIT_TUTORING_OFFER_STARTED:
    case type.DELETE_TUTORING_OFFER_STARTED:
      return {
        ...state,
        pending: true,
      };
    case type.FETCH_TUTORING_OFFERS_SUCCESS:
      return {
        ...state,
        fetchPending: false,
        tutoringOffersList:
          Object.keys(state.tutoringOffersList).length === 0 ||
          action.payload.pageable.pageNumber === 0
            ? action.payload.content
            : [...state.tutoringOffersList, ...action.payload.content],
        totalElements: action.payload.totalElements,
        totalPages: action.payload.totalPages - 1,
        pageNumber: action.payload.pageable.pageNumber,
      };
    case type.DELETE_TUTORING_OFFER_SUCCESS:
      return {
        ...state,
        pending: false,
        tutoringOffersList: [
          ...state.tutoringOffersList.filter(
            (tutoringOffer) => tutoringOffer.id !== action.payload,
          ),
        ],
      };
    case type.ADD_TUTORING_OFFER_SUCCESS:
      return {
        ...state,
        pending: false,
        error: null,
      };
    case type.EDIT_TUTORING_OFFER_SUCCESS:
      return {
        ...state,
        pending: false,
        tutoringOffersList: state.tutoringOffersList.map((tutoringOffer) =>
          tutoringOffer.id === action.payload.offerId
            ? {
                ...tutoringOffer,
                type: action.payload.type,
                course: { id: action.payload.course.id, name: action.payload.course.name },
                content: action.payload.content,
                edited: true,
              }
            : tutoringOffer,
        ),
      };
    case type.OFFER_INTEREST_SUCCESS:
      return {
        ...state,
        pending: false,
        tutoringOffersList: state.tutoringOffersList.map((tutoringOffer) =>
          tutoringOffer.id === action.payload
            ? !tutoringOffer.userInterested ? 
              {
                ...tutoringOffer,
                userInterested: true,
              } :
              {
                ...tutoringOffer,
                userInterested: false,
              }
            : tutoringOffer,
        ),
        error: null,
      };
    case type.FETCH_IS_USER_INTERESTED_SUCCESS:
      return {
        ...state,
        pending: false,
        tutoringOffersList: state.tutoringOffersList.map((tutoringOffer) =>
          tutoringOffer.id === action.meta
            ? {
                ...tutoringOffer,
                userInterested: action.payload,
              }
            : tutoringOffer,
        ),
        error: null,
      };
    case type.FETCH_TUTORING_OFFERS_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.error,
      };
    case type.ADD_TUTORING_OFFER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case type.EDIT_TUTORING_OFFER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
      case type.OFFER_INTEREST_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.error,
      };
      case type.FETCH_IS_USER_INTERESTED_ERROR:
      return {
        ...state,
        fetchPending: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default tutoringOffers;
