import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useStore } from "zustand";
import { useLoadingStore, autoLogin } from "./state-management/AppState";

import Home from "./pages/Home";
import TopNavBar from "./components/TopNavBar";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Project from "./pages/Dashboard/Project";
import ProjectView from "./pages/Dashboard/ProjectView";
import ProtectedRoute from "./components/ProtectedRoute";
import NewProject from "./pages/NewProject";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading } = useStore(useLoadingStore);

  useEffect(() => {
    autoLoginUser();
  }, []);

  const autoLoginUser = async () => {
    navigate("/dashboard/projects");
    // const result = await autoLogin();
    // console.log("Auto login result: ", result);
    // if (result.status === "success") {
    //   navigate("/dashboard/projects");
    // } else {
    //   console.log("No token found. Please log in.");
    //   navigate("/");
    // }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {isLoading && <Loading />}
      <TopNavBar />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard/projects"
          element={<ProtectedRoute element={Project} />}
        />
        <Route
          path="/dashboard/projects/view/:projectId"
          element={<ProtectedRoute element={ProjectView} />}
        />
        <Route
          path="/dashboard/projects/new"
          element={<ProtectedRoute element={NewProject} />}
        />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
