import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import rightArrow from "../../assets/svg/right-arrow.svg";
import buyers from "../../assets/svg/buyers.svg";
import stewards from "../../assets/svg/stewards.svg";
import scientists from "../../assets/svg/scientists.svg";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Buyers from "../../components/stakeholders/Buyers";
import LandStewards from "../../components/stakeholders/LandStewards";
import Scientists from "../../components/stakeholders/Scientists";

function Stakeholders(props) {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // outer container
    <div className="flex flex-col justify-center w-full">
        <Navbar />
      {/* title container */}
      <div className="flex flex-col items-center space-y-8 bg-stakeholders-image">
      {/* <div className="flex flex-col items-center justify-center h-screen space-y-8 bg-stakeholders-image"></div> */}
        {/* title */}
        <div className="glass rounded-lg mt-8 p-4 space-y-2 flex flex-col justify-center items-center mb-4">
        <p className="font- text-[33px] md:text-[50px] lg:text-[80px]">
          The Stakeholders
        </p>
        {/* title button */}
        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70 w-3/4 lg:w-1/3"
          onClick={() => navigate("/platform/projects")}
        >
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button>
        </div>

        {/* trio select container */}
        <div className="flex flex-row justify-center px-2 mt-40 space-x-4 lg:w-full lg:space-x-44 lg:px-8">
          <div
            className={
              section === 0
                ? "flex flex-col items-center space-y-8 rounded-xl rounded-b-none bg-white/80 px-6 py-6 hover:cursor-pointer lg:px-24 lg:py-16 w-1/3"
                : "flex flex-col items-center space-y-8 rounded-xl rounded-b-none bg-white/40 px-6 py-6 hover:cursor-pointer hover:bg-white/80 lg:px-24 lg:py-16 w-1/3"
            }
            onClick={() => setSection(0)}
          >
            <img src={buyers} className="w-14 lg:w-44" />
            <p className="font-bold text-md lg:text-l">Buyers</p>
          </div>
          <div
            className={
              section === 1
              ? "flex flex-col items-center space-y-8 rounded-xl rounded-b-none bg-white/80 px-6 py-6 hover:cursor-pointer lg:px-24 lg:py-16 w-1/3"
              : "flex flex-col items-center space-y-8 rounded-xl rounded-b-none bg-white/40 px-6 py-6 hover:cursor-pointer hover:bg-white/80 lg:px-24 lg:py-16 w-1/3"
            }
            onClick={() => setSection(1)}
          >
            <img src={stewards} className="w-14 lg:w-40" />
            <p className="font-bold text-center text-md lg:text-l">
              Land Stewards
            </p>
          </div>
          <div
            className={
              section === 2
              ? "flex flex-col items-center space-y-8 rounded-xl rounded-b-none bg-white/80 px-6 py-6 hover:cursor-pointer lg:px-24 lg:py-16 w-1/3"
              : "flex flex-col items-center space-y-8 rounded-xl rounded-b-none bg-white/40 px-6 py-6 hover:cursor-pointer hover:bg-white/80 lg:px-24 lg:py-16 w-1/3"
            }
            onClick={() => setSection(2)}
          >
            <img src={scientists} className="w-14 lg:w-44" />
            <p className="font-bold text-md lg:text-l">Network</p>
          </div>
        </div>
      </div>

      {/* body outer container */}
      {section === 0 ? (
        <Buyers />
      ) : section === 1 ? (
        <LandStewards />
      ) : section === 2 ? (
        <Scientists />
      ) : null}

      {/* footer */}
      <Footer />
    </div>
  );
}

export default Stakeholders;
