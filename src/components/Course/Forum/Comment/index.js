/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCheck, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser } from '../../../../api/header';
import { connect } from 'react-redux';
import { editComment, deleteComment } from '../../../../store/reducers/post-comments/action';
import DeleteMessageBox from '../../../items/DeleteMessageBox';
import EditComment from '../PostModalWindow/EditComment';

class Comment extends Component {
  constructor(props) {
    super(props);

    const { user, authorId } = this.props;

    this.state = {
      isAdmin: user.admin,
      isAuthor: user.id === authorId,
      messageBoxOpen: false,
      editMode: false,
    };
  }

  displayAnswerIcon() {
    const { isAnswer, postAuthorName, isAcceptedAnswer } = this.props;
    const currentUser = getCurrentUser();
    if (isAnswer && postAuthorName === currentUser) {
      return <FontAwesomeIcon icon={faCheck} className="add-check" />;
    }

    if (isAnswer && isAcceptedAnswer) {
      return <FontAwesomeIcon icon={faCheck} className="add-check no-cursor" />;
    }

    return undefined;
  }

  checkPermissionToAccept() {
    const currentUser = getCurrentUser();
    const { postAuthorName, id, handleAcceptAnswer } = this.props;
    if (postAuthorName === currentUser) {
      handleAcceptAnswer(id);
    }
  }

  onEditCommentClick = () => {
    this.setState({
      editMode: true,
    });
  };

  fetchEditComment = (content) => {
    const { id, editComment } = this.props;
    editComment(id, content);
    this.setState({
      editMode: false,
    });
  };

  clickDeleteItem = () => {
    const { id, deleteComment, postId } = this.props;
    deleteComment(id, postId);
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
    const {
      author,
      date,
      id,
      content,
      edited,
      isAcceptedAnswer,
      isAnswer,
      likes,
      handleUserLikeComment,
      userLikedIt,
      postAuthorName,
      intl,
    } = this.props;

    const { messageBoxOpen, editMode, isAdmin, isAuthor } = this.state;

    let editOption = isAuthor ? (
      <FontAwesomeIcon
        icon={faPen}
        className="delete-icon hover-icon"
        title="Edytuj komentarz"
        onClick={this.onEditCommentClick}
      />
    ) : (
      ''
    );

    return (
      <div className={'post-comment' + (edited ? ' edited-content' : '')}>
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.clickDeleteItem}
          />
        )}
        <p className="post-author post-comment-author">
          {author}
          <span className="author-after-text">
            {' (' + intl.formatMessage({ id: 'forum.edited' }) + ')'}
          </span>
        </p>
        <div className="post-publication-date">{date}</div>
        {editMode ? (
          // conditional renders for if comment is being editted
          <EditComment content={content} fetchEditComment={this.fetchEditComment} />
        ) : (
          <p className="post-content post-comment-content">{content}</p>
        )}
        {(isAdmin || isAuthor) && !editMode && (
          <div className="post-options">
            {editOption}
            <FontAwesomeIcon
              icon={faTrash}
              className="delete-icon hover-icon"
              title="Usuń komentarz"
              onClick={this.handleClickMessageBox}
            />
          </div>
        )}
        <div className="post-reactions post-comment-reactions">
          <div
            // conditional renders for determining if the comment is an answer
            className={
              !isAnswer
                ? 'post-likes' + (userLikedIt ? ' liked' : '')
                : 'post-likes' +
                  (isAcceptedAnswer ? ' liked' : '') +
                  (postAuthorName !== getCurrentUser() ? ' no-cursor' : '')
            }
            onClick={
              !isAnswer ? () => handleUserLikeComment(id) : () => this.checkPermissionToAccept()
            }
          >
            {
              /* {isAnswer ? (
              postAuthorName !== author && <FontAwesomeIcon icon={faCheck} className="add-check" />
            ) : isAcceptedAnswer ? (
              <FontAwesomeIcon icon={faCheck} className="add-check" />
            ) : undefined} */
              this.displayAnswerIcon()
            }
            {!isAnswer && (
              <>
                <p className={isAnswer ? 'add-check' : ''}>{likes}</p>
                <FontAwesomeIcon icon={faThumbsUp} className="add-like hover-icon" />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (id, postId) => dispatch(deleteComment(id, postId)),
  editComment: (id, content) => dispatch(editComment(id, content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Comment));
