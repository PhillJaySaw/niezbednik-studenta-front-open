/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

class Searchbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, handleChangeInput, intl, handleSubmit, placeholder=intl.formatMessage({ id: 'placeholder.search' }) } = this.props;

    return (
      <>
        <div className="search-input">
          {/* eslint-disable-next-line max-len */}
          <input
            className="form-control border-right-0 border"
            type="text"
            placeholder={placeholder}
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
          <div
            className="searchbox-button btn btn-outline-secondary border-left-0 border"
            type="button"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
      </>
    );
  }
}

export default injectIntl(Searchbox);
