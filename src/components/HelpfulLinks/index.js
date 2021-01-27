/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Title from '../items/CurrentPageTitle';
import LinkItem from './LinkItem';
import { fetchLinksData } from '../../store/reducers/helpful_links/action';
import ShowMoreButton from '../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class HelpfulLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchLinksData } = this.props;
    fetchLinksData(0);
  }

  fetchMoreLinks = () => {
    const { fetchLinksData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchLinksData(page);
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  render() {
    const { moreFetching } = this.props;
    const { links, intl, pageNumber, totalPages, fetchPending } = this.props;
    let linksList = '';

    if (links.length !== 0 && links.length !== undefined) {
      linksList = links.map((link, index) => (
        <LinkItem key={index} id={link.id} name={link.name} url={link.url} isAdmin={false} />
      ));
    }

    return (
      <>
        <div className="current-option-content">
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="items-list links-list">{linksList}</div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreLinks} morePostsFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  links: state.helpfulLinks.linksList,
  totalPages: state.helpfulLinks.totalPages,
  pageNumber: state.helpfulLinks.pageNumber,
  fetchPending: state.helpfulLinks.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLinksData: (page) => dispatch(fetchLinksData(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HelpfulLinks));
