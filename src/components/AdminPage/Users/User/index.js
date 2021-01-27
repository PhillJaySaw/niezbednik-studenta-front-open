/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faBan } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { handleAdminPermissions } from '../../../../store/reducers/user/action';
import { connect } from 'react-redux';
import ConfirmationBox from '../../../items/ConfirmationBox';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBoxOpen: false,
    };
  }

  handleClickAdminPermissions = () => {
    const { handleAdminPermissions, id } = this.props;
    const { messageBoxOpen } = this.state;
    handleAdminPermissions(id);
    if (messageBoxOpen) {
      this.setState({
        messageBoxOpen: false,
      });
    }
  };

  handleClickMessageBox = (boxType) => {
    const { messageBoxOpen } = this.state;
    this.setState({
      messageBoxOpen: !messageBoxOpen,
    });
    if (boxType) {
      this.setState({
        boxType: boxType,
      });
    }
  };

  render() {
    const { name, surname, isAdmin, intl } = this.props;
    const { messageBoxOpen, boxType } = this.state;

    return (
      <div className="tiles-list-element admin-list-element">
        {messageBoxOpen && (
          <ConfirmationBox
            message={
              boxType === 'add'
                ? intl.formatMessage({ id: 'message-box.admin.add-permission' })
                : intl.formatMessage({ id: 'message-box.admin.take-permission' })
            }
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.handleClickAdminPermissions}
          />
        )}
        <p className="course-name">{name + ' ' + surname}</p>
        <div className={'admin-button ' + (!isAdmin ? 'add-admin-button' : 'on-list-admin')}>
          {!isAdmin ? (
            <p className="admin-button-text" onClick={() => this.handleClickMessageBox('add')}>
              <FormattedMessage id="button.users.add-admin" />
            </p>
          ) : (
            <p className="admin-text">
              <FormattedMessage id="button.users.admin" />
              <FontAwesomeIcon
                icon={faBan}
                className="take-admin-icon"
                title={intl.formatMessage({ id: 'tooltip.admin.take-permissions' })}
                onClick={() => this.handleClickMessageBox('remove')}
              />
            </p>
          )}
          {!isAdmin ? (
            <FontAwesomeIcon
              icon={faUserShield}
              className="add-admin-icon"
              onClick={this.handleClickAdminPermissions}
            />
          ) : (
            <div className="admin-icon-box">
              <FontAwesomeIcon icon={faUserShield} className="admin-icon" />
              <FontAwesomeIcon
                icon={faBan}
                className="take-admin-icon-mobile"
                onClick={() => this.handleClickMessageBox('remove')}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleAdminPermissions: (userId) => dispatch(handleAdminPermissions(userId)),
});

export default connect(null, mapDispatchToProps)(injectIntl(User));
