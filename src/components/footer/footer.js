import "../footer/footer.css";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FaFacebook , FaInstagram, FaYoutube, FaTwitter}from 'react-icons/fa';
import footerimg from "../../Images/Asset2.png";
import footerimgTwo from "../../Images/Asset5.png";


const Footer = () => {
  return (
     <div className="section1">
    <footer className="footer">
      <div className="container">
        <div className="" style={{display:'flex'}}>
          <div className="footer-col">
            <img id="FOne"src={footerimg} alt="footerimg1" />
          </div>
          <div className="footer-col" style={{textAlign:"center"}}>
            
            <h4>Company</h4>
            <ul id="footer-ul">
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">affiliate program</a>
              </li>
            </ul>
            
          </div>
          <div className="footer-col" style={{textAlign:"center"}}>
            <h4>get help</h4>
            <ul id="footer-ul">
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Default</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Email</a>
              </li>
            </ul>
          </div>
          <div className="footer-col" style={{textAlign:"center"}}>
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#">
                {/* <i className="fab fa-facebook-f"></i> */}
                <FaFacebook/>
              </a>
              <a href="#">
                {/* <i className="fab fa-twitter"></i> */}
                <FaYoutube/>
              </a>
              <a href="#">
                {/* <i className="fab fa-instagram"></i> */}
                <FaInstagram/>
              </a>
              <a href="#">
                {/* <i class='fab fa-linkedin-in fa-spin fa-3x'></i> */}
                <FaTwitter/>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <img id="FTwo" src={footerimgTwo} alt="footerimg2" />
          </div>

        </div>
        <div className="copyright">© Cryptown. All Rights Reserved 2022

        </div>
      </div>
      
    </footer>
    

    </div>
    
  );
};

export default Footer;
