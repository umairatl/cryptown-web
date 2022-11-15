import React from "react";
import Who from "./who/who";
import HeaderLandingPage from "./landingpage";
import Navbar from "../../components/navbar/navbar";
import AboutLandingPage from "./about/aboutlp";
import Carousallp from "./carousell/carousellp";
import Footer from "../../components/footer/footer";


const MainLandingPage = () => {
  return (
    <section>
      <Navbar/>
      <HeaderLandingPage/>
      <Who/>
      <AboutLandingPage/>
      <Carousallp/>
      <Footer/>
      {/* <br></br> */}

     
    </section>
  );
};

export default MainLandingPage;