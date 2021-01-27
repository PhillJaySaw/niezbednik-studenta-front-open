/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteLink } from '../../../store/reducers/helpful_links/action';
import DeleteMessageBox from '../../items/DeleteMessageBox';

class LinkItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageBoxOpen: false,
    };
  }

  onDeleteLinkClick = () => {
    const { id, deleteLink } = this.props;
    deleteLink(id);
    this.setState({
      messageBoxOpen: false,
    });
  };

  handleClickMessageBox = () => {
    const { messageBoxOpen } = this.state;
    this.setState({
      messageBoxOpen: !messageBoxOpen,
    });
  };

  render() {
    const { name, url, isAdmin } = this.props;
    const { messageBoxOpen } = this.state;

    return (
      <div className="list-element">
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.onDeleteLinkClick}
          />
        )}
        <a href={url} target="_blank" className="name-path">
          <p className="list-element-name">{name}</p>
        </a>
        {isAdmin ? (
          <FontAwesomeIcon
            icon={faTrash}
            className="pen-icon trash-icon"
            onClick={this.handleClickMessageBox}
          />
        ) : (
          <a href={url} target="_blank" className="link-icon hover-icon-big">
            <FontAwesomeIcon icon={faLink}/>
          </a>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteLink: (id) => dispatch(deleteLink(id)),
});

export default connect(null, mapDispatchToProps)(LinkItem);
