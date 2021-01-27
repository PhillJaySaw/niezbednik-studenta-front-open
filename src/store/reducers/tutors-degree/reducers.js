import * as type from './types';

const initialState = {
    pending: false,
    tutorsDegree: [],
    error: null
}

const tutorsDegree = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_TUTOR_DEGREE_PENDING:
            return {
                ...state,
                pending: true
            }
        case type.FETCH_TUTOR_DEGREE_SUCCESS:
            return {
                ...state,
                pending: false,
                tutorsDegree: action.payload
            }
        case type.FETCH_TUTOR_DEGREE_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state
    }
}

export default tutorsDegree;