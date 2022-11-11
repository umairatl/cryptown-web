import React from "react";
import "../landingpage/aboutlp.css";
import tvimage from "../../asset/tv.png";



export default function AboutLandingPage() {
  return (


<section class="about" id="about">

    <h1 class="headingabout"> about the app </h1>

    <div class="column">

        <div class="image">
            {/* <img src={tvimage} alt=""/> */}
        </div>

        <div class="contentabout">
            <h3>Easy And Perfect Solution <span id="colortext">For Your Business App</span></h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit aperiam iure dolor hic aperiam.<br/> 
            Nulla placeat deserunt saepe repudiandae veniam soluta minima dolor hic  iure.  <br/> 
            Nulla placeat deserunt saepe repudiandae veniam soluta minima </p>
           
        </div>

    </div>

</section>



);
};