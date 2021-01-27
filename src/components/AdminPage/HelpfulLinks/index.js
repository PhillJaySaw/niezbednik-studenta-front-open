/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import LinkItem from '../../HelpfulLinks/LinkItem';
import './style.scss';
import AddLink from './AddLink';
import { fetchLinksData } from '../../../store/reducers/helpful_links/action';
import ShowMoreButton from '../../items/ShowMoreButton';
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
      isModalOpen: false,
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchLinksData } = this.props;
    fetchLinksData(0);
  }

  handleClickModal = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
    });
  };

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
    const { moreFetching, isModalOpen } = this.state;
    const { links, pageNumber, totalPages, fetchPending } = this.props;
    let linksList = '';

    if (links.length !== 0 && links.length !== undefined) {
      linksList = links.map((link, index) => {
        return <LinkItem key={index} id={link.id} name={link.name} url={link.url} isAdmin={true} />;
      });
    }

    return (
      <>
        <div className="current-option-content helpful-links">
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="items-list links-list">
                <div className="add-new-item list-element" onClick={this.handleClickModal}>
                  <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                </div>
                {linksList}
              </div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreLinks} morePostsFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
        {isModalOpen && <AddLink handleModal={this.handleClickModal} links={links} />}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  links: state.helpfulLinks.linksList,
  fetchPending: state.helpfulLinks.fetchPending,
  totalPages: state.helpfulLinks.totalPages,
  pageNumber: state.helpfulLinks.pageNumber,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLinksData: (page) => dispatch(fetchLinksData(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpfulLinks);
