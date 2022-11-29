import React from "react";
import "../about/aboutlp.css";

export default function AboutLandingPage() {
  return (
    <section
      class="about"
      id="about"
      data-aos="fade-left"
      data-aos-duration="3000"
    >
      {/* <h1 class="headingabout"> about the app </h1> */}

      <div class="column">
        <div class="image"></div>

        <div class="contentabout">
          <h3 className="headeraboutus">
            About <span id="colortext"> Cryptown</span>
          </h3>
          <p id="lpparagraph">
            Launched in 2018, Cryptown provides comprehensive and details about
            cryptocurrency
            <br />
            With a core focus on sharing knowledge about cryptocurrency details
            and platforms
            <br />
            Experience the power of cryptocurrency today and discover more about
            crypto.
          </p>
        </div>
      </div>
    </section>
  );
}
