import React from "react";
import Who from "./who/who";
// import HeaderLandingPage from "./landingpage";
import Navbar from "../../components/navbar/navbar";
import AboutLandingPage from "./about/aboutlp";
import Carousallp from "./carousell/carousellp";
import Footer from "../../components/footer/footer";
import TeamCard from "./team/team";
import LpAnimation from "./HeaderAnimation/headeranimationlp";
import CustomerReview from "./customerreviews/customerfeedback";

const MainLandingPage = () => {
  return (
    <section>
      <Navbar />
      <LpAnimation />
      {/* <HeaderLandingPage/> */}
      <Who />
      <AboutLandingPage />
      <Carousallp />
      <TeamCard />
      <br />
      <CustomerReview />
      <Footer />
      {/* <br></br> */}
    </section>
  );
};

export default MainLandingPage;
