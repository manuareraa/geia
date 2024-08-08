import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Importing assets
import rightArrow from "../assets/svg/right-arrow.svg";
import buyers from "../assets/svg/buyers.svg";
import stewards from "../assets/svg/stewards.svg";
import scientists from "../assets/svg/scientists.svg";

// Importing stakeholder components
import Buyers from "../components/stakeholders/Buyers";
import LandStewards from "../components/stakeholders/LandStewards";
import Scientists from "../components/stakeholders/Scientists";

function Stakeholders() {
  const navigate = useNavigate();
  const [section, setSection] = useState(0);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Outer container
    <div className="flex flex-col justify-center w-full">
      {/* Title container */}
      <div className="flex flex-col items-center space-y-8 bg-stakeholders-image">
        <div className="flex flex-col items-center justify-center p-4 mt-8 mb-4 space-y-2 rounded-lg glass">
          <p className="font- text-[33px] md:text-[50px] lg:text-[80px]">
            The Stakeholders
          </p>
          <button
            className="w-3/4 px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70 lg:w-1/3"
            onClick={() => navigate("/platform/projects")}
          >
            <p>Explore Projects</p>
            <img src={rightArrow} className="w-4" />
          </button>
        </div>

        {/* Trio select container */}
        <div className="flex flex-row justify-center px-2 mt-40 space-x-4 lg:w-full lg:space-x-44 lg:px-8">
          <SelectionCard
            imgSrc={buyers}
            title="Buyers"
            isActive={section === 0}
            onClick={() => setSection(0)}
          />
          <SelectionCard
            imgSrc={stewards}
            title="Land Stewards"
            isActive={section === 1}
            onClick={() => setSection(1)}
          />
          <SelectionCard
            imgSrc={scientists}
            title="Network"
            isActive={section === 2}
            onClick={() => setSection(2)}
          />
        </div>
      </div>

      {/* Body outer container */}
      {section === 0 && <Buyers />}
      {section === 1 && <LandStewards />}
      {section === 2 && <Scientists />}
    </div>
  );
}

// Component for selection cards
const SelectionCard = ({ imgSrc, title, isActive, onClick }) => (
  <div
    className={`flex flex-col items-center space-y-8 rounded-xl rounded-b-none px-6 py-6 hover:cursor-pointer ${
      isActive ? "bg-white/80" : "bg-white/40 hover:bg-white/80"
    } lg:px-24 lg:py-16 w-1/3`}
    onClick={onClick}
  >
    <img src={imgSrc} className="w-14 lg:w-44" />
    <p className="font-bold text-md lg:text-l">{title}</p>
  </div>
);

export default Stakeholders;
