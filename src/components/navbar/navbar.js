import React, { Component } from 'react';
import {
  Link,
} from "react-router-dom";
import '../navbar/navbar.css';
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from '../../hooks/useAuthContext';

const Navbar = () => {
    const { user } = useAuthContext()

    return (
      <div className='first-col'>
        { user && (
          <nav className="nav-up">
          <ul>
         <Link to ='/' className="nav-text"> Cryptown LOGO </Link>
         </ul>

            <ul className="nav-right">
            <Link to ='/' className="nav-text">  Market </Link>
            <Link to = '/watchlist' className="nav-text"> Watchlist </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
        </ul>
        <ul>
        <Link to = '/profile' className="nav-text">
            <FaUserCircle />
        </Link>
        </ul>
        </nav>
        )}

        { !user && (
        <nav className="nav-up">
        <ul>
       <Link to ='/' className="nav-text"> Cryptown LOGO </Link>
       </ul>

        <ul className="nav-right">
            <Link to ='/' className="nav-text">  Market </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
            <Link to = '/login' className="nav-text"> Login </Link>
          </ul>
       </nav>
        )}
    </div>
    )
  }

export default Navbar;