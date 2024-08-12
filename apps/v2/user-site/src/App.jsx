import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useStore } from "zustand";
import { useLoadingStore } from "./state-management/AppState";

import Home from "./pages/Home";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import CaseStudies from "./pages/CaseStudies";
import Contact from "./pages/Contact";
import ExploreProjects from "./pages/ExploreProjects";
import FAQs from "./pages/FAQs";
import HowItWorks from "./pages/HowItWorks";
import ProjectStories from "./pages/ProjectStories";
import Stakeholders from "./pages/Stakeholders";
import Team from "./pages/Team";
import ProjectView from "./pages/ProjectView";
import Wallet from "./pages/Wallet";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useStore(useLoadingStore);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {isLoading && <Loading />}
      <TopNavBar />
      <div className="flex-grow">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore-projects" element={<ExploreProjects />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/project-stories" element={<ProjectStories />} />
          <Route path="/stakeholders" element={<Stakeholders />} />
          <Route path="/team" element={<Team />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/project/view/:projectId" element={<ProjectView />} />
          <Route
            path="/project/view/:projectId/qr/sponsor/:sponsorId"
            element={<ProjectView />}
          />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
