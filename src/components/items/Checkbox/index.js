/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-indent */
import React from 'react';

const Checkbox = (props) => {
  const { name, id, displayName, checked, onChange } = props;
  return (
    <>
      <label key={id} className={"checkbox-label"+ " " + name}>
        <input type="checkbox" name={name} value={id} checked={checked} onChange={onChange} />
        <p className="checkbox-display-name">{displayName}</p>
      </label>
    </>
  );
};

export default Checkbox;
