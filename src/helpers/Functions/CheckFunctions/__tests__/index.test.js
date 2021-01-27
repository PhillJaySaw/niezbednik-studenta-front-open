import { checkIfNameExist, checkIfTutorExist, checkIfUrlExist } from '../index';

const tutorsData = [
  { id: 1, name: 'Piotr', surname: 'Piotrkowski' },
  { id: 2, name: 'Krzysztof', surname: 'Dyczkowski' },
  { id: 3, name: 'Tomek', surname: 'Tomczak' },
];

const courseData = [
  { id: 1, name: 'Matematyka', url: 'https://githubfsdf.com' },
  { id: 2, name: 'Programowanie', url: 'https://github.com' },
  { id: 3, name: 'Analiza danych', url: 'https://gdadab.com' },
];

describe('Check if name exist', () => {
  it('Should return true', () => {
    expect(checkIfNameExist('Programowanie', courseData)).toBeTruthy();
  });

  it('Should return false', () => {
    expect(checkIfNameExist('Analiza matamatyki', courseData)).toBeFalsy();
  });
});

describe('Check if url exist', () => {
  it('Should return true', () => {
    expect(checkIfUrlExist('https://github.com', courseData)).toBeTruthy();
  });

  it('Should return false', () => {
    expect(checkIfUrlExist('https://google.com', courseData)).toBeFalsy();
  });
});

describe('Check if tutor exist', () => {
  it('Should return true', () => {
    expect(checkIfTutorExist('Tomek', 'Tomczak', tutorsData)).toBeTruthy();
  });

  it('Should return false', () => {
    expect(checkIfTutorExist('Piotr', 'Dyczkowski', tutorsData)).toBeFalsy();
  });
});
