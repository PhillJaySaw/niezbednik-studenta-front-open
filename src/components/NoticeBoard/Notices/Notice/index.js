/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { editNotice, deleteNotice } from '../../../../store/reducers/notices/action';
import EditPost from '../../../Course/Forum/EditPost';
import DeleteMessageBox from '../../../items/DeleteMessageBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Notice extends Component {
  constructor(props) {
    super(props);
    const { user, authorId } = this.props;
    this.state = {
      isAuthor: user.id == authorId,
      isAdmin: user.admin,
      editMode: false,
      messageBoxOpen: false,
    };
  }

  onEditNoticeClick = () => {
    this.setState({
      editMode: true,
    });
  };

  fetchEditNotice = (content) => {
    const { id, editNotice } = this.props;
    editNotice(id, content);
    this.setState({
      editMode: false,
    });
  };

  clickDeleteItem = () => {
    const { id, deleteNotice } = this.props;
    deleteNotice(id);
    this.setState({
      messageBoxOpen: false,
    });
  };

  handleClickMessageBox = () => {
    const { messageBoxOpen } = this.state;
    this.setState({
      messageBoxOpen: !messageBoxOpen,
    });
  };

  render() {
    const { content, authorName, date, edited, intl } = this.props;
    const { isAuthor, isAdmin, editMode, messageBoxOpen } = this.state;

    return (
      <>
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.clickDeleteItem}
          />
        )}
        <div className={'forum-post notice-post' + (edited ? ' edited-content' : '')}>
          <div className="open-view">
            <div className="decoration-strip"></div>
            <div className="post-author forum-post-author">
              {authorName}
              <span className="author-after-text">
                {' (' + intl.formatMessage({ id: 'forum.edited' }) + ')'}
              </span>
            </div>
            <div className="post-publication-date">{date}</div>
            {editMode ? (
              <EditPost content={content} fetchEditPost={this.fetchEditNotice} />
            ) : (
              <div className="post-content">{content}</div>
            )}
            <div className="post-options">
              {isAuthor && !editMode && (
                <FontAwesomeIcon
                  icon={faPen}
                  className="edit-post-icon hover-icon"
                  onClick={this.onEditNoticeClick}
                />
              )}
              {(isAuthor || isAdmin) && !editMode && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-post-icon hover-icon"
                  onClick={this.handleClickMessageBox}
                />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  editNotice: (id, content) => dispatch(editNotice(id, content)),
  deleteNotice: (id) => dispatch(deleteNotice(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Notice));
