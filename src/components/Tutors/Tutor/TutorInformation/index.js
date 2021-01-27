/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { fetchTutorCoursesData } from '../../../../store/reducers/tutors/actions';
import TutorCoursesLinks from './TutorCoursesLinks';
import TutorCoursesName from './TutorCoursesName';
import AddTutor from '../../../AdminPage/Tutors/AddTutor';
import fetchTutorDegreeData from '../../../../store/reducers/tutors-degree/actions';

class TutorInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalTutorOpen: false,
    };
  }

  componentDidMount = () => {
    const { id } = this.props;
    const { fetchTutorCoursesData, fetchTutorDegreeData } = this.props;
    fetchTutorCoursesData(id);
    fetchTutorDegreeData();
  };

  handleClickModalTutor = () => {
    const { isModalTutorOpen } = this.state;
    this.setState({
      isModalTutorOpen: !isModalTutorOpen,
    });
  };

  render() {
    const { isModalTutorOpen } = this.state;
    const {
      handleModal,
      name,
      surname,
      degree,
      information,
      page,
      tutorCourses,
      tutors,
      tutorsDegree,
      id,
      user,
    } = this.props;
    const space = ' ';
    let coursesName = '';
    let coursesLinks = '';
    let editTutorData = '';

    const degreeId = tutorsDegree.filter((element) => element.name === degree);
    if (degreeId[0] !== undefined) {
      editTutorData = {
        id,
        information,
        name,
        surname,
        page,
        selectedDegree: {
          id: degreeId[0].id,
        },
      };
    }

    if (tutorCourses !== undefined) {
      coursesName = tutorCourses.map((course) => {
        return (
          <TutorCoursesName
            key={course.id}
            id={course.id}
            name={course.name}
            isUserBelong={course.isUserBelong}
          />
        );
      });

      coursesLinks = tutorCourses.map((course) => {
        return (
          <TutorCoursesLinks
            key={course.id}
            id={course.id}
            name={course.name}
            links={course.courseInformation.links}
          />
        );
      });
    }

    return (
      <>
        <MDBModal isOpen={handleModal} toggle={handleModal} centered className="tutor-modal">
          <div className="modal-header">
            {/* eslint-disable-next-line max-len */}
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          <div className="tutor-information">
            {user.admin && (
              <div className="go-to-course-page" onClick={this.handleClickModalTutor}>
                <FontAwesomeIcon className="hover-icon" icon={faPen} />
              </div>
            )}
            <div className="list-element-name-tutor-title">
              <p>
                {degree}
                {space}
                {name}
                {space}
                {surname}
              </p>
            </div>
            <div className="tutor-title-information">
              <p>{information}</p>
            </div>
            <div className="tutor-courses-container">
              <div className="tutor-courses">
                <span>
                  <FormattedMessage id="tutors.courses" />
                </span>
                <div className="tutors-line" />
                <div className="tutor-courses-name">{coursesName}</div>
              </div>
              <div className="tutor-courses-links">
                <span>
                  <FormattedMessage id="tutors.page" />
                </span>
                <div className="tutors-line" />
                <div className="tutor-courses-links-list">
                  <a href={page} target="_blank">
                    {page}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </MDBModal>
        {isModalTutorOpen && (
          <AddTutor
            handleModal={this.handleClickModalTutor}
            tutors={tutors}
            tutorsDegree={tutorsDegree}
            editMode={true}
            editTutorData={editTutorData}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tutorCourses: state.tutors.tutorCourses,
  tutors: state.tutors.tutors,
  tutorsDegree: state.tutorsDegree.tutorsDegree,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTutorCoursesData: (tutorId) => dispatch(fetchTutorCoursesData(tutorId)),
  fetchTutorDegreeData: () => dispatch(fetchTutorDegreeData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TutorInformation);
