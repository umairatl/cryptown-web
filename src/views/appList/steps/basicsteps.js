import React from "react";
import "../steps/basicsteps.css";

const BasicSteps = () => {
  return (
    <div className="exlistsection">
      <h3
        className="textelheader2"
        data-aos="fade-down"
        data-aos-duration="3000">
        Start Taking <span id="colortext11"> Basic Steps</span>
      </h3>

      <div
        className="containerexlist"
        data-aos="fade-up"
        data-aos-duration="3000">
        <div className="boxexchangelist">
          <div className="iconexchangelist">01</div>
          <div className="contentforexlist">
            <h3>Choose</h3>
            <p>
              Choose which cryptocurrency exchange you want to use. Your best
              bet is a reputable, well-known exchange with a large selection of
              currencies.
            </p>
          </div>
        </div>
        <div className="boxexchangelist">
          <div className="iconexchangelist">02</div>
          <div className="contentforexlist">
            <h3>Decide</h3>
            <p>
              Decide which cryptocurrency you want to buy. You can choose to
              invest in one or many cryptocurrencies. Research your options to
              help you decide.
            </p>
          </div>
        </div>
        <div className="boxexchangelist">
          <div className="iconexchangelist">03</div>
          <div className="contentforexlist">
            <h3>Place</h3>
            <p>
              Place a buy order for your chosen cryptocurrency. Follow the steps
              required by the exchange to submit and complete a buy order for
              one or more cryptocurrencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicSteps;
