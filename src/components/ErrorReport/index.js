import React, { Component } from 'react';
import Report from '../Navigation/SettingsBar/Report';
import './style.scss';
import * as notficationTypes from '../../helpers/notificationTypes';

class ErrorReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReportBox: false,
    };
  }

  handleReportBox = () => {
    const { showReportBox } = this.state;
    this.setState({
      showReportBox: !showReportBox,
    });
  };

  render() {
    const { showReportBox } = this.state;

    return (
      <>
        <div className="report-error-button button" onClick={this.handleReportBox}>
          zgłoś problem
        </div>
        {showReportBox && (
          <Report handleModal={this.handleReportBox} reportType={notficationTypes.REPORT_ERROR} />
        )}
      </>
    );
  }
}

export default ErrorReport;
