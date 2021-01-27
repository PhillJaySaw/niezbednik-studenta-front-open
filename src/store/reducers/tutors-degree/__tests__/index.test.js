import * as type from '../types';
import tutorsDegree from '../reducers';

describe('Tutors degree reducer', () => {
    it('Should return default state', () => {
        const newState = tutorsDegree(undefined, {})

        expect(newState).toEqual({
            pending: false,
            tutorsDegree: [],
            error: null
        });
    })

    it('Should return new state if reciving type pending', () => {
        const  tutorDegree = [
            { id: 1, name: 'mgr' },
            { id: 2, name: 'dr' },
        ];

        const data = {
            pending: true,
            tutorsDegree: [],
            error: null
        };

        const newState = tutorsDegree(undefined, {
            type: type.FETCH_TUTOR_DEGREE_PENDING,
            payload: tutorDegree
        });

        expect(newState).toEqual(data);
    });

    it('Should return new state if reciving type success', () => {
        const tutorDegree = [
            { id: 1, name: 'mgr' },
            { id: 2, name: 'dr' },
        ];

        const data = {
            tutorsDegree: [
                { id: 1, name: 'mgr' },
                { id: 2, name: 'dr' },
            ],
            error: null,
            pending: false
        };

        const newState = tutorsDegree(undefined, {
            type: type.FETCH_TUTOR_DEGREE_SUCCESS,
            payload: tutorDegree,
        });

        expect(newState).toEqual(data);
    });

    it('Should return new state if reciving type error', () => {
        const tutorDegree = [
            { id: 1, name: 'mgr' },
            { id: 2, name: 'dr' },
        ];

        const data = {
            pending: false,
            tutorsDegree: [],
            error: undefined
        };

        const newState = tutorsDegree(undefined, {
            type: type.FETCH_TUTOR_DEGREE_ERROR,
            payload: tutorDegree
        });

        expect(newState).toEqual(data);
    });
});
