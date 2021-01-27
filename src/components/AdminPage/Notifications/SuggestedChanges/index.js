import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { FormattedMessage, injectIntl } from 'react-intl';
import { deleteNotification } from '../../../../store/reducers/admin_notifications/actions';
import { connect } from 'react-redux';
import DeleteMessageBox from '../../../items/DeleteMessageBox';
import * as notificationTypes from '../../../../helpers/notificationTypes';

class SuggestedChanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBoxOpen: false,
    };
  }

  onDeleteNotification = () => {
    const { id, deleteNotification } = this.props;
    deleteNotification(id);
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
    const { content, type, intl } = this.props;
    const { messageBoxOpen } = this.state;
    let typeTitle = '';
    switch (type) {
      case notificationTypes.SUGGESTED_CHANGES: {
        typeTitle = intl.formatMessage({ id: 'admin.notification.suggested-changes' });
        break;
      }
      case notificationTypes.REPORT_ERROR: {
        typeTitle = intl.formatMessage({ id: 'admin.notification.report-error' });
        break;
      }
      default: {
        typeTitle = intl.formatMessage({ id: 'admin.notification.simple' });
        break;
      }
    }

    return (
      <div className="forum-post suggestion-post">
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.onDeleteNotification}
          />
        )}
        <div className="open-view">
          <div className="decoration-strip topic-strip">{typeTitle}</div>
          <div className="notification-content post-content">
            <div className="content-text">
              {type === "ADMIN" 
              ? <p>{intl.formatMessage({ id: 'report.user'}) + " " + content + " " + intl.formatMessage({ id: 'report.admin-wannabe'})}</p>
              : <p>{content}</p>}
            </div>
          </div>
          <div className="delete-container" onClick={this.handleClickMessageBox}>
            <FontAwesomeIcon icon={faTrash} className="delete-icon hover-icon" />
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteNotification: (id) => dispatch(deleteNotification(id)),
});

export default connect(null, mapDispatchToProps)(injectIntl(SuggestedChanges));
