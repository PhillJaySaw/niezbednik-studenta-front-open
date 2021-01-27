/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentAlt, faTimes, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import {
  fetchPostCommentsData,
  userLikeComment,
  acceptAnswer,
} from '../../../../store/reducers/post-comments/action';
import { editPost, deletePost } from '../../../../store/reducers/posts/action';
import Comment from '../Comment';
import './style.scss';
import AddComment from './AddComment';
import EditPost from '../EditPost';
import DeleteMessageBox from '../../../items/DeleteMessageBox';

class PostModalWindow extends Component {
  constructor(props) {
    super(props);

    const { user, postAuthorId } = this.props;

    this.state = {
      moreCommentsFetching: false,
      isAdmin: user.admin,
      isAuthor: user.id === postAuthorId,
      messageBoxOpen: false,
      editMode: false,
    };
  }

  componentDidMount = () => {
    const { postId, fetchPostCommentsData } = this.props;
    fetchPostCommentsData(postId, 0);
  };

  fetchMoreComments = () => {
    const { postId, fetchPostCommentsData, pageNumber } = this.props;
    this.setState({
      moreCommentsFetching: true,
    });
    const page = pageNumber + 1;
    fetchPostCommentsData(postId, page);
    setTimeout(() => {
      this.setState({
        moreCommentsFetching: false,
      });
    }, 1000);
  };

  formatDate = (date) => {
    const formatDate = date.replace('T', ' ').replace(/-/g, '/');
    return formatDate.substr(0, 16);
  };

  onEditPostClick = () => {
    this.setState({
      editMode: true,
    });
  };

  fetchEditPost = (content) => {
    const { postId, editPost } = this.props;
    editPost(postId, content);
    this.setState({
      editMode: false,
    });
  };

  clickDeleteItem = () => {
    const { postId, deletePost, handleModal, courseId } = this.props;
    deletePost(courseId, postId);
    this.setState({
      messageBoxOpen: false,
    });
    handleModal();
  };

  handleClickMessageBox = () => {
    const { messageBoxOpen } = this.state;
    this.setState({
      messageBoxOpen: !messageBoxOpen,
    });
  };

  render() {
    const {
      content,
      edited,
      postId,
      date,
      likes,
      userLikes,
      handleUserLikePost,
      handleUserLikeComment,
      postAuthorName,
      handleModal,
      handleAcceptAnswer,
      commentsList,
      totalElements,
      intl,
      pageNumber,
      totalPages,
    } = this.props;
    const { moreCommentsFetching, isAdmin, messageBoxOpen, editMode, isAuthor } = this.state;
    let comments = '';

    if (commentsList.length !== 0 && commentsList.length !== undefined) {
      comments = commentsList.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author.name + ' ' + comment.author.surname}
          authorId={comment.author.id}
          postAuthorName={postAuthorName}
          date={this.formatDate(comment.date)}
          id={comment.id}
          postId={postId}
          content={comment.content}
          edited={comment.edited}
          isAcceptedAnswer={comment.isAcceptedAnswer}
          isAnswer={comment.isAnswer}
          likes={comment.likes}
          userLikedIt={comment.userLikedIt}
          handleUserLikeComment={handleUserLikeComment}
          handleAcceptAnswer={handleAcceptAnswer}
        />
      ));
    }

    return (
      <>
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.clickDeleteItem}
          />
        )}
        <MDBModal className="modal-post-window" isOpen={handleModal} toggle={handleModal} centered>
          <div className="modal-header modal-post-header">
            {/* eslint-disable-next-line max-len */}
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          <div className={'forum-post' + (edited ? ' edited-content' : '')}>
            <div className="decoration-strip" />
            {isAdmin && !isAuthor && (
              <div className="delete-post">
                <span onClick={this.handleClickMessageBox}><FormattedMessage id="button.delete-post" /></span>
              </div>
            )}
            <div className="post-author">
              {postAuthorName}
              <span className="author-after-text">
                {' (' + intl.formatMessage({ id: 'forum.edited' }) + ')'}
              </span>
            </div>
            <div className="post-publication-date">{date}</div>
            {editMode ? (
              <EditPost content={content} fetchEditPost={this.fetchEditPost} />
            ) : (
              <div className="post-content">{content}</div>
            )}
            {isAuthor && !editMode && (
              <div className="post-options">
                <FontAwesomeIcon
                  icon={faPen}
                  className="edit-post-icon hover-icon"
                  onClick={this.onEditPostClick}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-post-icon hover-icon"
                  onClick={this.handleClickMessageBox}
                />
              </div>
            )}
            <div className="post-reactions">
              <div
                className={'post-likes' + (userLikes ? ' liked' : '')}
                onClick={() => handleUserLikePost(postId)}
              >
                {likes}
                <FontAwesomeIcon icon={faThumbsUp} className="add-like hover-icon" />
              </div>
              <div className="post-comments" onClick={() => {}}>
                {totalElements}
                <FontAwesomeIcon icon={faCommentAlt} className="comments-icon" />
              </div>
            </div>
            <div className="comments">
              <div className="comments-header">
                {comments && <p>{intl.formatMessage({ id: 'forum.comments' })}</p>}
                {pageNumber < totalPages && (
                  <div
                    className="more-data__button load-more-comments-button button"
                    onClick={this.fetchMoreComments}
                    disabled={moreCommentsFetching}>
                    <p>
                      <FormattedMessage id="button.show-more-comments" />
                    </p>
                  </div>)}
              </div>
              {comments}
              <AddComment postId={postId} />
            </div>
          </div>
        </MDBModal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  commentsList: state.postComments.commentsList,
  totalElements: state.postComments.totalElements,
  user: state.user.user,
  totalPages: state.postComments.totalPages,
  pageNumber: state.postComments.pageNumber,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPostCommentsData: (postId, page) => dispatch(fetchPostCommentsData(postId, page)),
  handleUserLikeComment: (commentId) => dispatch(userLikeComment(commentId)),
  handleAcceptAnswer: (commentId) => dispatch(acceptAnswer(commentId)),
  editPost: (postId, content) => dispatch(editPost(postId, content)),
  deletePost: (courseId, id) => dispatch(deletePost(courseId, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PostModalWindow));
