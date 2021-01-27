/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './style.scss';

class ShowMoreButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { onClick = () => {}, moreFetching, type } = this.props;

    return (
      <>
        <div className={'more-data ' + (type === 'notifications' ? 'more-data-notifications' : '')}>
          <div
            className={
              'more-data__button button ' +
              (type === 'notifications' ? 'more-data-notifications__button-notifications' : '')
            }
            onClick={onClick}
            disabled={moreFetching}
          >
            <p>
              <FormattedMessage id="button.show-more" />
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default ShowMoreButton;
