/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';

function toggle() {
  document
    .getElementsByClassName('bookmarks-dropdown')[0]
    .classList.toggle('bookmarks-dropdown__hidden');
}

class BookmarksBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleRedirect = (name) => {
    const { history, bookmarksList } = this.props;
    history.push(name);
    if (bookmarksList.length > 3) {
      toggle();
    }
  };

  render() {
    const { bookmarksList } = this.props;

    const bookmarks = bookmarksList.map((bookmark, index) => {
      let pathname = window.location.pathname;
      let pathIndex = pathname.indexOf('/', 1) + 1;
      let currentPath = pathname.substr(pathIndex, pathname.length);
      let isCurrent = bookmark.path === currentPath;
      let bookmarkPath = pathname.substr(0, pathIndex) + bookmark.path;
      return (
        <li
          key={index}
          className={'bookmark ' + (isCurrent ? 'bookmark__current' : 'bookmark__select')}
          onClick={isCurrent ? () => toggle() : () => this.handleRedirect(bookmarkPath)}
        >
          <a>
            <p>{bookmark.name}</p>
            {isCurrent ? (
              <FontAwesomeIcon icon={faAngleDown} className="expand-bookmarks-icon" />
            ) : (
              ''
            )}
          </a>
        </li>
      );
    });

    return (
      <ul
        className={
          'bookmarks' +
          (bookmarksList.length > 3 ? ' bookmarks-dropdown bookmarks-dropdown__hidden' : '')
        }
      >
        {bookmarks}
      </ul>
    );
  }
}

export default withRouter(BookmarksBar);
