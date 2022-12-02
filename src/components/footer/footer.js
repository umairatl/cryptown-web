import "../footer/footer.css";
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import footerimg from "../../asset/Asset2.png";
import footerimgTwo from "../../asset/Asset5.png";
import footerimgapp from "../../asset/mobapp.png";

const Footer = () => {
  return (
    <div className="section1">
      <footer className="footer">
        <div className="container">
          <div className="" style={{ display: "flex" }}>
            <div className="footer-col">
              <img id="FOne" src={footerimg} alt="footerimg1" />
            </div>
            <div className="footer-col" style={{ textAlign: "center" }}>
              <h4>Company</h4>
              <ul id="footer-ul">
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our services</a>
                </li>
              </ul>
            </div>
            <div className="footer-col" style={{ textAlign: "center" }}>
              <h4>get help</h4>
              <ul id="footer-ul">
                <li>
                  <a>0136316723</a>
                </li>
                <li>
                  <a>cryptownweb@gmail.com</a>
                </li>
              </ul>
            </div>
            <div className="footer-col" style={{ textAlign: "center" }}>
              <h4>follow us</h4>
              <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=100088488904187&mibextid=ZbWKwL">
                  <FaFacebook />
                </a>
                <a href="https://www.youtube.com/channel/UC3tyXlq9YgEE7072Xrbmedg">
                  <FaYoutube />
                </a>
                <a href="https://www.instagram.com/cryptownweb/">
                  <FaInstagram />
                </a>
                <a href="https://twitter.com/CryptownWeb">
                  <FaTwitter />
                </a>
              </div>
              <a href="https://drive.google.com/drive/folders/1GZZzui-cKttbV-SfnR3IwTH5N_824cBo">
                <img alt="GoogleApp" src={footerimgapp} />
              </a>
            </div>
            <div className="footer-col">
              <img
                id="FTwo"
                src={footerimgTwo}
                alt="footerimg2"
                style={{ width: "70%", height: "30%" }}
              />
            </div>
          </div>
          <div className="copyright">© Cryptown. All Rights Reserved 2022</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
