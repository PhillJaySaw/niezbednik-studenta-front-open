/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import AddItemButton from '../../../../items/AddItemButton';
import './style.scss';
import {
  addTutoringOffer,
  editTutoringOffer,
} from '../../../../../store/reducers/tutoring-offers/action';
import fetchCoursesData from '../../../../../store/reducers/courses/actions';
import {
  validationIsEmpty,
  validationCharAmount,
} from '../../../../../helpers/Functions/ValidationFunctions';
import PostAlert from '../../../../Course/Forum/AddPost/PostAlert';
import DeleteMessageBox from '../../../../items/DeleteMessageBox';
import UserModal from '../../../../User/UserModal';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

function toggleCourseList() {
  document
    .getElementsByClassName('tutoring-course-list')[0]
    .classList.toggle('tutoring-course-list__hidden');
}

function changeSelectedCourse(previousId, id) {
  if (previousId !== '') {
    document.getElementById(previousId).classList.toggle('li__selected');
  }
  document.getElementById(id).classList.toggle('li__selected');
}

class AddOffer extends Component {
  constructor(props) {
    super(props);

    const { editMode, editType, editCourse, editContent, intl } = this.props;

    this.state = {
      content: editMode === undefined ? '' : editContent,
      selectedType: editMode === undefined ? 'TAKE' : editType,
      searchInput: '',
      selectedCourseId: editMode === undefined ? '' : editCourse.id,
      selectedCourseName:
        editMode === undefined
          ? intl.formatMessage({ id: 'tutoring-offers.add-offer.choose-course' })
          : editCourse.name,
      isAddNoticeOpen: false,
      isNoticeAlertOpen: false,
      emailMessageBox: false,
      userMode: false,
      ignoreMessageBox: false,
    };
  }

