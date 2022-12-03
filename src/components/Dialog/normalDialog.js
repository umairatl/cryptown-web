import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDialogContext } from "../../hooks/useDialogContext";
import Typography from "@mui/material/Typography";

const NormalDialog = ({ type, dialogTitle, dialogMessage }) => {
  const {
    userPost,
    addToWatchList,
    removeWatchlist,
    loginMssg,
    signupMssg,
    replyError,
    userPostProfile,
    userUpdate,
    usernameError,
    passwordUpdate,
    postSuccessful,
    dispatch,
  } = useDialogContext();

  const handleOpen = () => {
    switch (type) {
      case "USER_POST":
        return userPost;
      case "ADD_TO_WATCHLIST":
        return addToWatchList;
      case "REMOVE_FROM_WATCHLIST":
        return removeWatchlist;
      case "LOGIN_MSSG":
        return loginMssg;
      case "SIGNUP_MSSG":
        return signupMssg;
      case "REPLY_ERROR":
        return replyError;
      case "USER_POST_PROFILE":
        return userPostProfile;
      case "USER_UPDATE":
        return userUpdate;
      case "PASSWORD_UPDATE":
        return passwordUpdate;
      case "POST_SUCCESSFUL":
        return postSuccessful;
      case "USERNAME_ERROR":
        return usernameError;
      default:
        return;
    }
  };

  const handleClose = () => {
    return dispatch({ type: type });
  };

  return (
    <div>
      <Dialog
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography style={{ whiteSpace: "pre-line" }}>
              {dialogMessage}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NormalDialog;
