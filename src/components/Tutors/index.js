/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import fetchTutorData from '../../store/reducers/tutors/actions';
import Searchbox from '../items/SearchBox';
import Tutor from './Tutor';
import ShowMoreButton from '../items/ShowMoreButton';
import { css } from '@emotion/core';
import BeatLoader from 'react-spinners/BeatLoader';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 50px;
`;

class Tutors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchTutorData } = this.props;
    fetchTutorData(0, 'name,asc');
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  fetchMoreTutors = () => {
    const { fetchTutorData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchTutorData(page, 'name,asc');
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  handleSubmit = () => {
    const { name } = this.state;
    const { fetchTutorData } = this.props;
    const splitedName = name.split(' ');
    let data;
    if (splitedName.length === 1) {
      data = {
        name: splitedName[0],
        surname: splitedName[0],
      };
    } else {
      data = {
        name: splitedName[0],
        surname: splitedName[1],
      };
    }
    fetchTutorData(null, null, data);
  };

  render() {
    const { tutors, pageNumber, totalPages, fetchPending } = this.props;
    const { name, moreFetching } = this.state;
    let tutorsList = '';

    if (tutors !== undefined) {
      tutorsList = tutors.map((tutor) => (
        <Tutor
          key={tutor.id}
          id={tutor.id}
          degree={tutor.coordinatorDegree}
          name={tutor.name}
          surname={tutor.surname}
          page={tutor.page}
          information={tutor.information}
          isAdmin={false}
        />
      ));
    }

    return (
      <>
        <div className="current-option-content">
          <div className="search-bar">
            <Searchbox
              name={name}
              handleChangeInput={this.handleChangeInput}
              handleSubmit={this.handleSubmit}
            />
          </div>
          <BeatLoader css={override} size={30} color={'#263493'} loading={fetchPending} />
          {!fetchPending && (
            <div>
              <div className="items-list">{tutorsList}</div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreTutors} moreFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tutors: state.tutors.tutors,
  totalPages: state.tutors.totalPages,
  pageNumber: state.tutors.pageNumber,
  fetchPending: state.tutors.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTutorData: (page, sort, data) => dispatch(fetchTutorData(page, sort, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Tutors));
