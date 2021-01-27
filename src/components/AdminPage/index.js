/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../style.scss';
import Title from '../items/CurrentPageTitle';
import Notifications from './Notifications';
import Users from './Users';
import Courses from './Courses';
import Tutors from './Tutors';
import HelpfulLinks from './HelpfulLinks';
import Bookmarks from '../BookmarksBar';
import PageNotFound from '../PageNotFound';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { fetchUserData } from '../../store/reducers/user/action';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 200px;
`;

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      isError: true,
      loading: true,
    };
  }

  componentDidMount() {
    const { fetchUserData } = this.props;

    Promise.resolve(fetchUserData())
      .then((value) => {
        if (value) {
          if (!value.payload.admin) {
            this.setState({
              isAdmin: false,
              isError: true,
              loading: false,
            });
          } else {
            this.setState({
              isAdmin: true,
              isError: false,
              loading: false,
            });
          }
        }
      })
      .catch((error) => {
        this.setState({
          isError: true,
          loading: false,
        });
      });
  }

  render() {
    const { isError, loading } = this.state;
    const { intl } = this.props;
    const { url } = this.props.match;
    let page = url.split('/')[2];

    return (
      <>
        <ClipLoader css={override} size={150} color={'#263493'} loading={loading} />
        {isError && !loading && <PageNotFound />}
        {!isError && !loading && (
          <div className="current-page-container admin-page">
            <Title title={intl.formatMessage({ id: 'admin.title' })} />
            <div className="current-page-content">
              <Bookmarks
                bookmarksList={[
                  {
                    name: intl.formatMessage({ id: 'categories.reports' }),
                    path: 'notifications',
                  },
                  {
                    name: intl.formatMessage({ id: 'categories.users' }),
                    path: 'users',
                  },
                  {
                    name: intl.formatMessage({ id: 'categories.courses' }),
                    path: 'courses',
                  },
                  {
                    name: intl.formatMessage({ id: 'categories.tutors' }),
                    path: 'tutors',
                  },
                  {
                    name: intl.formatMessage({ id: 'categories.helpful-links' }),
                    path: 'helpful-links',
                  },
                ]}
              />
              {page === 'notifications' && <Notifications />}
              {page === 'users' && <Users />}
              {page === 'courses' && <Courses />}
              {page === 'tutors' && <Tutors />}
              {page === 'helpful-links' && <HelpfulLinks />}
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: () => dispatch(fetchUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(AdminPage)));
