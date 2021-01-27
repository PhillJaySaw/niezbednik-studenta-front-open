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

class ConfirmationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { message, intl } = this.props;
    const { messageBoxOpen, handleClickMessageBox, handleClickYesButton } = this.props;

    return (
      <>
        <Dialog
          open={messageBoxOpen}
          onClose={handleClickMessageBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <FormattedMessage id="message-box.confirmation-title" />
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message ? message : <FormattedMessage id="message-box.confirmation" />}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClickYesButton} color="primary">
              <FormattedMessage id="general.yes" />
            </Button>
            <Button onClick={handleClickMessageBox} color="primary" autoFocus>
              <FormattedMessage id="general.cancel" />
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default injectIntl(ConfirmationBox);
