import { validationIsEmpty, validationUrl } from '../index';

window.alert = jest.fn();

describe('Validation if content is empty', () => {
  it('Should return false', () => {
    expect(validationIsEmpty('Blabla')).toBeTruthy();
  });

  it('Should return true', () => {
    window.alert.mockClear();
    expect(validationIsEmpty('')).toBeFalsy();
  });
});

describe('Validation url', () => {
  it('Should return true', () => {
    expect(validationUrl('https://github.com')).toBeTruthy();
  });
});
