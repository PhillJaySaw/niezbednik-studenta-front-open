import * as type from '../types';
import studiesMajor from '../reducers';

const studiesMajors = [
    { id: 1, name: 'Matematyka' },
    { id: 2, name: 'Informatyka' },
];

describe('Studies major reducer', () => {
    it('Should return default state', () => {
        const newState = studiesMajor(undefined, {})

        expect(newState).toEqual({
            pending: false,
            studiesMajor: [],
            error: null
        });
    })

    it('Should return new state if reciving type pending', () => {

        const data = {
            pending: true,
            studiesMajor: [],
            error: null
        };

        const newState = studiesMajor(undefined, {
            type: type.FETCH_STUDIES_MAJOR_PENDING,
            payload: studiesMajors,
        });

        expect(newState).toEqual(data);
    });

    it('Should return new state if reciving type success', () => {

        const data = {
            studiesMajor: [
                { id: 1, name: 'Matematyka' },
                { id: 2, name: 'Informatyka' },
            ],
            error: null,
            pending: false
        };

        const newState = studiesMajor(undefined, {
            type: type.FETCH_STUDIES_MAJOR_SUCCESS,
            payload: studiesMajors,
        });

        expect(newState).toEqual(data);
    });

    it('Should return new state if reciving type error', () => {

        const data = {
            pending: false,
            studiesMajor: [],
            error: undefined
        };

        const newState = studiesMajor(undefined, {
            type: type.FETCH_STUDIES_MAJOR_ERROR,
            payload: studiesMajors
        });

        expect(newState).toEqual(data);
    });
});
