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
// import './style.scss';
import { addNotice } from '../../../../store/reducers/notices/action';
import {
  validationIsEmpty,
  validationCharAmount,
} from '../../../../helpers/Functions/ValidationFunctions';
import PostAlert from '../../../Course/Forum/AddPost/PostAlert';

class AddNotice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      isAddNoticeOpen: false,
      isNoticeAlertOpen: false,
    };
  }

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

  fetchAddNotice = () => {
    const { content } = this.state;
    const { addNotice } = this.props;

    addNotice(content);
  };

  handleClickAddNotice = () => {
    const { content } = this.state;
    if (validationIsEmpty(content)) {
      if (validationCharAmount(content, 2000)) {
        this.fetchAddNotice();
        this.setState({
          isAddNoticeOpen: false,
          content: '',
        });
      }
    }
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

  render() {
    const { isAddNoticeOpen, content, isNoticeAlertOpen } = this.state;
    const { intl } = this.props;

    return (
      <>
        {!isAddNoticeOpen && (
          <AddItemButton
            name={intl.formatMessage({ id: 'button.announcement' })}
            onClick={this.handleExpandTextArea}
          />
        )}
        {isAddNoticeOpen && (
          <div className="forum-post add-forum-post">
            <div className="decoration-strip">
              <FontAwesomeIcon
                icon={faTimes}
                className="exit-textarea-icon"
                onClick={this.handleClickNoticeAlert}
              />
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
                <FormattedMessage id="button.publish" />
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

const mapDispatchToProps = (dispatch) => {
  return {
    addNotice: (content) => {
      dispatch(addNotice(content));
    },
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(AddNotice));
