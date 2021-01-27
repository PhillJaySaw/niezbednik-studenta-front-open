/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCommentAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import './style.scss';
import { userLikePost } from '../../../../store/reducers/posts/action';
import ModalPostWindow from '../PostModalWindow';

// eslint-disable-next-line react/prefer-stateless-function
class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalPostOpen: false,
    };
  }

  handleClickModalPost = () => {
    const { isModalPostOpen } = this.state;
    this.setState({
      isModalPostOpen: !isModalPostOpen,
    });
  };

  render() {
    const {
      content,
      edited,
      date,
      likes,
      authorName,
      totalComments,
      id,
      handleUserLikePost,
      userLikedIt,
      authorId,
      intl,
      courseId,
    } = this.props;
    const { isModalPostOpen } = this.state;

    return (
      <>
        <div className={'forum-post' + (edited ? ' edited-content' : '')}>
          <div className="open-view" onClick={this.handleClickModalPost}>
            <div className="decoration-strip"></div>
            <div className="post-author forum-post-author">
              {authorName}
              <span className="author-after-text">
                {' (' + intl.formatMessage({ id: 'forum.edited' }) + ')'}
              </span>
            </div>
            <div className="post-publication-date">{date}</div>
            <div className="post-content">{content}</div>
          </div>
          <div className="post-reactions">
            <div
              className={'post-likes' + (userLikedIt ? ' liked' : '')}
              onClick={() => handleUserLikePost(id)}
            >
              {likes}
              <FontAwesomeIcon icon={faThumbsUp} className="add-like hover-icon" />
            </div>
            <div className="post-comments" onClick={this.handleClickModalPost}>
              {totalComments}
              <FontAwesomeIcon icon={faCommentAlt} className="comments-icon hover-icon" />
            </div>
          </div>
        </div>
        {isModalPostOpen && (
          <ModalPostWindow
            postId={id}
            content={content}
            edited={edited}
            date={date}
            likes={likes}
            userLikes={userLikedIt}
            handleUserLikePost={handleUserLikePost}
            totalComments={totalComments}
            postAuthorName={authorName}
            postAuthorId={authorId}
            handleModal={this.handleClickModalPost}
            courseId={courseId}
          />
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleUserLikePost: (postId) => dispatch(userLikePost(postId)),
});

export default connect(null, mapDispatchToProps)(injectIntl(Post));
