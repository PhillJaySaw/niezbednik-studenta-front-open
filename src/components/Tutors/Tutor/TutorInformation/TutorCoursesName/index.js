/* eslint-disable react/prop-types */
import React from 'react';

const TutorCoursesName = (props) => {
  const { name, id, isUserBelong } = props;

  return (
    <>
      {!isUserBelong ? (
        <li>{name}</li>
      ) : (
        <li>
          <a href={`/course${id}/forum`}>{name}</a>
        </li>
      )}
    </>
  );
};

export default TutorCoursesName;
