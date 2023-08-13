import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/img/full-logo.png";
import rightArrow from "../assets/svg/right-arrow.svg";

function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading, loading } = useContext(AppContext);
  return (
    // outer container
    <div className="fixed z-20 flex flex-row items-center justify-between w-full p-4 bg-black/30">
      {/* first half */}
      {/* logo container */}
      <div>
        <img src={logo} className="w-56" />
      </div>

      {/* second half */}
      <div className="flex flex-row items-center space-x-16">
        {/* menu container */}
        <div className="flex flex-row items-center justify-between space-x-12 text-white">
          <p
            className={
              location.pathname === "/"
                ? "hover:underline-offset-4 hover:underline hover:cursor-pointer underline-offset-4 underline"
                : "hover:underline-offset-4 hover:underline hover:cursor-pointer"
            }
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <p
            className={
              location.pathname === "/stakeholders"
                ? "hover:underline-offset-4 hover:underline hover:cursor-pointer underline-offset-4 underline"
                : "hover:underline-offset-4 hover:underline hover:cursor-pointer"
            }
            onClick={() => navigate("/stakeholders")}
          >
            Stakeholders
          </p>
          <p
            className={
              location.pathname === "/case-studies"
                ? "hover:underline-offset-4 hover:underline hover:cursor-pointer underline-offset-4 underline"
                : "hover:underline-offset-4 hover:underline hover:cursor-pointer"
            }
            onClick={() => navigate("/case-studies")}
          >
            Case Studies
          </p>
          <p
            className={
              location.pathname === "/project-stories"
                ? "hover:underline-offset-4 hover:underline hover:cursor-pointer underline-offset-4 underline"
                : "hover:underline-offset-4 hover:underline hover:cursor-pointer"
            }
            onClick={() => navigate("/project-stories")}
          >
            Project Stories
          </p>
          <p
            className={
              location.pathname === "/team"
                ? "hover:underline-offset-4 hover:underline hover:cursor-pointer underline-offset-4 underline"
                : "hover:underline-offset-4 hover:underline hover:cursor-pointer"
            }
            onClick={() => navigate("/team")}
          >
            Team
          </p>
          <p
            className={
              location.pathname === "/contact"
                ? "hover:underline-offset-4 hover:underline hover:cursor-pointer underline-offset-4 underline"
                : "hover:underline-offset-4 hover:underline hover:cursor-pointer"
            }
            onClick={() => navigate("/contact")}
          >
            Contact
          </p>
        </div>

        {location.pathname.startsWith("/platform") ? (
          <button
            className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen outline-0 hover:bg-gGreen/60"
            onClick={() => {
              navigate("/login");
            }}
          >
            <div className="flex flex-row items-center space-x-4">
              <p>Login</p>
              <img src={rightArrow} className="w-4" />
            </div>
          </button>
        ) : (
          <button
            className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen outline-0 hover:bg-gGreen/60"
            onClick={() => {
              navigate("/platform/projects");
            }}
          >
            <div className="flex flex-row items-center space-x-4">
              <p>To Platform</p>
              <img src={rightArrow} className="w-4" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
