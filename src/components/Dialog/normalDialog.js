import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDialogContext } from '../../hooks/useDialogContext';

const NormalDialog = ({dialogTitle, dialogMessage}) => {
    const { user_post, dispatch } = useDialogContext()
    
    const handleClose = () => {
        dispatch({type: "USER_POST"})
    }
    
    return ( <div>
        <Dialog
        open={user_post}
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
                Ok
            </Button>
        </DialogActions>
        </Dialog>
    </div> );
}
 
export default NormalDialog;