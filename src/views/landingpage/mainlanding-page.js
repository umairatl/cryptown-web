import React from "react";
import { useEffect } from "react";
import ReactGA from "react-ga";
// import { googleAnalyticsActions } from "../../utils/google-analytics/google-analytics-init";
// import { webVitalActions } from "../../utils/google-analytics/google-analytics-get-web-vitals.js";
import Who from "./who/who";
// import HeaderLandingPage from "./landingpage";
import Navbar from "../../components/navbar/navbar";
import AboutLandingPage from "./about/aboutlp";
import Carousallp from "./carousell/carousellp";
import Footer from "../../components/footer/footer";
import TeamCard from "./team/team";
import LpAnimation from "./HeaderAnimation/headeranimationlp";
import CustomerReview from "./customerreviews/customerfeedback";
import Counter from "../appList/counterSec/counter";

const MainLandingPage = () => {
  return (
    <section>
      <Navbar />
      <LpAnimation />
      {/* <HeaderLandingPage/> */}
      <Counter/>
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
