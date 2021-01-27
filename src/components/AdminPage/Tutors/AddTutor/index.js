/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { checkIfTutorExist } from '../../../../helpers/Functions/CheckFunctions';
import {
  isValidDataTutors,
  validationHttp,
} from '../../../../helpers/Functions/ValidationFunctions';
import { addTutor, editTutor } from '../../../../store/reducers/tutors/actions';
import tutorsDegree from '../../../../store/reducers/tutors-degree/reducers';
import { injectIntl, FormattedMessage } from 'react-intl';

class AddTutor extends Component {
  constructor(props) {
    super(props);

    const { tutors, tutorsDegree, editMode, editTutorData } = this.props;

    if (editMode) {
      this.state = {
        id: editTutorData.id,
        name: editTutorData.name,
        originalName: editTutorData.name,
        surname: editTutorData.surname,
        originalSurname: editTutorData.surname,
        page: editTutorData.page,
        information: editTutorData.information,
        selectedDegree: editTutorData.selectedDegree,
        tutors,
        tutorsDegree,
      };
    } else {
      this.state = {
        name: '',
        originalName: editTutorData.name,
        surname: '',
        originalSurname: '',
        page: '',
        information: '',
        selectedDegree: { id: 1 },
        tutors,
        tutorsDegree,
      };
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'selectedDegree') {
      this.setState({
        selectedDegree: {
          id: value,
        },
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  fetchDataAdd = (selectedName, selectedSurname, selectedPage) => {
    const { selectedDegree, information } = this.state;
    const { handleModal, addTutor } = this.props;
    const selectedInformation = information.trim();
    selectedPage = validationHttp(selectedPage) ? selectedPage : 'https://' + selectedPage;

    addTutor(selectedDegree, selectedName, selectedSurname, selectedPage, selectedInformation);
    handleModal();
  };

  editTutorData = (selectedName, selectedSurname, selectedPage) => {
    const { id, selectedDegree, information, tutorsDegree } = this.state;
    const { handleModal, editTutor } = this.props;
    const selectedInformation = information.trim();
    selectedPage = validationHttp(selectedPage) ? selectedPage : 'https://' + selectedPage;

    let selectedDegreeObj = tutorsDegree.filter(
      (degree) => degree.id === Number(selectedDegree.id),
    );
    selectedDegreeObj = selectedDegreeObj[0];
    const data = {
      id: id,
      coordinatorDegree: selectedDegreeObj,
      name: selectedName,
      surname: selectedSurname,
      page: selectedPage,
      information: selectedInformation,
    };
    editTutor(data);
    handleModal();
  };

  handleSubmit = () => {
    const { editMode, intl } = this.props;
    const { name, originalName, surname, originalSurname, tutors, page } = this.state;
    const selectedName = name.trim();
    const selectedSurname = surname.trim();
    const selectedPage = page.trim();

    if (isValidDataTutors(selectedName, selectedSurname, selectedPage)) {
      if (
        (editMode && selectedName === originalName && selectedSurname === originalSurname) ||
        !checkIfTutorExist(selectedName, selectedSurname, tutors)
      ) {
        if (!editMode) {
          this.fetchDataAdd(selectedName, selectedSurname, selectedPage);
        } else {
          this.editTutorData(selectedName, selectedSurname, selectedPage);
        }
      } else {
        Swal.fire({
          icon: 'error',
          text: intl.formatMessage({ id: 'message-box.tutor.exists' }),
        });
      }
    }
  };

  render() {
    const { handleModal, editMode, intl } = this.props;
    const { name, surname, page, information, tutorsDegree, selectedDegree } = this.state;

    return (
      <>
        <MDBModal isOpen={handleModal} toggle={handleModal} centered>
          <div className="modal-header">
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          <div className="modal-wrapper form-group">
            <div className="modal-field">
              <div className="modal-title">
                <p className="tutor-title">
                  <FormattedMessage id="admin.tutor.title" />
                </p>
                <div />
              </div>
              <label className="select-degree">
                <FormattedMessage id="admin.tutor.degree" />
                <select
                  name="selectedDegree"
                  onChange={this.handleInputChange}
                  value={selectedDegree.id}
                >
                  {tutorsDegree.map((degree) => (
                    <option value={degree.id}>{degree.name}</option>
                  ))}
                </select>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={intl.formatMessage({ id: 'admin.tutor.name' })}
                value={name}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                name="surname"
                className="form-control"
                placeholder={intl.formatMessage({ id: 'admin.tutor.surname' })}
                value={surname}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="modal-field">
              <div className="modal-title">
                <p>
                  <FormattedMessage id="admin.links.link" />
                </p>
                <div />
              </div>
              <div className="links">
                <input
                  type="url"
                  name="page"
                  className="form-control link-input"
                  placeholder={intl.formatMessage({ id: 'admin.links.link-name' })}
                  value={page}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-title">
                <p><FormattedMessage id="admin.tutor.information" /></p>
                <div />
              </div>
              <div className="information">
                <textarea
                  type="text"
                  name="information"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: 'admin.tutor.information-text' })}
                  value={information}
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="modal-field">
              <div className="modal-add-button button" onClick={this.handleSubmit}>
              <p>{editMode
                  ? intl.formatMessage({ id: 'button.save' })
                  : intl.formatMessage({ id: 'button.add' })}</p>
              </div>
            </div>
          </div>
        </MDBModal>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTutor: (coordinatorDegree, name, surname, page, information) => {
      dispatch(addTutor(coordinatorDegree, name, surname, page, information));
    },
    editTutor: (data) => {
      dispatch(editTutor(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(AddTutor));
