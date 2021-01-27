/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { fetchCourseData } from '../../store/reducers/courses/actions';
import '../../style.scss';
import Title from '../items/CurrentPageTitle';
import Forum from './Forum';
import Info from './Info';
import Materials from './Materials';
import Tutoring from './Tutoring';
import Bookmarks from '../BookmarksBar';
import './style.scss';
import PageNotFound from '../PageNotFound';
import { withRouter } from 'react-router';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 200px;
`;

class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course: '',
      name: '',
      courseInformation: '',
      isError: true,
      loading: true,
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const urlObj = window.location.pathname;
    const id = parseInt(urlObj.match(/\d+/)[0], 10);

    Promise.resolve(fetchCourseData(id))
      .then((value) => {
        if (value) {
          if (!user.admin && !value.isUserBelong) {
            this.setState({
              isError: true,
              loading: false,
            });
          } else {
            this.setState({
              name: value.name,
              courseInformation: value.courseInformation,
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
    const { courseInformation, name, isError, loading } = this.state;
    const { user } = this.props;
    const { url } = this.props.match;
    let page = url.split('/')[2];
    const urlObj = window.location.pathname;
    const id = parseInt(urlObj.match(/\d+/)[0], 10);

    return (
      <>
        <ClipLoader css={override} size={150} color={'#263493'} loading={loading} />
        {isError && !loading && <PageNotFound />}
        {!isError && !loading && (
          <div className="current-page-container">
            <Title title={name} />
            <div className="current-page-content">
              <Bookmarks
                bookmarksList={[
                  {
                    name: <FormattedMessage id="course.forum" />,
                    path: 'forum',
                  },
                  {
                    name: <FormattedMessage id="course.info" />,
                    path: 'info',
                  },
                  {
                    name: <FormattedMessage id="course.materials" />,
                    path: 'materials',
                  },
                  {
                    name: <FormattedMessage id="news.tutoring" />,
                    path: 'tutoring',
                  },
                ]}
              />
              {page === 'forum' && <Forum courseId={id} isAdmin={user.admin} />}
              {page === 'info' && <Info courseInfo={courseInformation} courseId={id} />}
              {page === 'materials' && <Materials courseId={id} />}
              {page === 'tutoring' && <Tutoring courseId={id} courseName={name}/>}
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

export default connect(mapStateToProps, null)(withRouter(Course));
