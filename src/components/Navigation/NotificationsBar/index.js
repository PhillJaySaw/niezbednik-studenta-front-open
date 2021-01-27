/* eslint-disable react/prop-types */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import './style.scss';
import { connect } from 'react-redux';
import Notification from './Notification';
import ShowMoreButton from '../../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const NotificationsBar = (props) => {
  const {
    close,
    userNotifications,
    pageNumber,
    totalPages,
    moreFetching,
    fetchMoreNotifications,
    notificationsPending,
    intl,
  } = props;
  let notifications = '';
  if (userNotifications !== undefined) {
    notifications = userNotifications.map((notification, index) => {
      return (
        <Notification
          id={notification.id}
          key={index}
          content={intl.locale === 'pl' ? notification.content : notification.contentEn}
          date={notification.createdTime}
          type={notification.type}
          idOfObjectInvolved={notification.idOfObjectInvolve}
        />
      );
    });
  }

  return (
    <>
      <nav className="side-menu NotificationsBar">
        <div className="side-menu-header NotificationsBar-header">
          <div type="button" className="close side-menu-exit" aria-label="Close" onClick={close}>
            <span aria-hidden="true">&times;</span>
          </div>
          <p className="side-menu-title NotificationsBar-title">
            <FormattedMessage id="notifications.title" />
          </p>
        </div>
        <BeatLoader css={override} size={15} color={'#263493'} loading={notificationsPending} />
        {!notificationsPending && (
          <div>
            <div className="side-menu-content notifications-content">
              {notifications.length ? notifications
              : <p className="notifications-info"><FormattedMessage id="notifications.no-data" /></p>}
            </div>
            {pageNumber < totalPages && (
              <ShowMoreButton
                onClick={fetchMoreNotifications}
                moreFetching={moreFetching}
                type="notifications"
              />
            )}
          </div>
        )}
      </nav>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(injectIntl(NotificationsBar));
