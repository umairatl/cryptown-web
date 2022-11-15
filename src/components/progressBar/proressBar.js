import React from "react";
import "../progressBar/progressBar.css";
import coin from "../../asset/progressBar.png";

const ProgressBar = () => {
  return (
    <div className="progress-col">
      <img src={coin} className="rotate" />
      <h1>Loading ...</h1>
    </div>
  );
};

export default ProgressBar;
