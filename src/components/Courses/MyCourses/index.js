/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserCourses } from '../../../store/reducers/courses/actions';
import Searchbox from '../../items/SearchBox';
import './style.scss';
import Course from '../Course';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import { injectIntl, FormattedMessage } from 'react-intl';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class MyCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    const { fetchUserCourses } = this.props;
    fetchUserCourses();
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { name } = this.state;
    const { fetchUserCourses, intl } = this.props;
    const language = intl.locale;
    const data = {
      language,
      name,
    };
    fetchUserCourses(data);
  };

  render() {
    const { userCourses, fetchUserCoursesPending } = this.props;
    const { name } = this.state;
    let coursesList = '';

    if (userCourses !== undefined) {
      coursesList = userCourses.map((course) => {
        return (
          <Course
            key={course.id}
            id={course.id}
            name={course.name}
            isOnMyList={true}
            myCourses={true}
          />
        );
      });
    }

    return (
      <>
        <div className="current-option-content">
          <div className="search-bar">
            <Searchbox
              name={name}
              handleChangeInput={this.handleChangeInput}
              handleSubmit={this.handleSubmit}
            />
          </div>
          <BeatLoader
            css={override}
            size={30}
            color={'#263493'}
            loading={fetchUserCoursesPending}
          />
          {!fetchUserCoursesPending && <div className="tiles-list course-list">
            {coursesList.length ? coursesList 
            : <div className="course-list-message forum-post">
              <FormattedMessage id="courses.join-courses.1" />
              <a href="/courses/all"><FormattedMessage id="courses.join-courses.2" /></a>
              <FormattedMessage id="courses.join-courses.3" />
              </div>}
            </div>}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userCourses: state.courses.userCourses,
  fetchUserCoursesPending: state.courses.fetchUserPending,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserCourses: (data) => dispatch(fetchUserCourses(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MyCourses));
