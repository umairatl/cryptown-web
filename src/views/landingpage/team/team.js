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
      <div
        className="lastlayercontainer"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <h3 className="headerteamm">
          Meet<span id="colortext4"> Our</span> Team
        </h3>
        <div className="lastlayer">
          <div className="cardmembers">
            <div
              classname="stylingcard"
              style={{ padding: "20px", textalign: "center", fontsize: "12px" }}
            >
              <h1>ADITYA</h1>
              <p>
                An excellent , open-minded trader/programmer that willing to
                consider all possible options.
              </p>
            </div>
            <div className="cover5">
              <div className="coverFront">
                <div className="coverFrontText">
                  <h3>ADITYA</h3>
                  <img src={adiimg} alt="" className="sh_img" />
                  <button className="sh_btn">Hover Me</button>
                </div>
              </div>
              <div className="coverBack"></div>
            </div>
          </div>
          <div className="cardmembers">
            <div
              classname="stylingcard"
              style={{ padding: "20px", textalign: "center", fontsize: "12px" }}
            >
              <h1>CLEMENT</h1>
              <p>
                A talented group leader/programmer with results oriented and
                pragmatic approaches. He is also the CEO for CRYPTOWN.
              </p>
            </div>
            <div className="cover5">
              <div className="coverFront">
                <div className="coverFrontText">
                  <h3>CLEMENT</h3>
                  <img src={clementimg} alt="" className="sh_img" />
                  <button className="sh_btn">Hover Me</button>
                </div>
              </div>
              <div className="coverBack"></div>
            </div>
          </div>
          <div className="cardmembers">
            <div
              classname="stylingcard"
              style={{ padding: "20px", textalign: "center", fontsize: "12px" }}
            >
              <h1>DERRICK</h1>
              <p>
                A designer & programmer demonstrates resourceful and ambitious
                at the same time finding solutions, get creative, and solve
                problems
              </p>
            </div>
            <div className="cover5">
              <div className="coverFront">
                <div className="coverFrontText">
                  <h3>DERRICK</h3>
                  <img src={derrickimg} alt="" className="sh_img" />
                  <button className="sh_btn">Hover Me</button>
                </div>
              </div>
              <div className="coverBack"></div>
            </div>
          </div>
          <div className="cardmembers">
            <div
              style={{ padding: "20px", textalign: "center", fontsize: "12px" }}
            >
              <h1>VERN</h1>
              <p>
                A designer & programmer that demonstrates an unwavering resolve
                to do whatever must be done to produce best long-term results.
              </p>
            </div>
            <div className="cover5">
              <div className="coverFront">
                <div className="coverFrontText">
                  <h3>VERN</h3>
                  <img src={vernimg} alt="" className="sh_img" />
                  <button className="sh_btn">Hover Me</button>
                </div>
              </div>
              <div className="coverBack"></div>
            </div>
          </div>
          <div className="cardmembers">
            <div
              classname="stylingcard"
              style={{ padding: "20px", textalign: "center", fontsize: "12px" }}
            >
              <h1>BEGUM</h1>
              <p>
                A driven & reliable programmer always working toward a new goal
                and trying to achieve more as well as helping others.
              </p>
            </div>
            <div className="cover5">
              <div className="coverFront">
                <div className="coverFrontText">
                  <h3>BEGUM</h3>
                  <img src={umaiimg} alt="" className="sh_img" />
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
};

export default TeamCard;
