import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

const ConditionalDialog = ({handleSubmit, dialogButton, dialogTitle, dialogMessage}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
      setOpen(true);
    };
  
    const handleClose = (e) => {
      setOpen(false);
    };
  
    return ( <div onClick={e=>e.stopPropagation()}>
        <Button variant="outlined" onClick={handleClickOpen}>
            {dialogButton}
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            {dialogTitle}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {dialogMessage}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                Back
            </Button>
            <Button onClick={(e) => {handleSubmit(); handleClose()}} autoFocus>
                Confirm
            </Button>
        </DialogActions>
        </Dialog>
    </div> );
}
 
export default ConditionalDialog;