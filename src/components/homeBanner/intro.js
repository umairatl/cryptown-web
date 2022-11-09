import React from "react";
import { Link } from "react-router-dom";
import "../homeBanner/intro.css";
import phonee from "../../Images/phone.png";

const Intro = () => {
  return (
    <div className="Intro" id="Intro">
      {/* //* left name side */}
      <div className="i-left">
        <div className="i-name">
          
            <span>Best Platform For Beginners</span>
            <span>In Cryptocurrency</span>
            <span id="span-center">
              The best crypto we focus on markets where technology, innovation,
              and capital can unlock long-term value and drive economic growth
              for you and our company.
            </span>
          
        </div>
        <Link to="/coinDetail" smooth={true} spy={true}>
          <button className="button i-button">Learn More</button>
        </Link>
      </div>
      <div className="i-right">
        <img src={phonee} alt="picture" />
      </div>
    </div>
  );
};

export default Intro;