  componentDidMount() {
    const { fetchCoursesData, course = false } = this.props;
    fetchCoursesData(null, 0, 'name,asc');
    if (course) {
      this.setState({ selectedCourseId: course.id });
    }
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

  handleExpandTextArea = () => {
    const { isAddNoticeOpen, isNoticeAlertOpen } = this.state;
    this.setState({
      isAddNoticeOpen: !isAddNoticeOpen,
      content: '',
    });
    if (isNoticeAlertOpen) {
      this.setState({
        isNoticeAlertOpen: false,
      });
    }
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ content: value });
  };

  handleTypeChange = (e) => {
    const { value } = e.target;
    this.setState({ selectedType: value });
  };

  handleSearchInput = (e) => {
    const { value } = e.target;
    this.setState({ searchInput: value });
  };

  handleCourseChange = (course) => {
    const previousId = this.state.selectedCourseId;
    this.setState({ selectedCourseId: course.id, selectedCourseName: course.name });
    toggleCourseList();
    changeSelectedCourse(previousId, course.id);
  };

  fetchAddNotice = () => {
    const {
      addTutoringOffer,
      editTutoringOffer,
      editMode,
      offerId,
      toggleEditMode,
    } = this.props;

    const { selectedType, selectedCourseId, selectedCourseName, content } = this.state;

    if (editMode === undefined) {
      addTutoringOffer(selectedType, content, selectedCourseId);
    } else {
      editTutoringOffer(
        selectedType,
        content,
        { id: selectedCourseId, name: selectedCourseName },
        offerId,
      );
      toggleEditMode();
    }
  };

  cancelEdit = () => {
    const { toggleEditMode } = this.props;
    toggleEditMode();
  };

  handleClickAddNotice = () => {
    const { user, editMode, intl } = this.props;
    const { content, ignoreMessageBox, selectedCourseId } = this.state;

    if (selectedCourseId) {
      if (validationIsEmpty(content)) {
        if (validationCharAmount(content, 2000)) {
          if(((editMode === undefined) && user.email) || ignoreMessageBox || editMode) {
            this.fetchAddNotice();
            this.setState({
              isAddNoticeOpen: false,
              content: '',
              ignoreMessageBox: false,
            });
          }
          else {
            this.handleEmailMessageBox();
          }
        }
      }
    }
    else {
      Swal.fire({
        icon: 'error',
        text: intl.formatMessage({ id: 'message-box.course-required' }),
      });
    }
  };

  handleClickSearch = () => {
    const { searchInput } = this.state;
    const { fetchCoursesData, intl } = this.props;
    const language = intl.locale;

    if (searchInput !== '') {
      const data = {
        language,
        name: searchInput,
      };
      fetchCoursesData(data);
      document.getElementsByClassName('erase-courses')[0].classList.remove('erase-courses__hidden');
    }
  };

  handleClickEraseCourses = () => {
    const { fetchCoursesData } = this.props;
    fetchCoursesData(null, 0, 'name,asc');
    document.getElementsByClassName('erase-courses')[0].classList.add('erase-courses__hidden');
    this.setState({ searchInput: '' });
  };

  handleClickNoticeAlert = () => {
    const { isNoticeAlertOpen, content } = this.state;
    if (content !== '') {
      this.setState({
        isNoticeAlertOpen: !isNoticeAlertOpen,
      });
    } else {
      this.handleExpandTextArea();
    }
  };

  handleEmailMessageBox = () => {
    const { emailMessageBox } = this.state;
    this.setState({
      emailMessageBox: !emailMessageBox,
      ignoreMessageBox: true,
    })
  }

  onSetEmailClick = () => {
    this.handleEmailMessageBox();
    this.handleUserModal();
  }

  handleUserModal = () => {
    const { userMode } = this.state;
    this.setState({
      userMode: !userMode,
    })
  }

  render() {
    const {
      isAddNoticeOpen,
      selectedType,
      searchInput,
      selectedCourseName,
      content,
      isNoticeAlertOpen,
      toggleEditMode,
      emailMessageBox,
      userMode
    } = this.state;
    const { course = false, courses, pageNumber, totalPages, editMode, user, intl } = this.props;

    return (
      <>
        {emailMessageBox && 
        <DeleteMessageBox 
          messageBoxOpen={emailMessageBox}
          title={"Dodaj adres e-mail" }
          message={"Ustaw swój adres e-mail aby użytkownicy mogli się z Tobą skontaktować"}
          generalYes={"Ok"}
          handleClickMessageBox={this.handleEmailMessageBox}
          handleClickYesButton={this.onSetEmailClick}/>}
        {userMode && <UserModal handleModal={this.handleUserModal} loggedUser={true}/>}
        {!isAddNoticeOpen && editMode === undefined && (
          <AddItemButton
            name={intl.formatMessage({ id: 'button.announcement' })}
            onClick={this.handleExpandTextArea}
          />
        )}
        {(isAddNoticeOpen || editMode) && (
          <div className="forum-post tutoring-offer add-tutoring-offer">
            <div className="decoration-strip">
              <FontAwesomeIcon
                icon={faTimes}
                className="exit-textarea-icon"
                onClick={editMode === undefined ? this.handleClickNoticeAlert : this.cancelEdit}
              />
            </div>
            <div className="tutoring-offer-attributes">
              <select
                className="browser-default custom-select"
                name="offerType"
                onChange={this.handleTypeChange}
                value={selectedType}
              >
                <option value="TAKE">
                  {intl.formatMessage({ id: 'tutoring-offers.add-offer.take' })}
                </option>
                <option value="GIVE">
                  {intl.formatMessage({ id: 'tutoring-offers.add-offer.give' })}
                </option>
              </select>
              <p>{intl.formatMessage({ id: 'tutoring-offers.add-offer.in' })}</p>
              {!course && (
                <div className="course-list-dropdown">
                  <div className="browser-default custom-select" onClick={() => toggleCourseList()}>
                    <span>{selectedCourseName}</span>
                  </div>
                  <div className="tutoring-course-list tutoring-course-list__hidden">
                    <div className="search-course-input">
                      <input
                        className=""
                        type="search"
                        placeholder={intl.formatMessage({ id: 'placeholder.search-course' })}
                        name="searchInput"
                        value={searchInput}
                        onChange={this.handleSearchInput}
                      />
                      <div className="search-course-button" onClick={this.handleClickSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                      </div>
                    </div>
                    <ul>
                      {courses.map((course) => (
                        <li
                          id={course.id}
                          onClick={(e) =>
                            this.handleCourseChange({ id: course.id, name: course.name })
                          }
                        >
                          {course.name}
                        </li>
                      ))}
                      {pageNumber < totalPages && (
                        <li
                          className="list-option load-more-courses"
                          value="load"
                          onClick={this.fetchMoreCourses}
                        >
                          {intl.formatMessage({ id: 'tutoring-offers.add-offer.load-more' })}
                        </li>
                      )}
                      <li
                        className="list-option erase-courses erase-courses__hidden"
                        value="erase"
                        onClick={this.handleClickEraseCourses}
                      >
                        {intl.formatMessage({ id: 'tutoring-offers.add-offer.erase' })}
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {course && <p className="course-name">{course.name}</p>}
            </div>
            <TextareaAutosize
              id="textarea"
              name="post-content"
              className="post-content"
              placeholder={intl.formatMessage({ id: 'placeholder.notice' })}
              value={content}
              onChange={this.handleInputChange}
            />
            <div
              className="add-post-button submit-button button"
              onClick={this.handleClickAddNotice}
            >
              <p>
                {editMode === undefined ? (
                  <FormattedMessage id="button.publish" />
                ) : (
                  <FormattedMessage id="button.save" />
                )}
              </p>
            </div>
          </div>
        )}
        {isNoticeAlertOpen && (
          <PostAlert
            isPostAlertOpen={isNoticeAlertOpen}
            handleClickPostAlert={this.handleClickNoticeAlert}
            handleExpandTextArea={this.handleExpandTextArea}
            message={intl.formatMessage({ id: 'message-box.cancel.notice' })}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
  pageNumber: state.courses.pageNumber,
  totalPages: state.courses.totalPages,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  addTutoringOffer: (type, content, courseId) =>
    dispatch(addTutoringOffer(type, content, courseId)),
  editTutoringOffer: (type, content, course, offerId) =>
    dispatch(editTutoringOffer(type, content, course, offerId)),
  fetchCoursesData: (data, page, sort) => dispatch(fetchCoursesData(data, page, sort)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddOffer));
