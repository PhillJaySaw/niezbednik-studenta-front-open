/* eslint-disable react/prop-types */
/* eslint-disable lines-between-class-members */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage, injectIntl } from 'react-intl';

class DeleteMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { intl } = this.props;
    const {
      messageBoxOpen,
      handleClickMessageBox,
      handleClickYesButton,
      title = intl.formatMessage({ id: 'message-box.delete.confirmation' }),
      message = intl.formatMessage({ id: 'message-box.confirmation' }),
      generalYes = intl.formatMessage({ id: 'general.yes' }),
      generalCancel = intl.formatMessage({ id: 'general.cancel' }),
    } = this.props;

    return (
      <>
        <Dialog
          open={messageBoxOpen}
          onClose={handleClickMessageBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickYesButton} color="primary">
              {generalYes}
            </Button>
            <Button onClick={handleClickMessageBox} color="primary" autoFocus>
              {generalCancel}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default injectIntl(DeleteMessageBox);
