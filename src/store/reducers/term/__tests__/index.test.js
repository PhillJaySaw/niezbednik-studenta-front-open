import * as type from '../types';
import term from '../reducers';

const terms = [
    { id: 1, name: 'zimowy' },
    { id: 2, name: 'letni' },
];

describe('Term reducer', () => {
    it('Should return default state', () => {
        const newState = term(undefined, {})

        expect(newState).toEqual({
            pending: false,
            term: [],
            error: null
        });
    })

    it('Should return new state if reciving type pending', () => {
        
        const data = {
            pending: true,
            term: [],
            error: null
        };

        const newState = term(undefined, {
            type: type.FETCH_TERM_PENDING,
            payload: terms,
        });

        expect(newState).toEqual(data);
    });

    it('Should return new state if reciving type success', () => {

        const data = {
            term: [
                { id: 1, name: 'zimowy' },
                { id: 2, name: 'letni' },
            ],
            error: null,
            pending: false
        };

        const newState = term(undefined, {
            type: type.FETCH_TERM_SUCCESS,
            payload: terms,
        });

        expect(newState).toEqual(data);
    });

    it('Should return new state if reciving type error', () => {

        const data = {
            pending: false,
            term: [],
            error: undefined
        };

        const newState = term(undefined, {
            type: type.FETCH_TERM_ERROR,
            payload: terms
        });

        expect(newState).toEqual(data);
    });
});
