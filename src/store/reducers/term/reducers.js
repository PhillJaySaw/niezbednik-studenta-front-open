import * as type from './types';

const initialState = {
    pending: false,
    term: [],
    error: null
}

const term = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_TERM_PENDING:
            return {
                ...state,
                pending: true
            }
        case type.FETCH_TERM_SUCCESS:
            return {
                ...state,
                pending: false,
                term: action.payload
            }
        case type.FETCH_TERM_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state
    }
}

export default term;