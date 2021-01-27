import {
  searchTutorFunction,
  searchCourseById,
  searchCourseFunction,
  searchPostFunction,
} from '../index';

const tutorsData = [
  { id: 1, name: 'Piotr', surname: 'Piotrkowski' },
  { id: 2, name: 'Krzysztof', surname: 'Dyczkowski' },
  { id: 3, name: 'Tomek', surname: 'Tomczak' },
];

const courseData = [
  { id: 1, name: 'Matematyka' },
  { id: 2, name: 'Programowanie' },
  { id: 3, name: 'Analiza danych' },
];

const postData = [
  { id: 1, date: '2020-06-02T20:02:21.140701', content: 'Testowy post', likes: 1 },
  { id: 2, date: '2020-06-02T20:02:21.140701', content: 'Co tam u was słychać?', likes: 1 },
];

describe('Search tutors by name', () => {
  it('Should return object of this tutor', () => {
    expect(searchTutorFunction('Krzysztof Dyczkowski', tutorsData)).toEqual([
      {
        id: 2,
        name: 'Krzysztof',
        surname: 'Dyczkowski',
      },
    ]);
  });

  it('Should return empty object', () => {
    expect(searchTutorFunction('Sylwia Antoniuk', tutorsData)).toEqual([]);
  });
});

describe('Search course by name', () => {
  it('Should return object of this course', () => {
    expect(searchCourseFunction('Matematyka', courseData)).toEqual([{ id: 1, name: 'Matematyka' }]);
  });

  it('Should return empty object', () => {
    expect(searchCourseFunction('Logika', courseData)).toEqual([]);
  });
});

describe('Search course by id', () => {
  it('Should return name of course', () => {
    expect(searchCourseById(2, courseData)).toEqual({ id: 2, name: 'Programowanie' });
  });

  it('Should return false', () => {
    expect(searchCourseById(5, courseData)).toBeFalsy();
  });
});

describe('Search posts by name', () => {
  it('Should return object of this post', () => {
    expect(searchPostFunction('Testowy post', postData)).toEqual([
      { id: 1, date: '2020-06-02T20:02:21.140701', content: 'Testowy post', likes: 1 },
    ]);
  });

  it('Should return empty object', () => {
    expect(searchPostFunction('Oto nowy pościk', postData)).toEqual([]);
  });
});
