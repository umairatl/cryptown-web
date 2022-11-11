import React from "react";
import Who from "../components/landingpage/who";
import HeaderLandingPage from "../components/landingpage/landingpage";
import Navbar from "../components/navbar/navbar";
import AboutLandingPage from "../components/landingpage/aboutlp";
import Carousallp from "../components/landingpage/carousallp";
import Footer from "../components/footer/footer";


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