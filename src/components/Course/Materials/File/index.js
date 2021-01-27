import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { deleteFile, getFile } from '../../../../store/reducers/files/actions';
import DeleteMessageBox from '../../../items/DeleteMessageBox';

class File extends Component {
  constructor(props) {
    super(props);

    const { user, author } = this.props;

    this.state = {
      isUserAdmin: user.admin,
      isUserAuthor: user.id === author.id,
      messageBoxOpen: false,
    };
  }

  handleClickMessageBox = () => {
    const { messageBoxOpen } = this.state;
    this.setState({
      messageBoxOpen: !messageBoxOpen,
    });
  };

  handleDeleteFile = () => {
    const { id, deleteFile, courseId } = this.props;
    deleteFile(courseId, id);
    this.setState({
      messageBoxOpen: false,
    });
  };

  handleFileDownload = () => {
    const { courseId, id, getFile} = this.props;
    Promise.resolve(
      getFile(courseId, id).then((response) => {
        if (response) {
          const fileUrl = response.payload;
          const win = window.open(fileUrl, '_blank');
          win.focus();
        }
      }),
    );
  };

  render() {
    const { name } = this.props;
    const { isUserAdmin, isUserAuthor, messageBoxOpen } = this.state;

    return (
      <div className="tiles-list-element files-list-element">
        {messageBoxOpen && (
          <DeleteMessageBox
            messageBoxOpen={messageBoxOpen}
            handleClickMessageBox={this.handleClickMessageBox}
            handleClickYesButton={this.handleDeleteFile}
          />
        )}
        <div className="file-delete">
          {(isUserAdmin || isUserAuthor) && (
            <FontAwesomeIcon
              icon={faTrash}
              className="icon trash-icon"
              onClick={this.handleClickMessageBox}
            />
          )}
        </div>
        <div className="file-options">
          <div className="file-option" title="preview">
            <FontAwesomeIcon
                icon={faSearch}
                className="icon file-icon"
              />
          </div>
          <div className="file-option" title="download">
            <FontAwesomeIcon
              icon={faFileDownload}
              className="icon file-icon"
              onClick={this.handleFileDownload}
            />
          </div>
        </div>
        <div className="file-caption" href="">
          <p>{name}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  downloadFileUrl: state.files.downloadFile,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFile: (courseId, id) => dispatch(deleteFile(courseId, id)),
  getFile: (courseId, fileId) => dispatch(getFile(courseId, fileId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(File);
