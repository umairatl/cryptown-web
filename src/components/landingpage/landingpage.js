import "../landingpage/landingstyle.css";
import "../landingpage/textone.css";
import "../landingpage/typewritteranimation.css";
import "../landingpage/typewritter.js";

import phoneecrypto from "../../asset/phone.png";
import Typewritter from "../landingpage/typewritter.js";

export default function HeaderLandingPage() {
  return (
    <div className="">
        <section className="site-title">
              <div className="containercontent">
                {/* <div className="site-background" data-aos="fade-up" data-aos-delay="100"> */}
                    <span class="text">Cryptown</span>
                    <h1 id="landingheaderOne">The Best Collection of Crpyto Coins Where</h1>
                    {/* <h3>Amazing Platform</h3> */}
                     <Typewritter/>
                     <div className="buttoncentre">
                    <button className="btn">Explore More</button>
                    </div>
              </div>
               
              <div className="imagecoin">
                      <img src={phoneecrypto} alt="picture" />
              </div>
                
        </section>

    </div>

    

        

        
  );
}




   