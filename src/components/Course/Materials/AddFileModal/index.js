import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl, FormattedMessage } from 'react-intl';
import { uploadFile } from '../../../../store/reducers/files/actions';
import { checkIfNameExist } from '../../../../helpers/Functions/CheckFunctions';
import Swal from 'sweetalert2';
import { MDBModal } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { Spinner } from 'react-bootstrap';

const AddFileModal = ({ toggleModal, courseId, filesList, uploadPending }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);
  const dispatch = useDispatch();
  const intl = useIntl();

  const nameToFilename = (name) => {
    const illegalSign = new RegExp('[\\\\/:*?!%&@$#"<>|]', 'g');
    let filename = name.replaceAll(illegalSign, '-').replaceAll(' ', '_');
    return filename;
  };

  const nameInputChange = (e) => {
    const { value } = e.target;
    setSelectedName(value);
  };

  const onChangeHandler = useCallback((event) => {
    setSelectedFile(event.target.files[0]);
    setCurrentFileName(event.target.files[0].name);
  }, []);

  const handleSendFile = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: 'error',
        text: intl.formatMessage({ id: 'message-box.file.nofile' }),
      });
    } else if (!selectedName) {
      Swal.fire({
        icon: 'error',
        text: intl.formatMessage({ id: 'message-box.file.name' }),
      });
    } else {
      let originalName = selectedFile.name;
      let newName =
        nameToFilename(selectedName) +
        originalName.substr(originalName.indexOf('.'), originalName.length);
      const file = new File([selectedFile], newName, { type: selectedFile.type });
      if (!checkIfNameExist(newName, filesList)) {
        await dispatch(uploadFile({ courseId, file }));
        toggleModal();
      } else {
        Swal.fire({
          icon: 'error',
          text: intl.formatMessage({ id: 'message-box.file.exists' }),
        });
      }
    }
  };

  return (
    <div className="add-file-modal">
      <div className="modal-background"></div>
        <div className="add-file-modal-window">
          <div className="decoration-strip">
            <FontAwesomeIcon icon={faTimes} className="modal-exit-icon" onClick={toggleModal} />
          </div>
          <div className="add-file-container">
            <p>{intl.formatMessage({ id: 'course.materials.nameFile' })}</p>
            <input
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({ id: 'placeholder.file-name' })}
              name="fileName"
              value={selectedName}
              onChange={nameInputChange}
            />
            <p>{intl.formatMessage({ id: 'course.materials.chooseFile' })}</p>
            <div className="file-upload-section">
              <input type="file" onChange={onChangeHandler} />
              <label class="custom-file-upload">
                <button className="browse-button button">
                  {intl.formatMessage({ id: 'button.browse-file' })}
                </button>
                <p>
                  {currentFileName
                    ? currentFileName
                    : intl.formatMessage({ id: 'button.browse-file.after' })}
                </p>
              </label>
            </div>
            <div className="add-file-button submit-button button" onClick={handleSendFile}>
              {uploadPending ? (
                <Spinner animation="border" role="status" />
              ) : (
                <p><FormattedMessage id="button.add" /></p>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default AddFileModal;
