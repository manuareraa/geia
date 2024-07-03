import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useStore } from "zustand";
import { useLoadingStore } from "./state-management/AppState";

import Home from "./pages/Home";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";

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
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
