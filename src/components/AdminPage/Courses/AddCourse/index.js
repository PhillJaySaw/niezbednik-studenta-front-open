/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './style.scss';
import LinksList from './LinksList';
import {
  checkIfNameExist,
  checkedToObjectArray,
  checkedToArrayDegree,
} from '../../../../helpers/Functions/CheckFunctions';
import {
  isValidDataCourses,
  validationHttp,
} from '../../../../helpers/Functions/ValidationFunctions';
import fetchTutorData from '../../../../store/reducers/tutors/actions';
import { searchTutorFunction } from '../../../../helpers/Functions/SearchFunctions';
import Checkbox from '../../../items/Checkbox';
import { addCourse, deleteCourse, editCourse } from '../../../../store/reducers/courses/actions';
import DeleteMessageBox from '../../../items/DeleteMessageBox';
import { injectIntl, FormattedMessage } from 'react-intl';

class AddCourse extends Component {
  constructor(props) {
    super(props);

    const { courses, tutors, term, studiesMajor, editMode, editCourseData } = this.props;

    if (editMode) {
      const courseLinks = editCourseData.courseInformation.links.map((link) => link.url);
      const courseDegrees = new Map();
      editCourseData.courseInformation.degrees.forEach((degree) => {
        courseDegrees.set(degree, true);
      });
      const courseTerms = new Map();
      editCourseData.courseInformation.terms.forEach((term) => {
        courseTerms.set(term.id, true);
      });
      const courseStudiesMajors = new Map();
      editCourseData.courseInformation.studiesMajors.forEach((studiesMajor) => {
        courseStudiesMajors.set(studiesMajor.id, true);
      });
      const courseTutors = new Map();
      editCourseData.courseInformation.coordinators.forEach((coordinator) => {
        courseTutors.set(coordinator.id, true);
      });
      this.state = {
        id: editCourseData.id,
        courseName: editCourseData.name,
        originalName: editCourseData.name,
        firstLink: courseLinks[0],
        links: courseLinks.slice(1),
        selectedDegree: courseDegrees,
        selectedTerm: courseTerms,
        selectedStudiesMajor: courseStudiesMajors,
        selectedTutors: courseTutors,
        searchTutor: '',
        courses,
        tutors,
        term,
        studiesMajor,
        messageBoxOpen: false,
      };
    } else {
      this.state = {
        id: '',
        courseName: '',
        originalName: '',
        firstLink: '',
        links: [],
        selectedDegree: new Map(),
        selectedTerm: new Map(),
        selectedStudiesMajor: new Map(),
        selectedTutors: new Map(),
        searchTutor: '',
        courses,
        tutors,
        term,
        studiesMajor,
        messageBoxOpen: false,
      };
    }
  }

  componentDidMount() {
    const { fetchTutorData } = this.props;
    fetchTutorData();
  }

