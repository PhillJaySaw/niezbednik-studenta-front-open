/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import TextareaAutosize from 'react-textarea-autosize';
import './style.scss';
import { validationIsEmpty, validationCharAmount } from '../../../../../helpers/Functions/ValidationFunctions';

class EditComment extends Component {
  constructor(props) {
    super(props);

    const { content } = this.props;

    this.state = {
      content: content,
    };
  }

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ content: value });
  };

  handleClickEditComment = () => {
    const { content } = this.state;
    const { fetchEditComment} = this.props;
    if (validationIsEmpty(content)) {
      if (validationCharAmount(content, 2000)) {
        fetchEditComment(content);
      }
    }
  };

  render() {
    const { content } = this.state;
    const { intl } = this.props;

    return (
      <>
        <div className="post-comment-content edit-comment">
          <TextareaAutosize
            id="textarea"
            name="comment-content"
            className="post-content"
            placeholder={intl.formatMessage({ id: 'placeholder.comment' })}
            value={content}
            onChange={this.handleInputChange}
          />
          <div
            className="add-post-button edit-post-button submit-button add-comment-button button"
            onClick={this.handleClickEditComment}
          >
            <p><FormattedMessage id="button.save" /></p>
          </div>
        </div>
      </>
    );
  }
}

export default injectIntl(EditComment);
