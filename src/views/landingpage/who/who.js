import React from "react";
import "../who/who.css";

import { AiOutlineRocket } from 'react-icons/ai';
import {FaGlobeAmericas} from 'react-icons/fa';
import {ImBubbles2} from 'react-icons/im';





export default function Who() {
  return (
        <div className="section2">
            <h3 className="headersize">Our Core<span id="colortext2"> Values</span></h3>
        <section className="section1">
            <div className="container1">
                <div className="card">
                    <div className="icon">
                        {/* <ion-icon name="globe"></ion-icon>         */}
                        <FaGlobeAmericas style={{color:"white", fontSize:"100px"}}/>
                    <div className="content">
                        <h2 id="cardheader">Card One</h2>
                        <p id="pheader">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                      
                        <AiOutlineRocket style={{color:"white", fontSize:"100px"}}/>
                   
                    <div className="content">
                        
                        <h2 id="cardheader">Card Two</h2>
                        <p id="pheader">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                   
                    </div>
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                        <ImBubbles2 style={{color:"white", fontSize:"100px"}}/>
                    <div className="content">
                        
                        <h2 id="cardheader">Card Three</h2>
                        <p id="pheader">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    
                    </div>
                    </div>
                </div>
                {/* <img id="I1" src={image4} alt="img1" /> */}
            </div>

        </section>
        </div>
);
};
