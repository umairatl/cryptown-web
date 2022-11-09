import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../navbar/navbar.css";
import { FaUserCircle } from "react-icons/fa";
import logoo from "../../Images/Assetlogo.png";

export class Navbar extends Component {
  render() {
    return (
      <div className="n-wrapper" id="Navbar">
     
      <div className="n-right">
        <div className="n-list">
        <ul style={{ listStyleType: "none" }}>
          
        {/* <Link to ='/' className="nav-text"> Cryptown LOGO </Link> */}
        <li>
          <img className="imageslogo" src={logoo} alt="logo" />
        </li>
        <li>
          <Link to ='/' className="nav-text">  Market </Link>
        </li>
        <li>
          <Link to ='/forum' className="nav-text">  Forum </Link>
        </li>
        <li>
          <Link to = '/news' className="nav-text">  News </Link>
        </li>
        <li>
          <Link to = '/appList' className="nav-text"> Exchange </Link>
        </li>
        <li id="stylenav-acc">
          <Link to = '/profile' id="stylingnav-account" className="nav-text" >
            <FaUserCircle />
          </Link>  
        </li>
        </ul>
        </div>
          
      </div>
    </div>
        
        
            
            
            
            
            

       
    );
  }
};

export default Navbar;
