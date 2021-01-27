/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import Tutor from '../../Tutors/Tutor';
import { injectIntl, FormattedMessage } from 'react-intl';
import './style.scss';
import { fetchCourseUsers } from '../../../store/reducers/courses/actions';
import { connect } from 'react-redux';
import CourseUser from './CourseUser';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class Info extends Component {
  constructor(props) {
    super(props);
    const { courseInfo } = this.props;

    this.state = {
      tutors: courseInfo.coordinators,
      links: courseInfo.links,
    };
  }

  componentDidMount() {
    const { courseId, fetchCourseUsers } = this.props;
    fetchCourseUsers(courseId);
  }

  render() {
    const { tutors, links } = this.state;
    const { courseUsers, fetchCoursesUsersPending } = this.props;
    let tutorsList = '';
    let listLinks = '';
    let usersList = '';

    if (tutors !== undefined) {
      tutorsList = tutors.map((tutor) => (
        <Tutor
          key={tutor.id}
          id={tutor.id}
          degree={tutor.coordinatorDegree}
          name={tutor.name}
          surname={tutor.surname}
          page={tutor.page}
          information={tutor.information}
          isAdmin={false}
        />
      ));
    }
    if (listLinks !== undefined) {
      listLinks = links.map((link, index) => {
        return (
          <li key={index}>
            <a href={link.url} target="_blank">
              {link.url}
            </a>
          </li>
        );
      });
    }
    if (courseUsers !== undefined) {
      usersList = courseUsers.map((user) => {
        return (
          <CourseUser
            key={user.id}
            id={user.id}
            name={user.name}
            surname={user.surname}
            isAdmin={user.admin}
          />
        );
      });
    }

    return (
      <>
        <div className="current-option-content">
          <div className="all-info-container">
            <div className="info-container links-info-container">
              <div className="info-title">
                <FormattedMessage id="course.info.link" />
              </div>
              <div className="title-line"></div>
              <div className="list-links">
                <ul>{listLinks}</ul>
              </div>
            </div>
            <div className="info-container">
              <div className="info-title">
                <FormattedMessage id="course.info.tutor" />
              </div>
              <div className="title-line"></div>
              <div className="items-list">{tutorsList}</div>
            </div>
            <div className="info-container">
              <div className="info-title">
                <FormattedMessage id="course.info.users" />
              </div>
              <div className="title-line"></div>
              <BeatLoader
                css={override}
                size={30}
                color={'#263493'}
                loading={fetchCoursesUsersPending}
              />
              {!fetchCoursesUsersPending && <div className="items-list">{usersList}</div>}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  courseUsers: state.courses.courseUsers,
  fetchCoursesUsersPending: state.courses.fetchCoursesUsersPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourseUsers: (courseId) => dispatch(fetchCourseUsers(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Info));
