/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import TextareaAutosize from 'react-textarea-autosize';
import ReactTooltip from 'react-tooltip';
import './style.scss';
import { addPostComment } from '../../../../../store/reducers/post-comments/action';
import {
  validationIsEmpty,
  validationCharAmount,
} from '../../../../../helpers/Functions/ValidationFunctions';

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      isAnswer: false,
    };
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ content: value });
  };

  handleCommentOption = () => {
    const { isAnswer } = this.state;
    this.setState({ isAnswer: !isAnswer });
  };

  fetchDataAdd = () => {
    const { content, isAnswer } = this.state;
    const { addPostComment, postId } = this.props;
    let isAnswerNumber = 0;

    if (isAnswer) isAnswerNumber = 1;
    else isAnswerNumber = 0;

    addPostComment(postId, content, isAnswerNumber);
  };

  handleSubmit = () => {
    const { content } = this.state;
    if (validationIsEmpty(content)) {
      if (validationCharAmount(content, 1000)) {
        this.fetchDataAdd();
        this.setState({
          content: '',
        });
      }
    }
  };

  render() {
    const { isAnswer, content } = this.state;
    const { intl } = this.props;

    return (
      <>
        <div className="post-comment add-comment">
          <div className="choose-comment-option">
            <p
              className={isAnswer ? 'comment-option__inactive' : ''}
              onClick={isAnswer ? this.handleCommentOption : () => {}}
            >
              <FormattedMessage id="forum.comment" />
            </p>
            <p>/</p>
            <p
              className={!isAnswer ? 'comment-option__inactive' : ''}
              onClick={!isAnswer ? this.handleCommentOption : () => {}}
              data-tip={intl.formatMessage({ id: 'tooltip.answer' })}
            >
              <FormattedMessage id="forum.answer" />
            </p>
            <ReactTooltip />
          </div>
          <TextareaAutosize
            id="textarea"
            name="comment-content"
            className="post-content post-comment-content"
            placeholder={intl.formatMessage({ id: 'placeholder.comment' })}
            value={content}
            onChange={this.handleInputChange}
          />
          <div
            className="add-post-button submit-button add-comment-button mpb button"
            onClick={this.handleSubmit}
          >
            <p>
              <FormattedMessage id="button.add-comment" />
            </p>
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addPostComment: (token, secrettoken, postId, content, isAnswer) => {
      dispatch(addPostComment(token, secrettoken, postId, content, isAnswer));
    },
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(AddComment));
