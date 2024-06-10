import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { AppProvider } from "./AppContext";

import Home from "./pages/landing-site/Home";
import Stakeholders from "./pages/landing-site/Stakeholders";
import CaseStudies from "./pages/landing-site/CaseStudies";
import ProjectStories from "./pages/landing-site/ProjectStories";
import Team from "./pages/landing-site/Team";
import Contact from "./pages/landing-site/Contact";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
        <Route path="*" element={<Home />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/project-stories" element={<ProjectStories />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
