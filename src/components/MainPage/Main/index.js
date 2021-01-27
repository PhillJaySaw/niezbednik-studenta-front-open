/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Tile from './Tiles';
import UserModal from '../../User/UserModal';
import colors from '../style.scss';
import announcementImg from '../../../assets/img/announcement.png';
import courseImg from '../../../assets/img/course.png';
import tutorImg from '../../../assets/img/tutor.png';
import computerImg from '../../../assets/img/computer.png';
import eventImg from '../../../assets/img/support.png';
import studentImg from '../../../assets/img/student.png';

// eslint-disable-next-line react/prefer-stateless-function
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userModalOpen: false,
    };
  }

  handleModal = () => {
    const { userModalOpen } = this.state;
    this.setState({
      userModalOpen: !userModalOpen,
    });
  };

  render() {
    const { user } = this.props;
    const { userModalOpen } = this.state;

    let userName = '';
    if (user.name !== undefined && user.surname !== undefined) {
      userName = user.name + ' ' + user.surname;
    }

    const tilesList = [
      {
        name: <FormattedMessage id="categories.news" />,
        path: '/notice_board/news',
        color: colors.tiles1,
        img: announcementImg,
      },
      {
        name: <FormattedMessage id="categories.courses" />,
        path: '/courses/my',
        color: colors.tiles2,
        img: courseImg,
      },
      {
        name: <FormattedMessage id="categories.tutors" />,
        path: '/tutors',
        color: colors.tiles3,
        img: tutorImg,
      },
      {
        name: <FormattedMessage id="categories.admin-panel" />,
        path: '/admin_page/notifications',
        color: colors.tiles4,
        img: eventImg,
      },
      {
        name: <FormattedMessage id="categories.helpful-links" />,
        path: '/helpful_links',
        color: colors.tiles5,
        img: computerImg,
      },
      {
        name: userName,
        color: colors.tiles6,
        img: studentImg,
        onClick: this.handleModal,
      },
    ];

    const tiles = tilesList.map((tile, index) => {
      if (tile)
        return (
          <Tile
            key={index}
            name={tile.name}
            path={tile.path}
            color={tile.color}
            imgSrc={tile.img}
            onClick={tile.onClick}
            isAdmin={user.admin}
          />
        );
      return null;
    });

    return (
      <>
        {userModalOpen && <UserModal handleModal={this.handleModal} loggedUser={true} />}
        <div className={user.admin ? 'tiles' : 'tiles tiles__odd'}>{tiles}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, null)(Main);
