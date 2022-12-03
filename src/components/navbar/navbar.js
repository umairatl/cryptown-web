import React, { Component, useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import { useLogout } from '../../hooks/useLogout';
import '../navbar/navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from '../../hooks/useAuthContext';
import logo  from '../../asset/logoA.png'
import { useProfileContext } from '../../hooks/useProfileContext';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

const Navbar = () => {
  const { user } = useAuthContext();
  const { profile } = useProfileContext() 
  const [name, setName] = useState('');
  const { logout } = useLogout();

  useEffect(()  => {
    const updateName = localStorage.getItem('username');
    if (updateName){
      setName(updateName.slice(1, -1));
    }
  }, [])

      //logout user
  const handleClick = async () => {
    await logout();
  };

  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="top-up-wrap">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary='Cryptown Content'/>
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
      <Link to ='/market'>
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText >
              Market
              </ListItemText>
            </ListItemButton>
          </ListItem>
            </Link>

            { user && (
            <Link to ='/watchlist'>
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText  >
              Watchlist
              </ListItemText>
            </ListItemButton>
          </ListItem>
            </Link>
            )}
          
            <Link to ='/forum'>   
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText  >
              Forum
                </ListItemText>
            </ListItemButton>
          </ListItem>
            </Link>
            <Link to = '/news'>   
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText  >
              News
                </ListItemText>
            </ListItemButton>
          </ListItem>
            </Link>

            <Link to = '/appList'>  
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText  >
              Exchange
                </ListItemText>
            </ListItemButton>
          </ListItem>
          </Link>

          { user && (
          <Link to = '/profile'>  
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText  >
              My Profile
                </ListItemText>
            </ListItemButton>
          </ListItem>
          </Link>
)}

{ user && (
          <Link onClick={handleClick}>
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText  >
              Logout
                </ListItemText>
            </ListItemButton>
          </ListItem>
          </Link>
)}

{ !user && (
          <Link to = '/login'>
          <ListItem className="nav-side-item" disablePadding>
            <ListItemButton>
              <ListItemText>
              Login
                </ListItemText>
            </ListItemButton>
          </ListItem>
          </Link>
)}




      </List>
    </Box>
  );

    return (
      <div className='first-col'>
        <div className='web-navbar'>
        { user && (
          <nav className="nav-up">
          <ul>
         <Link to ='/market' className="nav-text"> 
         <img src = { logo } alt='CRYPTOWN' width='50%'/>
          </Link>
         </ul>
        <ul className="nav-right">
            <Link to ='/market' className="nav-text">  Market </Link>
            <Link to = '/watchlist' className="nav-text"> Watchlist </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
        </ul>
        <ul className="nav-right">
        <Link to = '/profile' className="nav-text">
            <FaUserCircle /> <span className='name-col'>{profile ? profile["username"] : name}</span>
        </Link>
        <Link onClick={handleClick} className="nav-text"> Logout </Link>
        </ul>
        </nav>
        )}

        { !user && (
        <nav className="nav-up">
        <Link to ='/market' className="nav-text"> 
         <img src = { logo } alt='CRYPTOWN'  width='60%'/>
        </Link>

        <ul className="nav-right">
            <Link to ='/market' className="nav-text">  Market </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
            <Link to = '/login' className="nav-text"> Login </Link>
          </ul>
       </nav>
        )}
</div>

<div className="nav-mobile">
      <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div className='flex-d-row jc-space-between'>

<div className='left-nav-mobile'>
         <span onClick={toggleDrawer(anchor, true)} className='btn-sidenav'> ≡ </span>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          </div>
<div><img src = { logo } alt='CRYPTOWN' width='50%'/>
</div>
</div>
        </React.Fragment>
      ))}
</div>
    </div>
    </div>
    )
  }

export default Navbar;