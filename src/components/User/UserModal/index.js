/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faTimes, faCopy, faEnvelope, faPen } from '@fortawesome/free-solid-svg-icons';
import { setUserEmail, fetchUserById } from '../../../store/reducers/user/action';
import { validationEmail } from '../../../helpers/Functions/ValidationFunctions';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import './style.scss';
import { Spinner } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';

function copyAddress(address) {
  let el = document.createElement('textarea');
  el.value = address;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function showTooltip() {
  document.getElementsByClassName('copy-tooltip')[0].classList.toggle('copy-tooltip__hidden');
}

class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };
  }

  componentDidMount = () => {
    const { fetchUserById, loggedUser, id } = this.props;
    if (!loggedUser) {
      fetchUserById(id);
    }
  };

  onCopyClick = () => {
    const { userById } = this.props;
    copyAddress(userById.email);
    showTooltip();
  };

  handleEditMode = () => {
    const { editMode } = this.state;
    const { user } = this.props;
    this.setState({
      newEmail: user.email ? user.email : '',
      editMode: !editMode,
    });
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ newEmail: value });
  };

  handleSetEmail = () => {
    const { setUserEmail, intl } = this.props;
    const { newEmail } = this.state;
    if (validationEmail(newEmail)) {
      setUserEmail(newEmail);
      this.setState({
        editMode: false,
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: intl.formatMessage({ id: 'message-box.email.invalid' }),
      });
    }
  };

  render() {
    const {
      handleModal,
      loggedUser = false,
      emailPending,
      intl,
      userById,
      user,
    } = this.props;
    const { editMode, newEmail } = this.state;

    let componentUser = loggedUser ? user : userById;

    return (
      <>
        <MDBModal
          isOpen={handleModal}
          toggle={handleModal}
          centered
          className="tutor-modal user-modal"
        >
          <div className="modal-header">
            {/* eslint-disable-next-line max-len */}
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          {emailPending ? (
              <Spinner animation="border" role="status" />
            ) : (
          <div className="tutor-information">
            <div className="list-element-name-tutor-title">
              <p>{componentUser.name + ' ' + componentUser.surname}</p>
            </div>
            {loggedUser && (editMode || componentUser.email === null) && (
              <div className="user-email">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: 'user.email' })}
                  value={newEmail}
                  onChange={this.handleInputChange}
                />
                <div className="button save-button" onClick={this.handleSetEmail}>
                  {intl.formatMessage({ id: 'button.save' })}
                </div>
              </div>
            )}
            {(!loggedUser || (componentUser.email && !editMode)) && (
              <div className="user-email-display">
                <p class="user-email-address">
                  {componentUser.email
                    ? componentUser.email
                    : intl.formatMessage({ id: 'user.no-data' })}
                </p>
                {loggedUser && componentUser.email !== null && (
                  <FontAwesomeIcon
                    icon={faPen}
                    className="pen-icon"
                    onClick={this.handleEditMode}
                  />
                )}
                {!loggedUser && componentUser.email && (
                  <>
                    <div
                      className="email-button button"
                      onClick={this.onCopyClick}
                      data-tip={intl.formatMessage({ id: 'tooltip.copied' })}
                    >
                      <FontAwesomeIcon icon={faCopy} className="email-icon" />
                      {intl.formatMessage({ id: 'user.copy' })}
                    </div>
                    <ReactTooltip class="copy-tooltip copy-tooltip__hidden" />
                  </>
                )}
                {!loggedUser && componentUser.email && (
                  <a href={`mailto:${componentUser.email}`} className="email-button button">
                    <div>
                      <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
                      {intl.formatMessage({ id: 'user.write-message' })}
                    </div>
                  </a>
                )}
              </div>
            )}
          </div>)}
        </MDBModal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  userById: state.user.userById,
  emailPending: state.user.userByIdPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserById: (id) => dispatch(fetchUserById(id)),
  setUserEmail: (email) => dispatch(setUserEmail(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(UserModal));
