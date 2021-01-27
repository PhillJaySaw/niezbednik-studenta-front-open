/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

class PostAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isPostAlertOpen, handleClickPostAlert, handleExpandTextArea, message } = this.props;

    return (
      <>
        <Dialog
          open={isPostAlertOpen}
          onClose={handleClickPostAlert}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExpandTextArea} color="primary">
              <FormattedMessage id="message-box.yes" />
            </Button>
            <Button onClick={handleClickPostAlert} color="primary" autoFocus>
              <FormattedMessage id="message-box.no" />
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default PostAlert;
