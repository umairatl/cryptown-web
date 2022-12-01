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
import validator from "validator"

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
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [error, setError] = useState(null);
  
  
  const navigate = useNavigate()

  const { user } = useAuthContext();
  const { profile, dispatch } = useProfileContext();
  const { userUpdate, dispatch: dispatchDialogContext } = useDialogContext() 
  const [value, setValue] = React.useState(0);
  var [nav, setNav]  = useState('profile');
  const { passwordUpdate, dispatch:dialogDispatch } = useDialogContext()
  const [passwordStrength, setPasswordStrength] = useState('')
  

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

      if (response.status === 200) {
        // setData(json);
        setUsername(json.username);
        dispatch({ type: "SET_PROFILE", payload: {email: json["email"], username: json["username"]} })
      }
    };

    if (user && !profile) {
      fetchUserProfile();
    } else {
      setUsername(profile["username"])
    }
  }, []);

  // update user data
  handleSubmit = async (e) => {
    try{
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
    } catch(error){
      console.log(error)
      dialogDispatch({type: "PASSWORD_UPDATE"})
      setError(error.response.data.error);
    
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

  let passwordRequirementMssg = `
  Password Requirements:
    1. Minimum 8 characters
    2. Minimum 1 number
    3. Minimum 1 symbol
    4. Minimum 1 Uppercase Letter
    5. Minimum 1 Lower Letter
`

  let password_requirement = { 
    minLength: 8, 
    minLowercase: 1, 
    minUppercase: 1, 
    minNumbers: 1, 
    minSymbols: 1, 
    returnScore: true, 
    pointsPerUnique: 1, 
    pointsPerRepeat: 0.5, 
    pointsForContainingLower: 10, 
    pointsForContainingUpper: 10, 
    pointsForContainingNumber: 10, 
    pointsForContainingSymbol: 10 
}

const onChangePassword = (password) => {
  setPassword(password)
  setPasswordStrength(validator.isStrongPassword(password, password_requirement))
}

const passwordScore = (passwordStrength) => {
  console.log(passwordStrength)
  if (passwordStrength < 50) {
    return (
      // <h1>Weak Password</h1>
      <span style={{display: "block", border: "0px", background: "red" ,width: "50px", height: "30px"}}/>
    )
  } else if (passwordStrength >= 50 && passwordStrength <= 60) {
    return (
      // <h1>Medium Password</h1>
      <span style={{display: "block", border: "0px", background: "yellow", width: "100px", height: "30px"}}/>
    )
  } else {
    return (
      // <h1>Strong Password</h1>
      <span style={{display: "block", border: "0px", background: "green", width: "150px", height: "30px"}}/>

    )
  }
}

  return (
    <div className="profile">
      <Navbar />
      <div className="bckgrnd-profile">
{ nav === 'profile' ? 
<div>
<div className="t-left">
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

                    {passwordUpdate ?
                    <NormalDialog 
                      type="PASSWORD_UPDATE"
                      dialogTitle='UPDATE PASSWORD FAILED'
                      dialogMessage={error === "Password is too weak" ?<div><b>{error}</b>{passwordRequirementMssg}</div> : error}
                      /> : null }
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
                    <div>
                      <div>
                        <h2>Password:</h2>
                        <div className='flex-pass'>
      <input type = {showPass ? 'text' : 'password'} placeholder='Create Password' onChange={(e) => onChangePassword(e.target.value)} value={password}/>
      <span className="material-symbols-outlined" onClick={(e) => setShowPass(!showPass)}> visibility </span></div>
      <div style={{textAlign: "left"}}>
        {password && passwordScore(passwordStrength)}
      </div>
                        <br></br>

                        <h2>Confirm Password:</h2>
                        <div className='flex-pass'>
      <input type = {showPass2 ? 'text' : 'password'} placeholder='Confirm Password' onChange={(e) => setConfirmPass(e.target.value)} value={confirmPass}/>
      <span className="material-symbols-outlined" onClick={(e) => setShowPass2(!showPass2)}> visibility </span></div>
     
                        <br></br>
                      </div>
                    </div>

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
