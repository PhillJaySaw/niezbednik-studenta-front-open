/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faPen, faMinus } from '@fortawesome/free-solid-svg-icons';
import {
  checkIfUserIsMember,
  joinToCourse,
  leaveCourse,
} from '../../../store/reducers/courses/actions';
import './style.scss';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSpinning: false,
      leaveSpinning: false,
    };
  }

  handleClickJoinToCourse = () => {
    const { id, joinToCourse } = this.props;

    Promise.resolve(checkIfUserIsMember(id)).then((value) => {
      if (!value) {
        joinToCourse(id);
      }
    });
    this.setState({
      isSpinning: true,
    });
  };

  handleClickLeaveCourse = () => {
    const { id, leaveCourse } = this.props;
    leaveCourse(id);
    this.setState({
      leaveSpinning: true,
    });
  };

  onEditCourseClick = () => {
    const { name, id, courseInformation, handleClickEditModal } = this.props;
    const data = {
      id,
      name,
      courseInformation,
    };
    handleClickEditModal(data);
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  render() {
    const { isOnMyList, button, editable, name, id, joinPending, myCourses } = this.props;
    const { isSpinning, leaveSpinning } = this.state;
    const path = '/course' + id.toString() + '/forum';

    return (
      <div
        className={
          'tiles-list-element course-list-element' +
          (!isOnMyList && !editable ? ' tiles-list-element course-list-element__grayed-out' : '')
        }
        onClick={editable ? this.onEditCourseClick : () => {}}
      >
        {isOnMyList || editable ? (
          <a className="course-name" onClick={editable ? this.onEditCourseClick : () => (window.location = path)}>
            {name}
          </a>
        ) : (
          <p className="course-name">{name}</p>
        )}
        {myCourses && (
          <div className="course-button add-course" onClick={this.handleClickLeaveCourse}>
            {joinPending && leaveSpinning ? (
              <Spinner animation="border" role="status" />
            ) : (
              <p>
                <FormattedMessage id="button.leave" />
              </p>
            )}
            {<FontAwesomeIcon icon={faMinus} className="icon" />}
          </div>
        )}
        {button ? (
          <div
            className={'course-button ' + (!isOnMyList ? 'add-course' : 'on-list-course')}
            onClick={!isOnMyList ? this.handleClickJoinToCourse : () => {}}
          >
            {joinPending && !isOnMyList && isSpinning ? (
              <Spinner animation="border" role="status" />
            ) : (
              <div>
                {!isOnMyList ? (
                  <p>
                    <FormattedMessage id="button.join" />
                  </p>
                ) : (
                  <p>
                    <FormattedMessage id="button.belong" />
                  </p>
                )}
                {!isOnMyList ? (
                  <FontAwesomeIcon icon={faPlus} className="icon" />
                ) : (
                  <FontAwesomeIcon icon={faCheck} className="icon" />
                )}
              </div>
            )}
          </div>
        ) : (
          ''
        )}
        {editable ? (
          <FontAwesomeIcon icon={faPen} className="edit-icon" onClick={this.onEditCourseClick} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  joinPending: state.courses.joinPending,
});

const mapDispatchToProps = (dispatch) => ({
  joinToCourse: (courseId) => dispatch(joinToCourse(courseId)),
  leaveCourse: (courseId) => dispatch(leaveCourse(courseId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Course);
