import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { injectIntl } from 'react-intl';
import UserModal from '../../../User/UserModal';
import { connect } from 'react-redux';

class CourseUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openUserModal: false,
    };
  }

  handleClickUserModal = () => {
    const { openUserModal } = this.state;
    this.setState({
      openUserModal: !openUserModal,
    });
  };

  render() {
    const { name, surname, intl, id, isAdmin, user } = this.props;
    const { openUserModal } = this.state;

    return (
      <>
        {openUserModal && (
          <UserModal
            id={id}
            handleModal={this.handleClickUserModal}
            loggedUser={ user.id === id }
          />
        )}
        <div
          className='list-element user-list-element'
          onClick={this.handleClickUserModal}
        >
          <p className="list-element-name">{name + ' ' + surname}</p>
          {isAdmin && 
          (<div className="admin-icon-box">
            <FontAwesomeIcon
              icon={faUserShield}
              className="admin-icon"
              title={intl.formatMessage({ id: 'button.users.admin' })}
            />
          </div>)}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(injectIntl(CourseUser));
