/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../store/reducers/user/action';
import ShowMoreButton from '../../items/ShowMoreButton';
import SearchWithSearchBoxes from '../../items/SearchWithSearchBoxes';
import User from './User';
import './style.scss';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers(0, null);
  }

  handleChangeInput = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      this.setState({
        [name]: checked,
      });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSearch = (user, type) => {
    const { fetchUsers } = this.props;
    let data = {
      name: user ? user.name : '',
      surname: user ? user.surname : '',
      isAdmin: type ? 1 : 0,
    };
    fetchUsers(null, data);
  };

  fetchMore = () => {
    const { fetchUsers, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    fetchUsers(page, null);
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  render() {
    const { users, totalPages, pageNumber, intl } = this.props;
    const { moreFetching } = this.state;

    const usersList = users.map((user) => (
      <User
        key={user.id}
        id={user.id}
        name={user.name}
        surname={user.surname}
        isAdmin={user.admin}
      />
    ));

    return (
      <div className="current-option-content">
        <div className="bookmark-menu">
          <SearchWithSearchBoxes
            checkBoxes={[{ name: intl.formatMessage({ id: 'button.users.admin' }), value: 'TAKE' }]}
            defaultValue={false}
            handleSearch={this.handleSearch}
          />
        </div>
        <div className="tiles-list course-list admin-users-list">{usersList}</div>
        {pageNumber < totalPages && (
          <ShowMoreButton onClick={this.fetchMore} moreFetching={moreFetching} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.user.users,
  totalPages: state.user.usersTotalPages,
  pageNumber: state.user.usersPageNumber,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (page, data) => dispatch(fetchUsers(page, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Users));
