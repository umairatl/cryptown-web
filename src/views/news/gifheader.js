import React, { useEffect, useRef } from "react";

import videogifnews from "../../asset/Rendertextblue.mp4";
import "../news/gifheader.css";

export default function NewsGif() {
  return (
    <div className="jimvideo2">
      <video autoPlay loop muted id="myVideo2">
        <source type="video/mp4" src={videogifnews} />
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
