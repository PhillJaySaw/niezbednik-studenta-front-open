/* eslint-disable react/prop-types */
import React from 'react';

const LinksList = (props) => {
  const { handleInputChange, index, linkValue } = props;
  return (
    <>
      <input
        type="url"
        className="form-control link-input"
        placeholder="dodaj link"
        value={linkValue}
        onChange={(e) => handleInputChange(e, index)}
      />
    </>
  );
};

export default LinksList;
