import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img from "../../asset/signup.png";
import logo from "../../asset/Assetlogo.png";
import "../authLayout/authLayout.css";
import Login from "../../views/loginPage/login";
import Signup from "../../views/signupPage/signup";

const AuthLayout = () => {
  const [authType, setAuthType] = useState("login");

  useEffect(() => {
    const setAuthType1 = () => {
      setAuthType("login");
    };
    setAuthType1();
  }, []);

  //ui left side
  const toRotate = ["Traders!"];
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const period = 2000;

  const handleClick = (event, type) => {
    setAuthType(type);
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="back-1">
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>
              Hey{" "}
              <span className="txt-rotate" dataperiod="1000" ss>
                <span className="wrap">{text}</span>
              </span>
            </h1>
            <p>
              Welcome to Cryptown, <br></br> a place to explore and learn
              everything related to cryptocurrency{" "}
            </p>
            <div className="home-btn">
              <Link to="/">
                <p>Go to Cryptown! </p>
              </Link>
            </div>
            <img src={img} width="100%" />
          </div>
        </div>

        <div className="right">
          <img src={logo} width="80%" />
          {authType === "login" ? (
            <div>
              <Login />
              <p>
                Don't have an account?
                <a onClick={(event) => handleClick(event, "signup")}>
                  Create Your Account
                </a>
                it takes less than a minute
              </p>
            </div>
          ) : (
            <div>
              <Signup />
              <p>
                Already have an account?
                <a onClick={(event) => handleClick(event, "login")}>
                  Login into Your Account
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
