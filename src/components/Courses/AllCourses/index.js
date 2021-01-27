/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import fetchCoursesData from '../../../store/reducers/courses/actions';
import Checkbox from '../../items/Checkbox';
import Course from '../Course';
import './style.scss';
import { checkedToArray, checkedToArrayDegree } from '../../../helpers/Functions/CheckFunctions';
import ShowMoreButton from '../../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import studiesMajor from '../../../store/reducers/studies-major/reducers';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class AllCourses extends Component {
  constructor(props) {
    super(props);
    const { studiesMajor, term } = this.props;
    this.state = {
      term,
      studiesMajor,
      degree: [
        {
          id: 1,
          name: 'I stopień',
          nameEn: 'I degree',
        },
        {
          id: 2,
          name: 'II stopień',
          nameEn: 'II degree',
        },
      ],
      selectedDegree: new Map(),
      selectedTerm: new Map(),
      selectedStudiesMajor: new Map(),
      selectedName: '',
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchCoursesData } = this.props;
    fetchCoursesData(null, 0, 'name,asc');
  }

  fetchMoreCourses = () => {
    const { fetchCoursesData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchCoursesData(null, page, 'name,asc');
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  handleInputNameChange = (e) => {
    const { value } = e.target;
    this.setState({
      selectedName: value,
    });
  };

  handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    const isChecked = e.target.checked;
    if (name === 'selectedStudiesMajor') {
      this.setState((prevState) => ({
        selectedStudiesMajor: prevState.selectedStudiesMajor.set(value, isChecked),
      }));
    } else if (name === 'selectedDegree') {
      this.setState((prevState) => ({
        selectedDegree: prevState.selectedDegree.set(parseInt(value), isChecked),
      }));
    } else if (name === 'selectedTerm') {
      this.setState((prevState) => ({
        selectedTerm: prevState.selectedTerm.set(value, isChecked),
      }));
    }
  };

  handleSubmitFilters = () => {
    const { selectedName, selectedDegree, selectedStudiesMajor, selectedTerm } = this.state;
    const { fetchCoursesData, intl } = this.props;
    const language = intl.locale;

    if (selectedName === '') {
      const degree = checkedToArrayDegree(selectedDegree);
      const studiesMajors = checkedToArray(selectedStudiesMajor);
      const term = checkedToArray(selectedTerm);
      const data = {
        language,
        name: selectedName,
        studiesMajors: studiesMajors,
        terms: term,
        degrees: degree,
      };
      fetchCoursesData(data);
    } else {
      const data = {
        language,
        name: selectedName,
      };
      fetchCoursesData(data);
    }
  };

  render() {
    const { courses, intl, pageNumber, totalPages, fetchPending } = this.props;
    const {
      term,
      studiesMajor,
      degree,
      selectedName,
      selectedStudiesMajor,
      selectedTerm,
      selectedDegree,
      moreFetching,
    } = this.state;

    const studiesMajorFilter = studiesMajor.map((element) => (
      <>
        <Checkbox
          key={element.id}
          name="selectedStudiesMajor"
          id={intl.locale === 'pl' ? element.name : element.nameEn}
          displayName={intl.locale === 'pl' ? element.name : element.nameEn}
          checked={selectedStudiesMajor.get(element.id)}
          onChange={this.handleCheckboxChange}
        />
      </>
    ));
    const termFilter = term.map((element) => (
      <>
        <Checkbox
          key={element.id}
          name="selectedTerm"
          id={intl.locale === 'pl' ? element.name : element.nameEn}
          displayName={intl.locale === 'pl' ? element.name : element.nameEn}
          checked={selectedTerm.get(element.id)}
          onChange={this.handleCheckboxChange}
        />
      </>
    ));
    const degreeFilter = degree.map((element) => (
      <>
        <Checkbox
          key={element.id}
          name="selectedDegree"
          id={element.id}
          displayName={intl.locale === 'pl' ? element.name : element.nameEn}
          checked={selectedDegree.get(element.id)}
          onChange={this.handleCheckboxChange}
        />
      </>
    ));

    const coursesList = courses.map((course) => (
      <Course
        key={course.id}
        id={course.id}
        name={course.name}
        isOnMyList={course.isUserBelong}
        button={true}
      />
    ));

    return (
      <>
        <div className="search-course-filter">
          <div className="filter-title">
            <p>
              <FormattedMessage id="courses.search-filters" />
            </p>
          </div>
          <div className="filter-container">
            <div className="filter-category course-category">
              <p>
                <FormattedMessage id="courses.search-filters.major" />:
              </p>
              <div className="filter-forms">{studiesMajorFilter}</div>
            </div>
            <div className="filter-category course-semester">
              <p>
                <FormattedMessage id="courses.search-filters.term" />:
              </p>
              <div className="filter-forms">{termFilter}</div>
            </div>
            <div className="filter-category course-degree">
              <p>
                <FormattedMessage id="courses.search-filters.degree" />:
              </p>
              <div className="filter-forms">{degreeFilter}</div>
            </div>
          </div>
          <input
            className="form-control course-search-input"
            type="search"
            placeholder={intl.formatMessage({ id: 'placeholder.search-by-name' })}
            name="selectedName"
            value={selectedName}
            onChange={this.handleInputNameChange}
          />
          <div className="filter-search-button button" onClick={this.handleSubmitFilters}>
            <p>
              <FormattedMessage id="button.search" />
            </p>
          </div>
        </div>
        <div className="current-option-content">
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="tiles-list course-list">{coursesList}</div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreCourses} moreFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  term: state.term.term,
  studiesMajor: state.studiesMajor.studiesMajor,
  pageNumber: state.courses.pageNumber,
  totalPages: state.courses.totalPages,
  fetchPending: state.courses.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoursesData: (data, page, sort) => dispatch(fetchCoursesData(data, page, sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AllCourses));
