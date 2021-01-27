/* eslint-disable react/prop-types */
import React from 'react';

const TutorsList = (props) => {
  const { name, surname, id, handleInputChange } = props;
  const space = ' ';
  return (
    <>
      <input type="checkbox" name="selectedTutors" value={id} onChange={handleInputChange} />
      {name}
      {space}
      {surname}
      <br />
    </>
  );
};

export default TutorsList;
