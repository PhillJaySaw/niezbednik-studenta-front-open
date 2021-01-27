/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faInfoCircle, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import TutorInformation from './TutorInformation';
import { deleteTutor } from '../../../store/reducers/tutors/actions';
import DeleteMessageBox from '../../items/DeleteMessageBox';

class Tutor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      messageBoxOpen: false,
    };
  }

  handleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

  onEditTutorClick = () => {
    const { name, surname, degree, page, information, id, handleEditClickModal } = this.props;
    const selectedDegree = { id: degree.id };
    const data = {
      id,
      name,
      surname,
      selectedDegree,
      page,
      information,
    };
    handleEditClickModal(data);
  };

  onDeleteTutorClick = () => {
    const { id, deleteTutor } = this.props;
    deleteTutor(id);
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
    const { name, surname, degree, page, information, id, isAdmin } = this.props;
    const { isModalOpen, messageBoxOpen } = this.state;

    return (
      <div className="list-element">
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.onDeleteTutorClick}
          />
        )}
        <p className="list-element-name" onClick={this.handleModal}>
          {name + ' ' + surname}
        </p>
        {!isAdmin && (
        <a href={page} target="_blank" className="link-icon hover-icon-big">
          <FontAwesomeIcon icon={faLink} />
        </a>)}
        {!isAdmin &&
        (<FontAwesomeIcon icon={faInfoCircle} className="info-icon hover-icon-big" onClick={this.handleModal} />)}
        {isAdmin && (
          <div className="tutor-icons-container">
            <FontAwesomeIcon icon={faPen} className="pen-icon" onClick={this.onEditTutorClick} />
            <FontAwesomeIcon
              icon={faTrash}
              className="pen-icon trash-icon"
              onClick={this.handleClickMessageBox}
            />
          </div>
        )}
        {isModalOpen && (
          <TutorInformation
            handleModal={this.handleModal}
            name={name}
            surname={surname}
            degree={degree.name}
            information={information}
            page={page}
            id={id}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTutor: (id) => dispatch(deleteTutor(id)),
});

export default connect(null, mapDispatchToProps)(Tutor);
