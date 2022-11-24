import React from "react";
import "../marketing/marketingsec.css";
import marketingimg from "../../../asset/marketing.png";
import brandingimg from "../../../asset/branding.png";
import mobileappimg from "../../../asset/mobileapp.png";
import webdesignimg from "../../../asset/webdesign.png";
import cricles from "../../../asset/circle.svg";

const MarketingSection = () => {


    return (
        
        <section className="marketingservices">
            <div className="marketingcontainer">
                <div className="grid-wrapper">
                    
                        <div className="grid-box mobileapp">
                            <img src={mobileappimg} alt=""/>
                            <h1>Mobile App</h1>
                        </div>
                        <div className="grid-box webdesign">
                            <img src={webdesignimg} alt=""/>
                            <h1>Cryptocurrency</h1>
                        </div>
                        <div className="grid-box marketing">
                            <img src={marketingimg} alt=""/>
                            <h1>Marketing</h1>
                        </div>
                        <div className="grid-box branding">
                            <img src={brandingimg} alt=""/>
                            <h1>Branding</h1>
                        </div>
                </div>
            <div className="services-content"> 
            {/* <div className="circle">
                <img src={cricles} alt=''/>
            </div> */}
                    <h1> We Are Best <span id="colortext13"> Known For</span></h1> 
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                       when an unknown printer took a galley of type and scrambled it to make a type 
                       specimen book. It has survived not only five centuries, but also the leap into
                       electronic typesetting, remaining essentially unchanged. I</p> 
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                       Lorem Ipsum has been the i</p>
                    <a href="#" className="btn">Learn More</a>
            </div>
            </div>
            
        </section>

    );
}

export default MarketingSection;