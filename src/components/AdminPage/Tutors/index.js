/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import fetchTutorData from '../../../store/reducers/tutors/actions';
import fetchTutorDegreeData from '../../../store/reducers/tutors-degree/actions';
import Tutor from '../../Tutors/Tutor';
import Searchbox from '../../items/SearchBox';
import './style.scss';
import AddTutor from './AddTutor';
import ShowMoreButton from '../../items/ShowMoreButton';
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
      isModalTutorOpen: false,
      editMode: false,
      editTutorData: '',
      moreFetching: false,
      name: '',
    };
  }

  componentDidMount() {
    const { fetchTutorData, fetchTutorDegreeData } = this.props;
    fetchTutorData(0);
    fetchTutorDegreeData();
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClickModalTutor = () => {
    const { isModalTutorOpen } = this.state;
    this.setState({
      isModalTutorOpen: !isModalTutorOpen,
      editMode: false,
    });
  };

  onEditModalOpen = (data) => {
    const { isModalTutorOpen } = this.state;
    this.setState({
      isModalTutorOpen: !isModalTutorOpen,
      editMode: true,
      editTutorData: data,
    });
  };

  fetchMoreTutors = () => {
    const { fetchTutorData, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchTutorData(page);
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
    const { tutors, tutorsDegree, pageNumber, totalPages, fetchPending } = this.props;
    const { isModalTutorOpen, name, editMode, editTutorData, moreFetching } = this.state;
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
          isAdmin={true}
          handleEditClickModal={(data) => this.onEditModalOpen(data)}
        />
      ));
    }

    return (
      <>
        <div className="current-option-content administer-tutors">
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
              <div className="items-list">
                <div className="list-element add-new-item" onClick={this.handleClickModalTutor}>
                  <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                </div>
                {tutorsList}
              </div>
              {pageNumber < totalPages && (
                <ShowMoreButton onClick={this.fetchMoreTutors} moreFetching={moreFetching} />
              )}
            </div>
          )}
        </div>
        {isModalTutorOpen && (
          <AddTutor
            handleModal={this.handleClickModalTutor}
            tutors={tutors}
            tutorsDegree={tutorsDegree}
            editMode={editMode}
            editTutorData={editTutorData}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  tutors: state.tutors.tutors,
  tutorsDegree: state.tutorsDegree.tutorsDegree,
  totalPages: state.tutors.totalPages,
  pageNumber: state.tutors.pageNumber,
  fetchPending: state.tutors.fetchPending,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTutorData: (page, sortParam, data) => dispatch(fetchTutorData(page, sortParam, data)),
  fetchTutorDegreeData: () => dispatch(fetchTutorDegreeData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tutors);
