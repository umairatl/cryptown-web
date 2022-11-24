import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDialogContext } from '../../hooks/useDialogContext';

const NormalDialog = ({type, dialogTitle, dialogMessage}) => {
    const { userPost, addToWatchList, dispatch } = useDialogContext()

    const handleOpen = () => {
        switch (type) {
            case "USER_POST":
                return userPost
            case "ADD_TO_WATCHLIST": 
                return addToWatchList
            default:
                return
        }
    }
    
    const handleClose = () => {
        return dispatch({type: type})
    }
    
    return ( <div>
        <Dialog
        open={handleOpen}
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