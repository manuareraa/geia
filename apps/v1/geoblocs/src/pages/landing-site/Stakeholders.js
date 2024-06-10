import React, { useState } from "react";

import rightArrow from "../../assets/svg/right-arrow.svg";
import buyers from "../../assets/svg/buyers.svg";
import stewards from "../../assets/svg/stewards.svg";
import scientists from "../../assets/svg/scientists.svg";

import Footer from "../../components/Footer";
import Buyers from "../../components/stakeholders/Buyers";
import LandStewards from "../../components/stakeholders/LandStewards";
import Scientists from "../../components/stakeholders/Scientists";

function Stakeholders(props) {
  const [section, setSection] = useState(0);

  return (
    // outer container
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col items-center justify-center pt-64 space-y-8">
        {/* title */}
        <p className="font- text-[80px]">The Stakeholders</p>
        {/* title button */}
        <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>

      {/* trio select container */}
      <div className="flex flex-row items-end justify-center w-full px-8 mt-40 space-x-44">
        <div
          className={
            section === 0
              ? "flex flex-col items-center justify-center px-24 py-16 space-y-8 rounded-tl-lg rounded-tr-lg bg-gGreen/20 hover:cursor-pointer"
              : "flex flex-col items-center justify-center px-24 py-16 space-y-8 rounded-tl-lg rounded-tr-lg hover:bg-gGreen/20 hover:cursor-pointer"
          }
          onClick={() => setSection(0)}
        >
          <img src={buyers} className="w-44" />
          <p className="text-xl font-bold">Buyers</p>
        </div>
        <div
          className={
            section === 1
              ? "flex flex-col items-center justify-center px-24 py-16 space-y-8 rounded-tl-lg rounded-tr-lg bg-gGreen/20 hover:cursor-pointer"
              : "flex flex-col items-center justify-center px-24 py-16 space-y-8 rounded-tl-lg rounded-tr-lg hover:bg-gGreen/20 hover:cursor-pointer"
          }
          onClick={() => setSection(1)}
        >
          <img src={stewards} className="w-44" />
          <p className="text-xl font-bold">Land Stewards</p>
        </div>
        <div
          className={
            section === 2
              ? "flex flex-col items-center justify-center px-24 py-16 space-y-8 rounded-tl-lg rounded-tr-lg bg-gGreen/20 hover:cursor-pointer"
              : "flex flex-col items-center justify-center px-24 py-16 space-y-8 rounded-tl-lg rounded-tr-lg hover:bg-gGreen/20 hover:cursor-pointer"
          }
          onClick={() => setSection(2)}
        >
          <img src={scientists} className="w-44" />
          <p className="text-xl font-bold">Scientists</p>
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
