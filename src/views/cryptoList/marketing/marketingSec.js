import React from "react";
import "../marketing/marketingsec.css";
import marketingimg from "../../../asset/marketing.png";
import brandingimg from "../../../asset/branding.png";
import mobileappimg from "../../../asset/mobileapp.png";
import webdesignimg from "../../../asset/webdesign.png";

const MarketingSection = () => {
  return (
    <section className="marketingservices">
      <div className="marketingcontainer">
        <div className="grid-wrapper">
          <div className="grid-box mobileapp">
            <img src={mobileappimg} alt="" />
            <h1>Mobile App</h1>
          </div>
          <div className="grid-box webdesign">
            <img src={webdesignimg} alt="" />
            <h1>Cryptocurrency</h1>
          </div>
          <div className="grid-box marketing">
            <img src={marketingimg} alt="" />
            <h1>Marketing</h1>
          </div>
          <div className="grid-box branding">
            <img src={brandingimg} alt="" />
            <h1>Branding</h1>
          </div>
        </div>
        <div className="services-content">
          {/* <div className="circle">
               <img src={cricles} alt=''/>
           </div> */}
          <h1>
            {" "}
            We Are Best <span id="colortext13"> Known For</span>
          </h1>
          <p>
            teaching how to trade cryptocurrencies. In order to start trading
            cryptocurrencies, one first needs adequate knowledge of the subject.
            It is also critical to know the associated risks and the laws that
            may apply based on one’s jurisdiction and decisions should be made
            accordingly
          </p>
          <p>
            The majority of cryptocurrency traders put their money into Bitcoin
            and Ether. However, trading utilizing technical indicators is
            possible because these cryptocurrencies move more predictably than
            smaller altcoins.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;
