import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { AppProvider } from "./AppContext";

import Home from "./pages/landing-site/Home";
import Stakeholders from "./pages/landing-site/Stakeholders";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stakeholders" element={<Stakeholders />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
