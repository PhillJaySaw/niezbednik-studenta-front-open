/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import AddItemButton from '../../../items/AddItemButton';
import './style.scss';
import { addPost } from '../../../../store/reducers/posts/action';
import {
  validationIsEmpty,
  validationCharAmount,
} from '../../../../helpers/Functions/ValidationFunctions';
import PostAlert from './PostAlert';

class AddPost extends Component {
  constructor(props) {
    super(props);

    const { courseId, pageCounter } = this.props;

    this.state = {
      courseId,
      content: '',
      isAddCourseOpen: false,
      isPostAlertOpen: false,
    };
  }

  handleExpandTextArea = () => {
    const { isAddCourseOpen, isPostAlertOpen } = this.state;
    this.setState({
      isAddCourseOpen: !isAddCourseOpen,
      content: '',
    });
    if (isPostAlertOpen) {
      this.setState({
        isPostAlertOpen: false,
      });
    }
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ content: value });
  };

  fetchAddPost = () => {
    const { courseId, content } = this.state;
    const { addPost } = this.props;

    addPost(courseId, content);
  };

  handleClickAddPost = () => {
    const { content } = this.state;
    if (validationIsEmpty(content)) {
      if (validationCharAmount(content, 2000)) {
        this.fetchAddPost();
        this.setState({
          isAddCourseOpen: false,
          content: '',
        });
      }
    }
  };

  handleClickPostAlert = () => {
    const { isPostAlertOpen, content } = this.state;
    if (content !== '') {
      this.setState({
        isPostAlertOpen: !isPostAlertOpen,
      });
    } else {
      this.handleExpandTextArea();
    }
  };

  render() {
    const { isAddCourseOpen, content, isPostAlertOpen } = this.state;
    const { intl } = this.props;

    return (
      <>
        {!isAddCourseOpen && (
          <AddItemButton
            name={intl.formatMessage({ id: 'button.add-post' })}
            onClick={this.handleExpandTextArea}
          />
        )}
        {isAddCourseOpen && (
          <div className="forum-post add-forum-post">
            <div className="decoration-strip">
              <FontAwesomeIcon
                icon={faTimes}
                className="exit-textarea-icon"
                onClick={this.handleClickPostAlert}
              />
            </div>
            <TextareaAutosize
              id="textarea"
              maxLength="1000"
              name="post-content"
              className="post-content"
              placeholder={intl.formatMessage({ id: 'placeholder.post' })}
              value={content}
              onChange={this.handleInputChange}
            />
            <div className="message-number">
              <span>{content.length}/1000</span>
            </div>
            <div
              className="add-post-button submit-button button"
              onClick={this.handleClickAddPost}
            >
              <p>
                <FormattedMessage id="button.publish" />
              </p>
            </div>
          </div>
        )}
        {isPostAlertOpen && (
          <PostAlert
            isPostAlertOpen={isPostAlertOpen}
            handleClickPostAlert={this.handleClickPostAlert}
            handleExpandTextArea={this.handleExpandTextArea}
            message={intl.formatMessage({ id: 'message-box.cancel.post' })}
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPost: (courseId, content) => {
      dispatch(addPost(courseId, content));
    },
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(AddPost));
