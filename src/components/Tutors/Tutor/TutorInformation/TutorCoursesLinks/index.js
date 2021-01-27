/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import React from 'react';

const TutorCoursesLinks = (props) => {
  const { name, links } = props;

  const listLinks = links.map((link, index) => {
    return (
      <li key={index}>
        <a href={link.url} target="_blank">
          {link.url}
        </a>
      </li>
    );
  });

  return (
    <>
      <ul>
        {name}
        {listLinks}
      </ul>
    </>
  );
};

export default TutorCoursesLinks;
