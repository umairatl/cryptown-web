import React from "react";
import videoanimation from "../../../asset/intro.mp4";
import '../HeaderAnimation/headeranimation.css';




export default function LpAnimation() {
  // React.useEffect(()=>{
  //   let e=document.getElementById("myVideo");
  //   document.body.addEventListener("click",function a(){
  //     document.body.removeEventListener("click",a);
  //     e.play();
  //   })
  // },[])






  // const [is_mounted, setMounted] = React.useState(false)
  //   const video_ref = React.useRef();

  //   React.useEffect(() => {
  //       let timer_id;
  //       if (is_mounted && video_ref.current) {  
  //           timer_id = setTimeout((        video_ref.current.play(), 500))

  //       }
  //       setMounted(true);

  //       return () => clearTimeout(timer_id)
  //   }, [is_mounted])


  return (
    // <div className="App">
    //   <div className="video">
    //     {/* <video
    //     ref={video_ref}
    //     preload="auto"
    //       style={{ maxWidth: "1000%", width: "2380px", margin: "0 auto" }}
    //       playsInline={true}
    //       loop
    //       alt="All the devices"
    //       src={videoanimation}
    //       autoPlay
    //     />    */}

    // <iframe id="stylevideo" src={videoanimation}
    //     allowfullscreen="allowfullscreen"
    //     mozallowfullscreen="mozallowfullscreen" 
    //     msallowfullscreen="msallowfullscreen" 
    //     oallowfullscreen="oallowfullscreen" 
    //     webkitallowfullscreen="webkitallowfullscreen"

    // >
    // </iframe>
    // </div>
    // </div>
    <div className="jimvideo">
    <video autoPlay loop muted id="myVideo">
      
      <source type="video/mp4" src={videoanimation} />
   
      Your browser does not support HTML5 video.
    </video>

     <div class="buttonslp">
      <button id="lpheaderbutton">Learn More</button>
    </div>
    
    </div>
  );
}   
//     const [is_mounted, setMounted] = React.useState(false)
//     const video_ref = React.useRef();

// React.useEffect(() => {
//     let timer_id;
//     if (is_mounted && video_ref.current) {  
//         timer_id = setTimeout((        video_ref.current.play(), 500))

//     }
//     setMounted(true);

//     return () => clearTimeout(timer_id)
// }, [is_mounted])

//   return (
//     <div className="App">
//       <div>
//         <video
//         ref={video_ref}
//         preload="auto"
//           style={{ maxWidth: "1000%", width: "2380px", margin: "0 auto" }}
//           playsInline={true}
//           loop
//           alt="All the devices"
//           src={videoanimation}
//           autoPlay
//         />   
    