import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../navbar/navbar.css";
import { FaUserCircle } from "react-icons/fa";
import logoo from "../../Images/translogo.png";

export class Navbar extends Component {
  render() {
    return (
      <div className='first-col'>
      <nav className="nav-up">
        <ul>
          <img
                className="logo"
                style={{ flex: 1, height: undefined, width: undefined }}
                resizeMode="contain"
                alt="logo"
                src={logoo}
              ></img>
        {/* <Link to ='/' className="nav-text"> Cryptown LOGO </Link> */}
        </ul>
        <ul className="nav-right">
            <Link to ='/' className="nav-text">  Market </Link>
            <Link to ='/forum' className="nav-text">  Forum </Link>
            <Link to = '/news' className="nav-text">  News </Link>
            <Link to = '/appList' className="nav-text"> Exchange </Link>
            <Link to = '/signup' className="nav-text"> Signup Test </Link>

        </ul>
        <ul>
        <Link to = '/profile' className="nav-text">
            <FaUserCircle />
        </Link>
        </ul>
      </nav>
    </div>
    )
  }
}

export default Navbar;
