import React from "react";
import { useLogout } from "../../hooks/useLogout";
import Navbar from "../../components/navbar/navbar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "../../components/axios/axios";
import "../profilePage/profile.css";
import { FaUserCircle } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "antd/es/form/Form";
import ProgressBar from "../../components/progressBar/proressBar";
import { Link } from 'react-router-dom';
import { useProfileContext } from "../../hooks/useProfileContext";
import { useNavigate } from 'react-router-dom';
import ConditionalDialog from "../../components/Dialog/conditionalDialog";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserPosts from "./userPostsPage/userPosts";
import Footer from "../../components/footer/footer";
import { useDialogContext } from "../../hooks/useDialogContext";
import NormalDialog from "../../components/Dialog/normalDialog";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`verticalz-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const Profile = () => {
  const { logout } = useLogout();
  // const [data, setData] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isShow, setShow] = useState(false);
  const [open, setOpen] = React.useState(false);
  var { handleSubmit } = useForm();


  
  const navigate = useNavigate()

  const { user } = useAuthContext();
  const { profile, dispatch } = useProfileContext();
  const { userUpdate, dispatch: dispatchDialogContext } = useDialogContext() 
  const [value, setValue] = React.useState(0);
  var [nav, setNav]  = useState('profile');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios("api/user/profile", {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });

      const json = await response.data;

      console.log(json)
      if (response.status === 200) {
        // setData(json);
        setUsername(json.username);
        dispatch({ type: "SET_PROFILE", payload: {email: json["email"], username: json["username"]} })
      }
    };
    console.log("USER: " , user)
    console.log("PROFILE: ", profile)


    if (user && !profile) {
      fetchUserProfile();
    } else {
      setUsername(profile["username"])
    }
  }, []);

  // update user data
  handleSubmit = async (e) => {
    console.log("innnn");
    // e.preventDefault();
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
      dispatchDialogContext({ type: "USER_UPDATE" })
      localStorage.setItem("username", JSON.stringify(json["username"]))
      dispatch({ type: "SET_PROFILE", payload: {email: json["email"], username: json["username"]} })
    }
  };

  //update Password checkbox
  const showPasswordSection = (event) => {
    setShow(!isShow);
  };

  //dialog box
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function handleNav(update){
    setNav(update)
  }

  return (
    <div className="profile">
      <Navbar />
      <div className="bckgrnd-profile">
      {/* <div class="sidebar"> */}
  {/* <a class="active" onClick={() => handleNav('profile')}>My Profile</a>
  <a onClick={() => handleNav('post')}>My Posts</a> */}
{/* </div> */}

{/* <div class="content">    */}
{ nav === 'profile' ? 
<div>
<div className="t-left">
            {/* <div className="t-name">
              <span></span>
              <span> My Profile Page</span>
            </div> */}
          </div>
{profile ?  (
        <div className="test2" id='user_profile'>
          <div className="profile-cont">
            <div className="box-form-1">
              <div className="left">
                <div className="overlay">
                   
                <div className="post" id='user_posts'>
        <UserPosts />
      </div> 
                </div>
              </div>

              <div className="right">
                <form
                  id="submit_data"
                  className="login" >
                    <h1>USER DETAILS</h1>


                  <h2>Email:</h2>
                  <p>{profile?.email}</p>
                  <br></br>

                  <h2>Username:</h2>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}  />
                  <br></br>
                  {/* <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={showPasswordSection}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      }
                      label="Update My Password"
                    />
                  </FormGroup> */}

                  {/* {isShow ? 
                  ( */}
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
                  {/* ) : null} */}

                  <div className="profile-tab"> 
                    <ConditionalDialog className='btn-submit'
                      handleSubmit={handleSubmit} 
                      dialogButton="Submit"
                      dialogTitle="Update Profile" 
                      dialogMessage="Please confirm if you want to proceed to update your profile" 
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )  : (
        <ProgressBar />
      )}
  </div> 
  : 
  <div>
    
    </div>
}

  { userUpdate ?
    <NormalDialog 
    type="USER_UPDATE"
    dialogTitle="Update Successful"
    dialogMessage="Profile Updated Successfully"
    /> : null
  }
<Footer />
</div>
    </div>
  );
};

export default Profile;
