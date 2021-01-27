/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-indent */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import File from './File';
import AddFileModal from './AddFileModal';
import { getAllFiles } from '../../../store/reducers/files/actions';
import './style.scss';
import { injectIntl } from 'react-intl';
import ShowMoreButton from '../../items/ShowMoreButton';
import Searchbox from '../../items/SearchBox';

class Materials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addFileModalVisible: false,
      moreFetching: false,
      name: '',
    };
  }

  componentDidMount() {
    const { getAllFiles, courseId } = this.props;
    getAllFiles(courseId, 0);
  }

  fetchMoreFiles = () => {
    const { getAllFiles, courseId, pageNumber } = this.props;
    this.setState({
      moreFetching: true,
    });
    const page = pageNumber + 1;
    getAllFiles(courseId, page);
    setTimeout(() => {
      this.setState({
        moreFetching: false,
      });
    }, 1000);
  };

  handleAddFileButtonPress = () => {
    const { addFileModalVisible } = this.state;
    this.setState({
      addFileModalVisible: !addFileModalVisible,
    });
  };

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = () => {
    const { name } = this.state;
    const { getAllFiles, courseId } = this.props;
    const data = {
      fileName: name,
    };
    getAllFiles(courseId, null, data);
  };

  render() {
    const { addFileModalVisible, moreFetching, name } = this.state;
    const {
      files,
      isFilesListPending,
      courseId,
      totalPages,
      pageNumber,
      uploadPending,
    } = this.props;
    return (
      <>
        <div className="current-option-content materials">
          <div className="search-bar">
            <Searchbox
              name={name}
              handleChangeInput={this.handleChangeInput}
              handleSubmit={this.handleSubmit}
            />
          </div>
          {addFileModalVisible && (
            <AddFileModal
              toggleModal={this.handleAddFileButtonPress}
              courseId={courseId}
              filesList={files}
              uploadPending={uploadPending}
            />
          )}
          <div className="tiles-list files-list">
            <div
              className="tiles-list-element files-list-element"
              onClick={this.handleAddFileButtonPress}
            >
              <FontAwesomeIcon icon={faPlus} className="icon plus-icon" />
            </div>
            {!isFilesListPending &&
              files.length !== 0 &&
              files.map((file, index) => (
                <File
                  id={file.id}
                  key={index}
                  name={file.name}
                  type={file.type}
                  author={file.author}
                  courseId={courseId}
                />
              ))}
          </div>
          {pageNumber < totalPages && (
            <ShowMoreButton onClick={this.fetchMoreFiles} moreFetching={moreFetching} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  files: state.files.filesList,
  isFilesListPending: state.files.getFilesListPending,
  uploadPending: state.files.uploadPending,
  totalElements: state.files.totalElements,
  totalPages: state.files.totalPages,
  pageNumber: state.files.pageNumber,
});

const mapDispatchToProps = (dispatch) => ({
  getAllFiles: (courseId, pageCounter, data) => dispatch(getAllFiles(courseId, pageCounter, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Materials));
