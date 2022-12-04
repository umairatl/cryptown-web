import React from "react";
import "../homeBanner/intro.css";
import phonee from "../../asset/mobile_cryptown.png";

const Intro = () => {
  return (
    <div className="Intro" id="Intro">
      <div className="i-left">
        <div className="i-name" data-aos="fade-right" data-aos-duration="3000">
          <span>Best Platform For Beginners</span>
          <span>In Cryptocurrency</span>
          <span id="span-center">
            The best crypto we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth for
            you and our company.
          </span>
        </div>
        <a href="#marketlist">
          <button id="coinheaderbutton">market Coins</button>
        </a>
      </div>
      <div className="i-right" data-aos="fade-left" data-aos-duration="3000">
        <img src={phonee} alt="picture" />
      </div>
    </div>
  );
};

export default Intro;
