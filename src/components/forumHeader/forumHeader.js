import React from "react";
import "../forumHeader/forumHeader.css";
import videogif5 from "../../asset/forum.mp4";

const ForumHeaderSection = () => {
  return (
    <div
      className="allheaderforum"
      data-aos="fade-up"
      data-aos-anchor-placement="bottom-bottom">
      <video autoPlay loop muted id="videoforumid">
        <source type="video/mp4" src={videogif5} />
      </video>
    </div>
  );
};

export default ForumHeaderSection;
