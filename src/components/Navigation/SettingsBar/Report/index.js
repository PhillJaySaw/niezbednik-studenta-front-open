/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { MDBModal } from 'mdbreact';
import { injectIntl, FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { connect } from 'react-redux';
import { sendReport } from '../../../../store/reducers/admin_notifications/actions';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { sendReport, handleModal, intl, reportType } = this.props;
    const { message } = this.state;
    if (message !== '') {
      const data = {
        message,
        type: reportType,
      };
      sendReport(data);
      handleModal();
    } else {
      Swal.fire({
        icon: 'error',
        text: intl.formatMessage({ id: 'message-box.empty-fields' }),
      });
    }
  };

  render() {
    const { handleModal, intl } = this.props;
    const { message } = this.state;

    return (
      <div>
        <MDBModal isOpen={handleModal} toggle={handleModal} centered>
          <div className="modal-header">
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          <div className="modal-wrapper form-group">
            <div className="modal-field">
              <div className="message-title">
                <textarea
                  maxLength="500"
                  type="text"
                  name="message"
                  className="form-control report-message"
                  placeholder={intl.formatMessage({ id: 'report.message-text' })}
                  value={message}
                  onChange={this.handleInputChange}
                />
                <div className="message-number">
                  <span>{message.length}/500</span>
                </div>
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-add-button" onClick={this.handleSubmit}>
                <FormattedMessage id="button.send" />
              </div>
            </div>
          </div>
        </MDBModal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendReport: (data) => dispatch(sendReport(data)),
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(Report));
