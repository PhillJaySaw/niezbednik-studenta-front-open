/* eslint-disable no-else-return */
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { getIntl } from '../../intl';

const intl = getIntl();

export const isValidDataCourses = (
  courseName,
  firstLink,
  selectedDegree,
  selectedTerm,
  selectedStudiesMajor,
  selectedTutors,
) => {

  const namePattern = new RegExp('^[A-ZĆŁŚŹŻ].*$', 'u');
  if (courseName === '') {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-course-name' }),
    });
    return false;
  } else if (firstLink === '') {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-links' }),
    });
    return false;
  } else if (selectedTutors.length === 0) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-tutors' }),
    });
    return false;
  } else if (selectedStudiesMajor.length === 0) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-studies-major' }),
    });
    return false;
  } else if (selectedDegree.length === 0) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-degree' }),
    });
    return false;
  } else if (selectedTerm.length === 0) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-term' }),
    });
    return false;
  } else if (!namePattern.test(courseName)) {
    Swal.fire({
      icon: 'error',
      text: courseName + ' ' + intl.formatMessage({ id: 'message-box.course-name.error' }),
    });
    return false;
  }

  return true;
};

export const isValidDataTutors = (name, surname, page) => {
  const linkPattern = new RegExp(
    '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
    'gm',
  );

  const namePattern = new RegExp('^([A-ZĆŁŚŹŻ])[a-ząćęłńóśźż]{1,}$', 'u');
  const surnamePattern = new RegExp(
    '^([A-ZĆŁŚŹŻ])[a-ząćęłńóśźż]{1,}(((-)|\\s)([A-ZĆŁŚŹŻ])[a-ząćęłńóśźż]{1,})?$',
    'u',
  );

  if (name === '' || surname === '' || page === '') {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-fields' }),
    });
    return false;
  } else if (!namePattern.test(name)) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.name-error' }),
    });
    return false;
  } else if (!surnamePattern.test(surname)) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.surname-error' }),
    });
    return false;
  } else if (!linkPattern.test(page)) {
    Swal.fire({
      icon: 'error',
      text: page + ' ' + intl.formatMessage({ id: 'message-box.link-name.error' }),
    });
    return false;
  } else {
    return true;
  }
};

export const validationIsEmpty = (content) => {
  if (content === '') {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.empty-fields' }),
    });
    return false;
  }
  return true;
};

export const validationCharAmount = (content, amount) => {
  if (content.length > amount) {
    Swal.fire({
      icon: 'error',
      text: intl.formatMessage({ id: 'message-box.to-long' }),
    });
    return false;
  }
  return true;
};

export const validationUrl = (url) => {
  const linkPattern = new RegExp(
    '^(http://www.|https://www.|http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
    'gm',
  );

  if (!linkPattern.test(url)) {
    Swal.fire({
      icon: 'error',
      text: url + ' ' + intl.formatMessage({ id: 'message-box.link-name.error' }),
    });
    return false;
  }
  return true;
};

export const validationHttp = (url) => {
  const httpPattern = new RegExp('^http', 'i');

  if (!httpPattern.test(url)) {
    return false;
  }
  return true;
};

export const validationEmail = (address) => {
  const emailAddressPattern = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$", 'i');

  if (!emailAddressPattern.test(address)) {
    return false;
  }
  return true;
};
