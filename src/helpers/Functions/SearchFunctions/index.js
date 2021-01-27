/* eslint-disable prefer-template */
export const searchTutorFunction = (value, data) => {
  const filtredData = data.filter((tutor) => {
    const tutorsName = tutor.name + ' ' + tutor.surname;
    return tutorsName.toLowerCase().includes(value.toLowerCase());
  });

  return filtredData;
};

export const searchCourseFunction = (value, data) => {
  const filtredData = data.filter((course) => {
    const courseName = course.name;
    return courseName.toLowerCase().includes(value.toLowerCase());
  });

  return filtredData;
};

export const searchCourseById = (id, data) => {
  const course = data.filter((element) => {
    if (element.id === id) {
      return element.name;
    }

    return null;
  });

  if (course[0] === undefined) return null;
  return course[0];
};

export const searchPostFunction = (value, data) => {
  const filtredData = data.filter((post) => {
    const postName = post.content;
    return postName.toLowerCase().includes(value.toLowerCase());
  });

  return filtredData;
};
