import * as type from './types';

const initialState = {
    pending: false,
    studiesMajor: [],
    error: null
}

const studiesMajor = (state = initialState, action) => {
    switch (action.type) {
        case type.FETCH_STUDIES_MAJOR_PENDING:
            return {
                ...state,
                pending: true
            }
        case type.FETCH_STUDIES_MAJOR_SUCCESS:
            return {
                ...state,
                pending: false,
                studiesMajor: action.payload
            }
        case type.FETCH_STUDIES_MAJOR_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default:
            return state
    }
}

export default studiesMajor;