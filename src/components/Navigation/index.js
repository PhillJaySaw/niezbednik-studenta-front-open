/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faBell, faAngleDown, faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsBar from './SettingsBar';
import NotificationsBar from './NotificationsBar';
import './style.scss';
import { connect } from 'react-redux';
import { fetchUserNotifications } from '../../store/reducers/user/action';

function toggle() {
  const categories = document.getElementsByClassName('category__dropdown');
  Array.from(categories).forEach((category) => {
    category.classList.toggle('hide-category');
  });
}

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNotificationsBarActive: false,
      isSettingsBarActive: false,
      moreFetching: false,
    };
  }

  handleNotificationsBar = () => {
    const { isNotificationsBarActive } = this.state;
    const { fetchUserNotifications } = this.props;
    fetchUserNotifications(0);
    this.setState({
      isNotificationsBarActive: !isNotificationsBarActive,
      isSettingsBarActive: false,
    });
  };

  fetchMoreNotifications = () => {
    const { fetchUserNotifications, notificationsPageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = notificationsPageNumber + 1;
    fetchUserNotifications(page);
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  handleSettingsBar = () => {
    const { isSettingsBarActive } = this.state;
    this.setState({
      isSettingsBarActive: !isSettingsBarActive,
      isNotificationsBarActive: false,
    });
  };

  render() {
    const {
      location,
      user,
      userNotifications,
      notificationsPageNumber,
      notificationsPending,
      notificationsTotalPages,
      notificationsRead,
    } = this.props;
    const { isSettingsBarActive, isNotificationsBarActive, moreFetching } = this.state;

    const categoriesList = [
      { name: <FormattedMessage id="categories.news" />, path: '/notice_board/news' },
      { name: <FormattedMessage id="categories.courses" />, path: '/courses/my' },
      { name: <FormattedMessage id="categories.tutors" />, path: '/tutors' },
      { name: <FormattedMessage id="categories.helpful-links" />, path: '/helpful_links' },
    ];

    const categories = categoriesList.map((category, index) => {
      const currentPath = window.location.pathname;
      const categoryPath = category.path;
      const lastIndex = (str) => (str.indexOf('/', 1) > 0 ? str.indexOf('/', 1) : str.length);
      const categoryPathEntry = categoryPath.substr(0, lastIndex(categoryPath));
      const currentPathEntry = currentPath.substr(0, lastIndex(currentPath));
      const current = currentPathEntry === categoryPathEntry;
      const pathToDisplayCategory =
        categoriesList.filter(
          (category) => category.path.substr(0, lastIndex(category.path)) === currentPathEntry,
        ).length === 0
          ? '/notice_board'
          : currentPathEntry;
      const display = categoryPathEntry === pathToDisplayCategory;
      const className = `category ${
        current && display
          ? 'category__current'
          : display
          ? 'category__display'
          : 'category__dropdown hide-category'
      }`;
      return (
        <li key={index} className={className} onClick={display ? () => toggle() : () => {}}>
          {' '}
          <a href={category.path}>
            {category.name}{' '}
            {display ? (
              <FontAwesomeIcon icon={faAngleDown} className="expand-categories-icon" />
            ) : (
              ''
            )}
          </a>
        </li>
      );
    });

    return (
      <nav>
        <div className="title-bar">
          <div className="title-bar__title">
            <div className="ns-logo" onClick={() => (window.location = '/')}></div>
          </div>
          <div className="title-bar__icons">
            {notificationsRead === false && <div className="notification-number"></div>}
            <div className="title-bar-options-icon" onClick={() => this.handleNotificationsBar()}>
              <FontAwesomeIcon icon={faBell} className="bell-icon" />
            </div>
            <div className="title-bar-options-icon" onClick={() => this.handleSettingsBar()}>
              <FontAwesomeIcon icon={faCog} className="menu-icon" />
            </div>
          </div>
        </div>
        {location.pathname !== '/' && location.pathname !== '/admin_page' && (
          <div className="categories">
            <ul className="categories-list">{categories}</ul>
          </div>
        )}
        {isNotificationsBarActive ? (
          <NotificationsBar
            close={this.handleNotificationsBar}
            userNotifications={userNotifications}
            notificationsPending={notificationsPending}
            pageNumber={notificationsPageNumber}
            totalPages={notificationsTotalPages}
            moreFetching={moreFetching}
            fetchMoreNotifications={this.fetchMoreNotifications}
          />
        ) : undefined}
        {isSettingsBarActive ? <SettingsBar close={this.handleSettingsBar} /> : undefined}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  userNotifications: state.user.userNotifications,
  notificationsTotalPages: state.user.notificationsTotalPages,
  notificationsPageNumber: state.user.notificationsPageNumber,
  notificationsPending: state.user.notificationsPending,
  notificationsRead: state.user.notificationsRead,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserNotifications: (page) => dispatch(fetchUserNotifications(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
