import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ConfirmDialog = props => {
  const {open, resp, clickPlayId, clickPlayName = ''} = props.info
  const change = props.set
  // const [open, setOpen] = React.useState(props.open);
  console.log(`DIALOGO: ${Boolean(open)}`)
  console.log(props)

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = (resp) => {
    // setOpen(false);
    change({...props.info, open: false, resp})
  };
  
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {`Quer deletar mesmo a play: ${clickPlayName}`}
          </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Ao deletar todas as tracks gravadas e a playlist intera vai sumir!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="secondary">
            Deleta ai pow
          </Button>
          <Button onClick={() => handleClose(false)} color="secondary">
            Mals ai errei
          </Button>
        </DialogActions>
      </Dialog>
    </div>

    
  )
}