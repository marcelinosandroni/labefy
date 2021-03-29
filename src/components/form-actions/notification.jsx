import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

export const Notification = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={props.alert}
      onClose={() => props.setAlert(false)}
      autoHideDuration={5000}
      message={props.msg}
    />
  )
}