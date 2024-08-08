import React from "react";
import { useNavigate } from "react-router-dom";

// Importing assets
import rightArrow from "../assets/svg/right-arrow.svg";
import imageOne from "../assets/img/casestudies/11.png";

function CaseStudies() {
  const navigate = useNavigate();

  return (
    // Outer container
    <div className="flex flex-col justify-center w-full">
      {/* Title container */}
      <div className="flex flex-col items-center justify-center pt-16 space-y-8">
        {/* Title */}
        <p className="text-[33px] md:text-[50px] lg:text-[80px] font-bold">
          <span className="text-gGreen">Case</span> Studies
        </p>

        <div className="flex flex-col items-center justify-center py-8 space-y-16 lg:flex-row lg:space-x-12 lg:space-y-0 lg:px-40">
          <div className="flex flex-col items-center justify-center px-8 space-y-8 lg:px-0">
            <p className="text-3xl font-bold text-center">
              Learn more about how we work
            </p>
            <p className="lg:w-[85%] text-center lg:text-2xl text-xl font-light">
              All our projects focus on a holistic approach because without a
              symbiosis between the land and the people that rely on it, no
              amount of tree planting is going to help. So whether it's a sacred
              forest restoration in the Philippines using a mix of FMNR* and
              agroforestry, or re-wilding in the west of Ireland, we make sure
              that long-term viability is built into every project.
            </p>
            <p className="text-m">*Farmer Managed Natural Regeneration</p>
          </div>
          <img src={imageOne} className="lg:w-[40%] w-[80%]" alt="Case Study" />
        </div>

        {/* Title button */}
        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
          onClick={() => navigate("/platform/projects")}
        >
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" alt="Right Arrow" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full py-24">
        <p className="text-2xl font-bold">
          We are working on the case study reports. Come back soon.
        </p>
      </div>
    </div>
  );
}

export default CaseStudies;
