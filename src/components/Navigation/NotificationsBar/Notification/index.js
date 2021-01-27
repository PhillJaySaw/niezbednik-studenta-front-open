import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { deleteUserNotification } from '../../../../store/reducers/user/action';
import { fetchPostById } from '../../../../store/reducers/posts/action';
import UserModal from '../../../User/UserModal';
import ModalPostWindow from '../../../Course/Forum/PostModalWindow';

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUserModal: false,
      openPostModal: false,
    };
  }

  formatDate = (date) => {
    const formatDate = date.replace('T', ' ').replace(/-/g, '/');
    return formatDate.substr(0, 16);
  };
  
  handleClickUserModal = () => {
    const { openUserModal } = this.state;
    this.setState({
      openUserModal: !openUserModal,
    });
  };

  handleClickModalPost = () => {
    const { openPostModal } = this.state;
    this.setState({
      openPostModal: !openPostModal,
    });
  }

  onPostNotificationClick = (id) => {
    const { fetchPostById } = this.props;
    fetchPostById(id);
    this.handleClickModalPost();
  }

  onNotificationClick = () => {
    const { type, idOfObjectInvolved } = this.props;
    let notificationType = type.trim();
    switch (notificationType) {
      case 'Komentarz':
        //TODO Phillip
        //pobrać post po id i otworzyć modal
        this.onPostNotificationClick(idOfObjectInvolved);
        break;
      case 'POST':
        window.location = '/course' + idOfObjectInvolved + '/forum';
        break;
      case 'PLIK':
        window.location = '/course' + idOfObjectInvolved + '/materials';
        break;
      case 'KOREPETYCJE-UTWORZENIE':
        window.location = '/course' + idOfObjectInvolved + '/tutoring';
        break;
      case 'KOREPETYCJE-ZAINTERESOWANIE':
        this.handleClickUserModal();
        break;
    }
  };

  deleteNotification = () => {
    const { id, deleteUserNotification } = this.props;
    deleteUserNotification(id);
  };

  render() {
    const { content, date, intl, idOfObjectInvolved, postById, postByIdPending } = this.props;
    const { openUserModal, openPostModal } = this.state;
    const showDate = this.formatDate(date);

    return (
      <>
        {openUserModal && (
          <UserModal id={idOfObjectInvolved} handleModal={this.handleClickUserModal} />
        )}
        {openPostModal && !postByIdPending && (
          <ModalPostWindow
          postId={idOfObjectInvolved}
          content={postById.content}
          edited={postById.edited}
          date={this.formatDate(postById.date)}
          likes={postById.likes}
          userLikes={postById.userLikedIt}
          // handleUserLikePost={handleUserLikePost}
          totalComments={postById.totalComments}
          postAuthorName={postById.author.name + " " + postById.author.surname}
          postAuthorId={postById.author.id}
          handleModal={this.handleClickModalPost}
          courseId={postById.courseId}
        />
        )}
        <div className="user-notification-box">
          <div className="user-notification-header">
            <div className="user-notification-date">{showDate}</div>
            <FontAwesomeIcon
              icon={faTimes}
              className="modal-exit-icon user-notification-delete"
              title={intl.formatMessage({ id: 'tooltip.delete-notification' })}
              onClick={this.deleteNotification}
            />
          </div>
          <div className="user-notification-text" onClick={this.onNotificationClick}>
            {content}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  postById: state.posts.postById,
  postByIdPending: state.posts.postByIdPending,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUserNotification: (id) => dispatch(deleteUserNotification(id)),
  fetchPostById: (id) => dispatch(fetchPostById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Notification));
