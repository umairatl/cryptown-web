import React from "react";
import videoanimation from "../../../asset/intro.mp4";
import "../HeaderAnimation/headeranimation.css";
import { Link } from "react-router-dom";
import Navbar from "../../../components/navbar/navbar";

export default function LpAnimation() {
  return (
    <div className="jimvideo">
      <Navbar />

      <video autoPlay loop muted id="myVideo">
        <source type="video/mp4" src={videoanimation} />
        Your browser does not support HTML5 video.
        <div className="bckg-vid-nav"></div>
      </video>

      <Link to="/market">
        <button id="lpheaderbutton">Learn More</button>
      </Link>
    </div>
  );
}
