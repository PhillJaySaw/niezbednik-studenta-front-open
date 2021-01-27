/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { editTutoringOffer, deleteTutoringOffer, addOfferInterest } from '../../../../../store/reducers/tutoring-offers/action';
import AddOffer from '../AddOffer';
import DeleteMessageBox from '../../../../items/DeleteMessageBox';
import UserModal from '../../../../User/UserModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faHandPaper } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class Offer extends Component {
  constructor(props) {
    super(props);
    const { user, authorId } = this.props;
    this.state = {
      isAuthor: user.id == authorId,
      isAdmin: user.admin,
      editMode: false,
      messageBoxOpen: false,
      emailMessageBox: false, 
      userMode: false,
      userPreview: false,
    };
  }

  onEditOfferClick = () => {
    const {editMode} = this.state;
    this.setState({
      editMode: !editMode,
    });
  };

  clickDeleteItem = () => {
    const { id, deleteTutoringOffer } = this.props;
    deleteTutoringOffer(id);
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

  handleAddInterest = () => {
    const { addOfferInterest, id, user, userInterested } = this.props;
    addOfferInterest(id);
    if (!user.email && !userInterested) { this.handleEmailMessageBox(); }
  }

  
  handleEmailMessageBox = () => {
    const { emailMessageBox } = this.state;
    this.setState({
      emailMessageBox: !emailMessageBox,
    })
  }

  onSetEmailClick = () => {
    this.handleEmailMessageBox();
    this.handleUserModal();
  }

  handleUserModal = () => {
    const { userMode } = this.state;
    this.setState({
      userMode: !userMode,
    })
  }

  handleUserPreview = () => {
    const { userPreview } = this.state;
    this.setState({
      userPreview: !userPreview,
    })
  }

  render() {
    const { id, type, course, content, authorName, date, edited, intl, userInterested, authorId } = this.props;
    const { isAuthor, isAdmin, editMode, messageBoxOpen, emailMessageBox, userMode, userPreview } = this.state;

    let offerType = type === "TAKE" ? intl.formatMessage({ id: 'tutoring-offers.offer.take' }) : intl.formatMessage({ id: 'tutoring-offers.offer.give' });

    return (
      <>
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.clickDeleteItem}
          />
        )}
        {emailMessageBox && 
        <DeleteMessageBox 
          messageBoxOpen={emailMessageBox}
          title={"Dodaj adres e-mail" }
          message={"Ustaw swój adres e-mail aby użytkownicy mogli się z Tobą skontaktować"}
          generalYes={"Ok"}
          handleClickMessageBox={this.handleEmailMessageBox}
          handleClickYesButton={this.onSetEmailClick}/>}
        {userMode && <UserModal handleModal={this.handleUserModal} loggedUser={true}/>}
        {userPreview && <UserModal id={authorId} handleModal={this.handleUserPreview}/>}
        {!editMode && (<div className={'forum-post notice-post tutoring-offer' + (edited ? ' edited-content' : '')}>
          <div className="open-view">
            <div className="decoration-strip"></div>
            <div className="post-author forum-post-author">
              <span className="author-preview-btn" onClick={this.handleUserPreview}>
                {authorName}
              </span> 
              <span> {offerType} </span> <span> { course.name } </span>
              <span className="author-after-text">
                {' (' + intl.formatMessage({ id: 'forum.edited' }) + ')'}
              </span>
            </div>
            <div className="post-publication-date">{date}</div>
            <div className="post-content">{content}</div>
            {(isAuthor || isAdmin) && (
              <div className="post-options">
                {isAuthor && <FontAwesomeIcon
                  icon={faPen}
                  className="edit-post-icon hover-icon"
                  onClick={this.onEditOfferClick}
                />}
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-post-icon hover-icon"
                  onClick={this.handleClickMessageBox}
                />
              </div>
            )}
            {!isAuthor && (
            <div className="post-reactions">
              <div className="interested-button button" 
                onClick={this.handleAddInterest}>
                <FontAwesomeIcon icon={faHandPaper}/>
                {userInterested ? <FormattedMessage id="button.interested.cancel" /> : <FormattedMessage id="button.interested" />}
              </div>
            </div>)}
          </div>
        </div>)}
        {editMode && <AddOffer editMode={true} editType={type} editCourse={course} editContent={content} offerId={id} toggleEditMode={this.onEditOfferClick}/>}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  editTutoringOffer: (id, content) => dispatch(editTutoringOffer(id, content)),
  deleteTutoringOffer: (id) => dispatch(deleteTutoringOffer(id)),
  addOfferInterest: (id) => dispatch(addOfferInterest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Offer));
