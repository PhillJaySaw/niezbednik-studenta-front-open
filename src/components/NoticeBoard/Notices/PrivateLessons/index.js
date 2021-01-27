/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import AddOffer from './AddOffer';
import Offer from './Offer';
import { fetchTutoringOffersData } from '../../../../store/reducers/tutoring-offers/action';
import { searchPostFunction } from '../../../../helpers/Functions/SearchFunctions';
import ShowMoreButton from '../../../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';
import SearchInput from '../../../items/SearchInput';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class PrivateLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      moreFetching: false,
    };
  }

  componentDidMount = () => {
    const { fetchTutoringOffersData } = this.props;
    fetchTutoringOffersData(0, null, null, null);
  };

  handleSearch = (user, courseName, type) => {
    const { fetchTutoringOffersData } = this.props;
    fetchTutoringOffersData(0, user, courseName, type);
  }

  fetchMoreOffers = () => {
    const { fetchTutoringOffersData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchTutoringOffersData(page);
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

  render() {
    const { searchInput, moreFetching } = this.state;
    const { tutoringOffersList, pageNumber, totalPages, fetchPending, intl } = this.props;
    let offers = [];

    if (Object.keys(tutoringOffersList).length) {
      if (searchInput === '') {
        offers = tutoringOffersList.map((offer) => (
          <Offer
            key={offer.id}
            id={offer.id}
            content={offer.content}
            type={offer.type}
            course={offer.course}
            date={this.formatDate(offer.createdDate)}
            authorName={offer.author.name + ' ' + offer.author.surname}
            authorId={offer.author.id}
            edited={offer.edited}
            userInterested={offer.userInterested}
          />
        ));
      } else {
        const filtredData = searchPostFunction(searchInput, tutoringOffersList);
        offers = filtredData.map((offer) => (
          <Notice
            key={offer.id}
            id={offer.id}
            content={offer.content}
            date={this.formatDate(offer.createdDate)}
            authorName={offer.author.name + ' ' + offer.author.surname}
            authorId={offer.author.id}
            edited={offer.edited}
          />
        ));
      }
    }

    return (
      <>
        <div className="current-option-content" style={{'overflowX':'hidden'}}>
          <div className="bookmark-menu">
            <AddOffer />
            <SearchInput 
              searchCategories={[{name: intl.formatMessage({ id: 'filter.author' }), category: "user"}, {name: intl.formatMessage({ id: 'filter.course' }), category: "category2"}]}
              checkBoxes={[
                {name: intl.formatMessage({ id: 'filter.tutoring.take' }), value: "TAKE"}, 
                {name: intl.formatMessage({ id: 'filter.tutoring.give' }), value: "GIVE"}]} 
              handleSearch={this.handleSearch}
              />
          </div>
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="posts-list tutoring-offers-posts-list">{offers}</div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreOffers} moreFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tutoringOffersList: state.tutoringOffers.tutoringOffersList,
  totalPages: state.tutoringOffers.totalPages,
  pageNumber: state.tutoringOffers.pageNumber,
  fetchPending: state.tutoringOffers.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTutoringOffersData: (page, user, courseName, type) =>
    dispatch(fetchTutoringOffersData(page, user, courseName, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(PrivateLessons));
