/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export const checkIfNameExist = (name, data) => {
  name = name.toLowerCase().replace(/\s/g, '');
  let checkName = false;

  data.map((element) => {
    let comparableName = element.name.toLowerCase().replace(/\s/g, '');
    if (comparableName === name) checkName = true;
    return true;
  });

  return checkName;
};

export const checkIfUrlExist = (url, data) => {
  url = url.toLowerCase();
  let checkUrl = false;
  data.map((element) => {
    element.url = element.url.toLowerCase();
    if (element.url === url) checkUrl = true;
    return true;
  });

  return checkUrl;
};

export const checkIfTutorExist = (name, surname, tutors) => {
  let checkTutor = false;

  tutors.map((tutor) => {
    if (tutor.name === name && tutor.surname === surname) checkTutor = true;
    return true;
  });

  return checkTutor;
};

export const checkedToObjectArray = (map) => {
  const array = [];
  for (let [id, checked] of map) {
    if (checked) {
      array.push({ id: id });
    }
  }
  return array;
};

export const checkedToArray = (map) => {
  const array = [];
  for (let [id, checked] of map) {
    if (checked) {
      array.push(id);
    }
  }
  return array;
};

export const checkedToString = (map) => {
  const array = [];
  for (let [id, checked] of map) {
    if (checked) {
      array.push(id);
    }
    if (array.length > 1) {
      return null;
    }
  }
  return array ? array[0] : null;
};

export const checkedToArrayDegree = (map) => {
  let array = [];
  for (let [id, checked] of map) {
    if (checked) {
      array.push(id);
    }
  }
  return array;
};
