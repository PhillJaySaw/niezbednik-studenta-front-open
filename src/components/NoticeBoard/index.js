/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import '../../style.scss';
import News from './Notices/News';
import PrivateLessons from './Notices/PrivateLessons';
import Bookmarks from '../BookmarksBar';
import Title from '../items/CurrentPageTitle';
import './style.scss';
import { withRouter } from 'react-router';

class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { intl } = this.props;
    const { url } = this.props.match;
    let page = url.split('/')[2];

    return (
      <div className="current-page-container">
        <Title title={intl.formatMessage({ id: 'categories.news' })} />
        <div className="current-page-content">
          <Bookmarks
            bookmarksList={[
              {
                name: <FormattedMessage id="news.news" />,
                path: 'news',
              },
              {
                name: <FormattedMessage id="news.tutoring" />,
                path: 'private-lessons',
              },
            ]}
          />
          {page === 'news' && <News />}
          {page === 'private-lessons' && <PrivateLessons />}
        </div>
      </div>
    );
  }
}

export default withRouter(injectIntl(NoticeBoard));
