/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import fetchCoursesData from '../../../store/reducers/courses/actions';
import fetchTermData from '../../../store/reducers/term/actions';
import fetchStudiesMajorData from '../../../store/reducers/studies-major/actions';
import Searchbox from '../../items/SearchBox';
import Course from '../../Courses/Course';
import './style.scss';
import '../../Courses/Course/style.scss';
import AddCourse from './AddCourse';
import ShowMoreButton from '../../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import { injectIntl } from 'react-intl';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalCourseOpen: false,
      name: '',
      editMode: false,
      editCourseData: '',
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchCoursesData, fetchTermData, fetchStudiesMajorData } = this.props;
    fetchCoursesData(null, 0);
    fetchStudiesMajorData();
    fetchTermData();
  }

  fetchMoreCourses = () => {
    const { fetchCoursesData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchCoursesData(null, page, 'id,desc');
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onAddModalOpen = () => {
    const { isModalCourseOpen } = this.state;
    this.setState({
      isModalCourseOpen: !isModalCourseOpen,
      editMode: false,
    });
  };

  onEditModalOpen = (data) => {
    const { isModalCourseOpen } = this.state;
    this.setState({
      isModalCourseOpen: !isModalCourseOpen,
      editMode: true,
      editCourseData: data,
    });
  };

  handleSubmit = () => {
    const { name } = this.state;
    const { fetchCoursesData, intl } = this.props;
    const language = intl.locale;
    const data = {
      language,
      name,
    };
    fetchCoursesData(data);
  };

  render() {
    const {
      courses,
      term,
      studiesMajor,
      oAuthToken,
      oAuthTokenSecret,
      totalPages,
      pageNumber,
      fetchPending,
    } = this.props;
    const { name, isModalCourseOpen, editMode, editCourseData, moreFetching } = this.state;
    let coursesList = '';

    if (courses !== undefined) {
      coursesList = courses.map((course) => {
        return (
          <Course
            key={course.id}
            id={course.id}
            name={course.name}
            courseInformation={course.courseInformation}
            editable={true}
            handleClickEditModal={(data) => this.onEditModalOpen(data)}
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
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="tiles-list course-list">
                <div
                  className="tiles-list-element course-list-element add-new-course"
                  onClick={this.onAddModalOpen}
                >
                  <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                </div>
                {coursesList}
              </div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreCourses} moreFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
        {isModalCourseOpen && (
          <AddCourse
            handleModal={this.onAddModalOpen}
            courses={courses}
            term={term}
            studiesMajor={studiesMajor}
            oAuthToken={oAuthToken}
            oAuthTokenSecret={oAuthTokenSecret}
            editMode={editMode}
            editCourseData={editCourseData}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  term: state.term.term,
  studiesMajor: state.studiesMajor.studiesMajor,
  oAuthToken: state.userLogin.oAuthToken,
  oAuthTokenSecret: state.userLogin.oAuthTokenSecret,
  pageNumber: state.courses.pageNumber,
  totalPages: state.courses.totalPages,
  fetchPending: state.courses.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoursesData: (data, page, sort) => dispatch(fetchCoursesData(data, page, sort)),
  fetchTermData: () => dispatch(fetchTermData()),
  fetchStudiesMajorData: () => dispatch(fetchStudiesMajorData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Courses));
