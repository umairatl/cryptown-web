import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="Intro" id="Intro">
      {/* //* left name side */}
      <div className="i-left">
        <div className="i-name">
          {/* yahan change hy darkmode ka */}
          <span>Hy! I Am</span>
          <span>Andrew Thomas</span>
          <span>
            Frontend Developer with high level of experience in web designing
            and development, producting the Quality work
          </span>
        </div>
        <Link to="/coinDetail" smooth={true} spy={true}>
          <button className="button i-button">Hire me</button>
        </Link>
      </div>
    </div>
  );
};

export default Intro;
