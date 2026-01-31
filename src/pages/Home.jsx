import React from "react";
import { Helmet } from "react-helmet";
import HeroBanner from '../components/Hero'


const Home = () => {
  return (
    <>
      <Helmet>
  <title>
    CampusHire | Smart Placement & TnP Management Platform
  </title>
  <meta
    name="description"
    content="CampusHire is a unified placement management platform designed for Training & Placement Cells. It enables smart opportunity discovery, resume-aware mock interviews, recruiter coordination, and data-driven student readiness insights."
  />
</Helmet>


      <HeroBanner />
      
      
       

    </>
  );
};

export default Home;
