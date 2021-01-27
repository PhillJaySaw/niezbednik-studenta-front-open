/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TextareaAutosize from 'react-textarea-autosize';
import {
  validationIsEmpty,
  validationCharAmount,
} from '../../../../helpers/Functions/ValidationFunctions';

class EditPost extends Component {
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

  handleClickEditPost = () => {
    const { content } = this.state;
    const { fetchEditPost } = this.props;
    if (validationIsEmpty(content)) {
      if (validationCharAmount(content, 2000)) {
        fetchEditPost(content);
      }
    }
  };

  render() {
    const { content } = this.state;

    return (
      <>
      <TextareaAutosize
        id="textarea"
        name="post-content"
        className="post-content"
        value={content}
        onChange={this.handleInputChange}
      />
      <div
        className="add-post-button submit-button edit-post-button button"
        onClick={this.handleClickEditPost}
      >
        <p><FormattedMessage id="button.save" /></p>
      </div>
      </>
    );
  }
}

export default EditPost;
