import React from "react";
import "../who/who.css";

import { AiOutlineRocket } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import { ImBubbles2 } from "react-icons/im";

export default function Who() {
  return (
    <div className="section2">
      <h3 className="headersize" data-aos="fade-up" data-aos-duration="3000">
        Our Core<span id="colortext2"> Values</span>
      </h3>
      <section
        className="section1who"
        data-aos="fade-up"
        data-aos-duration="3000"
      >
        <div className="container1">
          <div className="card">
            <div className="icon">
              {/* <ion-icon name="globe"></ion-icon>         */}
              <FaGlobeAmericas style={{ color: "white", fontSize: "100px" }} />
              <div className="content">
                <h2 id="cardheader">Connection</h2>
                <p id="pheader">
                  Teamwork and mutual trust are the foundations of connection in
                  workplace, finding common ground of others’ ideas, ambitions,
                  histories, and beliefs.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <AiOutlineRocket style={{ color: "white", fontSize: "100px" }} />

              <div className="content">
                <h2 id="cardheader">Integrity</h2>
                <p id="pheader">
                  We believe that nothing is more important than our reputation,
                  and behaving with the highest levels of integrity is
                  fundamental to who we are.
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <ImBubbles2 style={{ color: "white", fontSize: "100px" }} />
              <div className="content">
                <h2 id="cardheader">Service</h2>
                <p id="pheader">
                  Being service-minded or customer-oriented means that you care
                  about providing a quality experience to the clients you serve.{" "}
                </p>
              </div>
            </div>
          </div>
          {/* <img id="I1" src={image4} alt="img1" /> */}
        </div>
      </section>
    </div>
  );
}
