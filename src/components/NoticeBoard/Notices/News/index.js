/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import AddNotice from '../AddNotice';
import Notice from '../Notice';
import { fetchNoticesData } from '../../../../store/reducers/notices/action';
import ShowMoreButton from '../../../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import SearchInput from '../../../items/SearchInput';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }

  componentDidMount = () => {
    const { fetchNoticesData } = this.props;
    fetchNoticesData(0);
  };

  fetchMoreNews = () => {
    const { fetchNoticesData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchNoticesData(page);
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  formatDate = (date) => {
    const formatDate = date.replace('T', ' ').replace(/-/g, '/');
    return formatDate.substr(0, 16);
  };

  handleSearch = (author, content) => {
    const { fetchNoticesData } = this.props;
    let data = {
      content,
      userFilter: author,
    };
    fetchNoticesData(null, data);
  };

  render() {
    const { moreFetching } = this.state;
    const { noticesList, pageNumber, totalPages, fetchPending, intl } = this.props;
    let notices = [];

    if (Object.keys(noticesList).length) {
      notices = noticesList.map((notice) => (
        <Notice
          key={notice.id}
          id={notice.id}
          content={notice.content}
          date={this.formatDate(notice.createdDate)}
          authorName={notice.author.name + ' ' + notice.author.surname}
          authorId={notice.author.id}
          edited={notice.edited}
        />
      ));
    }

    return (
      <>
        <div className="current-option-content">
          <div className="bookmark-menu">
            <AddNotice />
            <SearchInput 
              searchCategories={[{name: intl.formatMessage({ id: 'filter.author' }), category: "user"}, {name: intl.formatMessage({ id: 'filter.content' }), category: "category2"}]}
              handleSearch={this.handleSearch}
            />
          </div>
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="posts-list">{notices}</div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreNews} moreFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  noticesList: state.notices.noticesList,
  totalPages: state.notices.totalPages,
  pageNumber: state.notices.pageNumber,
  fetchPending: state.notices.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNoticesData: (page, data) => dispatch(fetchNoticesData(page, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(News));