  handleAddInput = () => {
    const { links, firstLink } = this.state;
    const { intl } = this.props;

    if (firstLink !== '') {
      this.setState({
        links: [...links, ''],
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: intl.formatMessage({ id: 'message-box.links.required' }),
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const isChecked = e.target.checked;
      if (name === 'selectedTutors') {
        this.setState((prevState) => ({
          selectedTutors: prevState.selectedTutors.set(parseInt(value), isChecked),
        }));
      } else if (name === 'selectedStudiesMajor') {
        this.setState((prevState) => ({
          selectedStudiesMajor: prevState.selectedStudiesMajor.set(parseInt(value), isChecked),
        }));
      } else if (name === 'selectedDegree') {
        this.setState((prevState) => ({
          selectedDegree: prevState.selectedDegree.set(parseInt(value), isChecked),
        }));
      } else if (name === 'selectedTerm') {
        this.setState((prevState) => ({
          selectedTerm: prevState.selectedTerm.set(parseInt(value), isChecked),
        }));
      }
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleLinksInputChange = (e, index) => {
    const { links } = this.state;
    links[index] = e.target.value;
    this.setState({
      links,
    });
  };

  fetchDataAdd = (id, courseName, links, degree, studiesMajors, term, tutors) => {
    const { addCourse, editCourse, editMode, handleModal } = this.props;

    if (editMode) {
      editCourse(id, courseName, degree, studiesMajors, links, term, tutors);
    } else {
      addCourse(courseName, degree, studiesMajors, links, term, tutors);
    }
    handleModal();
  };

  handleSubmit = () => {
    const {
      id,
      courseName,
      originalName,
      firstLink,
      links,
      selectedDegree,
      selectedTerm,
      selectedStudiesMajor,
      selectedTutors,
      courses,
    } = this.state;
    const { editMode, intl } = this.props;

    const selectedName = courseName.trim();
    const selectedFirstLink = firstLink.trim();
    const degree = checkedToArrayDegree(selectedDegree);
    const studiesMajors = checkedToObjectArray(selectedStudiesMajor);
    const term = checkedToObjectArray(selectedTerm);
    const tutors = checkedToObjectArray(selectedTutors);

    if (isValidDataCourses(selectedName, selectedFirstLink, degree, term, studiesMajors, tutors)) {
      for (let i = 0; i < links.length; i++) {
        if (links[i] === '') {
          links.splice(i, 1);
        }
      }

      const linksMap = links.map((link) => {
        const array = {
          url: validationHttp(link) ? link : 'https://' + link,
        };
        return array;
      });
      linksMap.unshift({ url: validationHttp(firstLink) ? firstLink : 'https://' + firstLink });

      if ((editMode && originalName === selectedName) || !checkIfNameExist(selectedName, courses)) {
        this.fetchDataAdd(id, selectedName, linksMap, degree, studiesMajors, term, tutors);
      } else {
        Swal.fire({
          icon: 'error',
          text: intl.formatMessage({ id: 'message-box.course.exists' }),
        });
      }
    }
  };

  onDeleteClick = () => {
    const { deleteCourse, handleModal } = this.props;
    const { id } = this.state;
    deleteCourse(id);
    this.setState({
      messageBoxOpen: false,
    });
    handleModal();
  };

  handleClickMessageBox = () => {
    const { messageBoxOpen } = this.state;
    this.setState({
      messageBoxOpen: !messageBoxOpen,
    });
  };

  render() {
    const {
      links,
      courseName,
      firstLink,
      searchTutor,
      term,
      studiesMajor,
      selectedTutors,
      selectedStudiesMajor,
      selectedTerm,
      selectedDegree,
      messageBoxOpen,
      id,
    } = this.state;
    const { handleModal, editMode, intl, tutors } = this.props;
    let tutorsList;

    if (searchTutor === '') {
      tutorsList = tutors.map((tutor) => (
        <Checkbox
          key={tutor.id}
          name="selectedTutors"
          id={tutor.id}
          displayName={tutor.name + ' ' + tutor.surname}
          checked={selectedTutors.get(tutor.id)}
          onChange={this.handleInputChange}
        />
      ));
    } else {
      const filtredTutors = searchTutorFunction(searchTutor, tutors);
      tutorsList = filtredTutors.map((tutor) => (
        <Checkbox
          key={tutor.id}
          name="selectedTutors"
          id={tutor.id}
          displayName={tutor.name + ' ' + tutor.surname}
          checked={selectedTutors.get(tutor.id)}
          onChange={this.handleInputChange}
        />
      ));
    }

    const linksList = links.map((link, index) => {
      // eslint-disable-next-line max-len
      return (
        <LinksList
          key={index}
          linkValue={link}
          handleInputChange={this.handleLinksInputChange}
          index={index}
        />
      );
    });

    let filters = [];
    studiesMajor.map((element) => {
      filters.push({
        name: 'selectedStudiesMajor',
        id: element.id,
        displayName: intl.locale === 'pl' ? element.name : element.nameEn,
        checked: selectedStudiesMajor.get(element.id),
      });
    });

    term.map((element) => {
      filters.push({
        name: 'selectedTerm',
        id: element.id,
        displayName: intl.locale === 'pl' ? element.name : element.nameEn,
        checked: selectedTerm.get(element.id),
      });
    });

    filters.push(
      {
        name: 'selectedDegree',
        id: 1,
        displayName: intl.formatMessage({ id: 'course.degree-1' }),
        checked: selectedDegree.get(1),
      },
      {
        name: 'selectedDegree',
        id: 2,
        displayName: intl.formatMessage({ id: 'course.degree-2' }),
        checked: selectedDegree.get(2),
      },
    );

    const coursesFilters = filters.map((filter) => (
      <>
        <Checkbox
          key={filter.id}
          name={filter.name}
          id={filter.id}
          displayName={filter.displayName}
          checked={filter.checked}
          onChange={this.handleInputChange}
        />
      </>
    ));

    return (
      <>
        <MDBModal isOpen={handleModal} toggle={handleModal} centered>
          {messageBoxOpen && (
            <DeleteMessageBox
              messageBoxOpen={messageBoxOpen}
              handleClickMessageBox={this.handleClickMessageBox}
              handleClickYesButton={this.onDeleteClick}
              message={intl.formatMessage({ id: 'message-box.delete-course.confirmation' })}
            />
          )}
          <div className="modal-header">
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          <div className="modal-wrapper form-group modal-course">
            {editMode && (
              <a href={'/course' + id + '/forum'}>
                <div className="go-to-course-page">
                  {intl.formatMessage({ id: 'button.course.go-to-course' })}
                </div>
              </a>
            )}
            <div className="modal-field">
              <div className="modal-title">
                <p className="course-title">
                  <FormattedMessage id="admin.course.title" />
                </p>
                <div />
              </div>
              <input
                type="text"
                className="form-control"
                placeholder={intl.formatMessage({ id: 'admin.course.name' })}
                name="courseName"
                value={courseName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="modal-field">
              <div className="modal-title">
                <p>
                  <FormattedMessage id="admin.tutor.title" />
                </p>
                <div />
              </div>
              <input
                type="text"
                className="form-control search-tutor"
                placeholder={intl.formatMessage({ id: 'admin.course.search-tutor' })}
                name="searchTutor"
                value={searchTutor}
                onChange={this.handleInputChange}
              />
              <div className="modal-tutors-container checkbox-list">{tutorsList}</div>
            </div>
            <div className="modal-field">
              <div className="modal-title">
                <p>
                  <FormattedMessage id="admin.course.links" />
                </p>
                <div />
              </div>
              <div className="links">
                <input
                  type="url"
                  className="form-control link-input"
                  placeholder={intl.formatMessage({ id: 'admin.links.link-name' })}
                  name="firstLink"
                  onChange={this.handleInputChange}
                  value={firstLink}
                />
                {linksList}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="modal-plus-icon"
                  onClick={this.handleAddInput}
                />
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-title">
                <p>
                  <FormattedMessage id="admin.course.filters" />
                </p>
                <div />
              </div>
              <div className="modal-filters checkbox-list">{coursesFilters}</div>
            </div>
            <div className="modal-field">
              <div className="modal-add-button button" onClick={this.handleSubmit}>
                <p>
                  {editMode
                    ? intl.formatMessage({ id: 'button.save' })
                    : intl.formatMessage({ id: 'button.add' })}
                </p>
              </div>
              {editMode ? (
                <div className="modal-delete-button" onClick={this.handleClickMessageBox}>
                  <p>
                    <FormattedMessage id="course.delete" />
                  </p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </MDBModal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tutors: state.tutors.tutors,
  tutorsPageNumber: state.tutors.pageNumber,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (name, degree, studiesMajors, links, terms, coordinators) => {
      dispatch(addCourse(name, degree, studiesMajors, links, terms, coordinators));
    },
    editCourse: (id, name, degree, studiesMajors, links, terms, coordinators) => {
      dispatch(editCourse(id, name, degree, studiesMajors, links, terms, coordinators));
    },
    deleteCourse: (id) => dispatch(deleteCourse(id)),
    fetchTutorData: (page, sortParam, data) => dispatch(fetchTutorData(page, sortParam, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddCourse));
