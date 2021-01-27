import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchNotifications } from '../../../store/reducers/admin_notifications/actions';
import SuggestedChanges from './SuggestedChanges';
import { injectIntl } from 'react-intl';
import ShowMoreButton from '../../items/ShowMoreButton';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCounter: 0,
      moreFetching: false,
    };
  }

  componentDidMount() {
    const { fetchNotifications } = this.props;
    const { pageCounter } = this.state;
    fetchNotifications(pageCounter);
    this.setState({
      pageCounter: pageCounter + 1,
    });
  }

  fetchMoreNotifications = () => {
    const { fetchNotifications } = this.props;
    const { pageCounter } = this.state;
    this.setState({
      moreFetching: true,
    });
    fetchNotifications(pageCounter);
    this.setState({
      pageCounter: pageCounter + 1,
    });
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  render() {
    const { notifications, totalElements } = this.props;
    const { moreFetching } = this.state;

    const notificationsList = notifications.map((element) => {
      return (
        <SuggestedChanges
          key={element.id}
          id={element.id}
          content={element.message}
          type={element.type}
        />
      );
    });

    return (
      <div className="current-option-content">
        <div className="suggestions-list">{notificationsList}</div>
        {notifications.length < totalElements && (
          <ShowMoreButton onClick={this.fetchMoreNotifications} moreFetching={moreFetching} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.adminNotifications.notifications,
  totalElements: state.adminNotifications.totalElements,
});

const mapDispatchToProps = (dispatch) => ({
  fetchNotifications: (page) => dispatch(fetchNotifications(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Notifications));
