import React from "react";
import { useLogout } from "../../hooks/useLogout";
import Navbar from "../../components/navbar/navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import "../profilePage/profile.css";
import { FaUserCircle } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "antd/es/form/Form";
import ProgressBar from "../../components/progressBar/proressBar";

const Profile = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isShow, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  var { handleSubmit } = useForm();

  //   fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios("api/user/profile", {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      const json = await response.data;

      if (response.status === 200) {
        setData(json);
        setUsername(json.username);
      }
    };
    fetchUserProfile();
  }, []);

  // update user data
  handleSubmit = async (e) => {
    console.log("innnn");
    e.preventDefault();
    const response = await axios.patch(
      "api/user/update",
      {
        username: username,
        password: password,
        confirm_password: confirmPass,
      },
      {
        headers: {
          Authorization: `Bearer ${user}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.data;

    if (response.status === 200) {
      alert("Profile Updated Successfully");
      window.location = "/market";
    }
  };

  //update Password checkbox
  const showPasswordSection = (event) => {
    setShow(!isShow);
  };

  //logout user
  const handleClick = () => {
    logout();
  };

  //dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="profile">
      <Navbar />
      {data ? (
        <div className="test">
          <div>
            {/* <h1>PROFILE PAGE</h1> */}
            <div className="box-form-1">
              <div className="left">
                <div className="overlay">
                    <h1>PROFILE</h1>
                  <h1>
                    <FaUserCircle /> {data?.username}
                  </h1>
                  {/* <h1>{data?.username}</h1> */}
                </div>
              </div>

              <div className="right">
                <form
                  id="submit_data"
                  className="login"
                >
                  <h2>Email:</h2>
                  <p>{data?.email}</p>
                  <br></br>

                  <h2>Username:</h2>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <br></br>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={showPasswordSection}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      }
                      label="Update My Password"
                    />
                  </FormGroup>

                  {isShow ? (
                    <div>
                      <div>
                        <h2>Password:</h2>
                        <input
                          type="text"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <br></br>

                        <h2>Confirm Password:</h2>
                        <input
                          type="text"
                          value={confirmPass}
                          onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <br></br>
                      </div>
                    </div>
                  ) : null}

                  {/* <button>Submit</button> */}
                  <div>
                    <Button variant="outlined" onClick={handleClickOpen}>
                      Submit
                    </Button>
                    <Dialog
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Confirmation"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Please confirm if you want to proceed to update your
                          profile
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Back</Button>
                        <Button onClick={handleSubmit}  autoFocus>
                          Proceed
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )  : (
        <ProgressBar />
      )}
      <button onClick={handleClick}>Log out</button>
    </div>
  );
};

export default Profile;
