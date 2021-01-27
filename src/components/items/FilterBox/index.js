/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import './style.scss';

class FilterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name, content, handleChangeInput, handleSubmit, intl } = this.props;

    return (
      <>
        <div className="search-users-filter">
          <div className="users-filter-title">
            <p>
              <FormattedMessage id="courses.search-filters" />
            </p>
          </div>
          <div className="users-search-input">
            <input
              className="form-control"
              type="search"
              placeholder={intl.formatMessage({ id: 'placeholder.search-by-content' })}
              name="content"
              value={content}
              onChange={handleChangeInput}
            />
          </div>
          <div className="name-search-input">
            <input
              className="form-control"
              type="search"
              placeholder={intl.formatMessage({ id: 'placeholder.search-by-user' })}
              name="name"
              value={name}
              onChange={handleChangeInput}
            />
          </div>
          <div className="users-search-button button" onClick={handleSubmit}>
            <p>
              <FormattedMessage id="button.search" />
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default injectIntl(FilterBox);
