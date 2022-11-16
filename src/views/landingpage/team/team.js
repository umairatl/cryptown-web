
import React from "react";
import "../../landingpage/team/team.css";
import derrickimg from "../../../asset/derrick.png";
import adiimg from "../../../asset/adi.png";
import clementimg from "../../../asset/clement.png";
import vernimg from "../../../asset/vern.png";
import umaiimg from "../../../asset/umai.png";






const TeamCard = () => {
  return (

<section id="lp">  
<div className="lastlayercontainer">
   <h3 className="headerteamm">Meet<span id="colortext4"> Our</span> Team</h3>
<div className="lastlayer">
  <div className="cardmembers">
      <div classname="stylingcard" style={{padding: "20px", textalign: "center", fontsize:"12px"}}>
         <h1>ADITYA</h1>
         <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
         </p>
         
      </div>
      <div className="cover5">
         <div className="coverFront">
            <div className="coverFrontText">
               <h3>ADITYA</h3>
               <img src={adiimg} alt="" className="sh_img"/>
               <button className="sh_btn">Hover Me</button>
            </div>
         </div>
         <div className="coverBack"></div>
      </div>
   </div>
   <div className="cardmembers">
      <div classname="stylingcard" style={{padding: "20px", textalign: "center", fontsize:"12px"}}>
         <h1>CLEMENT</h1>
         <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
         </p>
      </div>
      <div className="cover5">
         <div className="coverFront">
            <div className="coverFrontText">
               <h3>CLEMENT</h3>
               <img src={clementimg} alt="" className="sh_img"/>
               <button className="sh_btn">Hover Me</button>
            </div>
         </div>
         <div className="coverBack"></div>
      </div>
   </div>
   <div className="cardmembers">
      <div classname="stylingcard" style={{padding: "20px", textalign: "center", fontsize:"12px"}}>
         <h1>DERRICK</h1>
         <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
         </p>
      </div>
      <div className="cover5">
         <div className="coverFront">
            <div className="coverFrontText">
               <h3>DERRICK</h3>
               <img src={derrickimg} alt="" className="sh_img"/>
               <button className="sh_btn">Hover Me</button>
            </div>
         </div>
         <div className="coverBack"></div>
      </div>
   </div>
         <div className="cardmembers">
                  <div style={{padding: "20px", textalign: "center", fontsize:"12px"}}>
               <h1>VERN</h1>
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               </p>
            </div>
            <div className="cover5">
               <div className="coverFront">
                  <div className="coverFrontText">
                     <h3>VERN</h3>
                     <img src={vernimg} alt="" className="sh_img"/>
                     <button className="sh_btn">Hover Me</button>
                  </div>
               </div>
               <div className="coverBack"></div>
            </div>
         </div>
        <div className="cardmembers">
                     <div classname="stylingcard" style={{padding: "20px", textalign: "center", fontsize:"12px"}}>
                  <h1>BEGUM</h1>
                  <p>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  </p>
               </div>
               <div className="cover5">
                  <div className="coverFront">
                     <div className="coverFrontText">
                        <h3>BEGUM</h3>
                        <img src={umaiimg} alt="" className="sh_img"/>
                        <button className="sh_btn">Hover Me</button>
                     </div>
                  </div>
                  <div className="coverBack"></div>
               </div>
         </div>
   </div>
   </div>
</section>
 


);
}

export default TeamCard;