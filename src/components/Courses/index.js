import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import '../../style.scss';
import Title from '../items/CurrentPageTitle';
import MyCourses from './MyCourses';
import AllCourses from './AllCourses';
import Bookmarks from '../BookmarksBar';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import fetchTermData from '../../store/reducers/term/actions';
import fetchStudiesMajorData from '../../store/reducers/studies-major/actions';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchTermData, fetchStudiesMajorData } = this.props;
    fetchStudiesMajorData();
    fetchTermData();
  }

  render() {
    const { intl } = this.props;
    const { url } = this.props.match;
    let page = url.split('/')[2];

    return (
      <>
        <div className="current-page-container">
          <Title title={intl.formatMessage({ id: 'categories.courses' })} />
          <div className="current-page-content">
            <Bookmarks
              bookmarksList={[
                {
                  name: <FormattedMessage id="courses.my-courses" />,
                  path: 'my',
                },
                {
                  name: <FormattedMessage id="courses.all-courses" />,
                  path: 'all',
                },
              ]}
            />
            {page === 'my' && <MyCourses />}
            {page === 'all' && <AllCourses />}
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTermData: () => dispatch(fetchTermData()),
  fetchStudiesMajorData: () => dispatch(fetchStudiesMajorData()),
});

export default connect(null, mapDispatchToProps)(withRouter(injectIntl(Courses)));
