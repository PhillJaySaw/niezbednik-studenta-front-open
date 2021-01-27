/* eslint-disable lines-between-class-members */
import React, { Component } from '../../../../node_modules/react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome';
import { faPlus } from '../../../../node_modules/@fortawesome/free-solid-svg-icons';
import './style.scss';

class AddNoticeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="add-notice">
          <p>
            <FormattedMessage id="button.add" />
          </p>
          <FontAwesomeIcon icon={faPlus} className="add-notice-icon" />
        </div>
      </>
    );
  }
}

export default AddNoticeButton;
