/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { addLink } from '../../../../store/reducers/helpful_links/action';
import {
  validationIsEmpty,
  validationUrl,
  validationHttp,
} from '../../../../helpers/Functions/ValidationFunctions';
import { checkIfNameExist, checkIfUrlExist } from '../../../../helpers/Functions/CheckFunctions';
import { injectIntl, FormattedMessage } from 'react-intl';

class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      page: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { name, page } = this.state;
    const { addLink, handleModal, links, intl } = this.props;
    const selectedName = name.toLowerCase().trim();
    let selectedPage = page.trim();

    if (validationIsEmpty(name) && validationIsEmpty(page)) {
      if (validationUrl(page)) {
        if (!checkIfNameExist(selectedName, links)) {
          if (!validationHttp(page)) {
            selectedPage = 'https://' + selectedPage;
          }
          if (!checkIfUrlExist(selectedPage, links)) {
            addLink(selectedName, selectedPage);
            handleModal();
          } else {
            Swal.fire({
              icon: 'error',
              text: intl.formatMessage({ id: 'message-box.links.exists' }),
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            text: intl.formatMessage({ id: 'message-box.links.exists-name' }),
          });
        }
      }
    }
  };

  render() {
    const { handleModal, intl } = this.props;
    const { name, page } = this.state;

    return (
      <div>
        <MDBModal isOpen={handleModal} toggle={handleModal} centered>
          <div className="modal-header">
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={handleModal} />
          </div>
          <div className="modal-wrapper form-group">
            <div className="modal-field">
              <div className="modal-title">
                <p className="tutor-title">
                  <FormattedMessage id="admin.links.page-name" />
                </p>
                <div />
              </div>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder={intl.formatMessage({ id: 'admin.links.name' })}
                value={name}
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
              <div className="modal-add-button button" onClick={this.handleSubmit}>
                <p><FormattedMessage id="button.add" /></p>
              </div>
            </div>
          </div>
        </MDBModal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addLink: (name, url) => {
      dispatch(addLink(name, url));
    },
  };
};

export default connect(null, mapDispatchToProps)(injectIntl(AddLink));
