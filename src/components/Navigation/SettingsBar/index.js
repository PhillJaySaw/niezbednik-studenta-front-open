/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import LocaleSelector from '../../LocaleSelector';
import { userLogout } from '../../../store/reducers/userLogin/actions';
import './style.scss';
import Report from './Report';
import * as notificationTypes from '../../../helpers/notificationTypes';
import { sendReport } from '../../../store/reducers/admin_notifications/actions';
import DeleteMessageBox from '../../items/DeleteMessageBox';

class SettingsBar extends Component {
  constructor(props) {
    super(props);

    const { user } = this.props;

    this.state = {
      isAdmin: user.admin,
      showReportBox: false,
      showConfirmationBox: false,
    };
  }

  // TODO maked redux action from this function
  handleUserLogout = () => {
    const { userLogout, oAuthToken, oAuthTokenSecret } = this.props;
    userLogout(oAuthToken, oAuthTokenSecret).then((res) => {
      res.type === 'USER_LOGOUT_SUCCESS'
        ? (window.location.href =
            'https://cas.amu.edu.pl/cas/logout?service=https%3A%2F%2Fusosweb.amu.edu.pl%2Fkontroler.php%3F_action%3Dnews%2Fdefault')
        : alert('logout error');
    });
  };

  handleReportBox = () => {
    const { showReportBox } = this.state;
    this.setState({
      showReportBox: !showReportBox,
    });
  };

  handleClickBecomeAdmin = () => {
    const { user, sendReport } = this.props;
    const data = {
      message: `${user.name} ${user.surname}`,
      type: notificationTypes.ADMIN,
    };
    sendReport(data);
    this.setState({
      showConfirmationBox: false,
    });
  };

  handleShowConfirmationBox = () => {
    const { showConfirmationBox } = this.state;
    this.setState({
      showConfirmationBox: !showConfirmationBox,
    });
  };

  render() {
    const { isAdmin, showReportBox, showConfirmationBox } = this.state;
    const { close, user, intl } = this.props;

    return (
      <nav className="side-menu settingsbar">
        <div className="side-menu-header settingsbar-header">
          <div type="button" className="close side-menu-exit" aria-label="Close" onClick={close}>
            <span aria-hidden="true">&times;</span>
          </div>
          <p className="side-menu-title settingsbar-title">
            <FormattedMessage id="settings.title" />
          </p>
        </div>
        <div className="side-menu-content settingsbar-content">
          <p className="side-menu-option setting">
            {/* <FormattedMessage id="settings.change-language" /> */}
            <LocaleSelector />
          </p>
          <p className="side-menu-option setting">
            <a href="/about" className="admin-panel-link">
              <FormattedMessage id="settings.about" />
            </a>
          </p>
          {isAdmin && (
            <p className="side-menu-option setting">
              <a href="/admin_page/notifications" className="admin-panel-link">
                <FormattedMessage id="settings.admin" />
              </a>
            </p>
          )}
          <p className="side-menu-option setting" onClick={this.handleReportBox}>
            <FormattedMessage id="settings.report" />
          </p>
          {!user.admin && (
            <p className="side-menu-option setting" onClick={this.handleShowConfirmationBox}>
              <FormattedMessage id="settings.become-admin" />
            </p>
          )}
          <p className="side-menu-option setting" onClick={this.handleUserLogout}>
            <FormattedMessage id="settings.logout" />
          </p>
        </div>
        {showReportBox && (
          <Report
            handleModal={this.handleReportBox}
            reportType={notificationTypes.SUGGESTED_CHANGES}
          />
        )}
        {showConfirmationBox && (
          <DeleteMessageBox
            messageBoxOpen={showConfirmationBox}
            handleClickMessageBox={this.handleShowConfirmationBox}
            handleClickYesButton={this.handleClickBecomeAdmin}
            message={intl.formatMessage({ id: 'message-box.become-admin.confirmation' })}
            title={intl.formatMessage({ id: 'message-box.confirmation-title' })}
          />
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  oAuthToken: state.userLogin.oAuthToken,
  oAuthTokenSecret: state.userLogin.oAuthTokenSecret,
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  userLogout: (oauthToken, oauthTokenSecret) => dispatch(userLogout(oauthToken, oauthTokenSecret)),
  sendReport: (data) => dispatch(sendReport(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SettingsBar));
