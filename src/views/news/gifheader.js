
import React, { useEffect, useRef } from "react";

import videogifnews from "../../asset/Rendertextblue.mp4";
import '../news/gifheader.css';


export default function NewsGif() {
  React.useEffect(()=>{
    let e=document.getElementById("myVideo2");
    document.body.addEventListener("click",function a(){
      document.body.removeEventListener("click",a);
      e.play();
    })
  },[])


return (

  <div className="jimvideo2">
    <video autoplay muted loop id="myVideo2">
      
      <source src={videogifnews} type="video/mp4"/>
   
      Your browser does not support HTML5 video.
    </video>
    
    </div>
  );
}   


  // const videoEl = useRef(null);

  // const attemptPlay = () => {
  //   videoEl &&
  //     videoEl.current &&
  //     videoEl.current.play().catch(error => {
  //       console.error("Error attempting to play", error);
  //     });
  // };

  // useEffect(() => {
  //   attemptPlay();
  // }, []);

  // return (
  //   <div className="AppAnimation2">
    /* <div>
        <video
          style={{ maxWidth: "1000%", width: "2380px", margin: "0 auto" }}
          playsInline={true}
          loop={true}
          alt="All the devicedsdsddadaasx"
          src={videogifnews}
          autoPlay='autoplay'
          ref={videoEl}
        />
      </div> */


      
//     </div>
//   );
// }