import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { AppProvider } from "./AppContext";

import { Button } from "@nextui-org/react";

import Home from "./pages/Home";

function App() {
  const location = useLocation();
  return (
    <AppProvider>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
