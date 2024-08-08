import React from "react";
import { useNavigate } from "react-router-dom";

// Importing assets
import rightArrow from "../assets/svg/right-arrow.svg";

function ProjectStories() {
  const navigate = useNavigate();

  return (
    // Outer container
    <div className="flex flex-col justify-center w-full">
      {/* Title container */}
      <div className="flex flex-col items-center justify-center px-8 pt-16 space-y-8 lg:px-32">
        {/* Title */}
        <p className="font-light text-center">
          Empowering Communities, Restoring Ecosystems
        </p>
        <p className="text-[33px] leading-[50px] text-center md:text-[50px] md:leading-[70px] lg:text-[80px] lg:leading-[95px] font-bold">
          Stories of <br />
          <span className="text-gGreen">Transformative</span> <br /> Projects
        </p>
      </div>

      {/* Project stories container */}
      <div className="flex flex-col items-center justify-center w-full px-8 my-24 mt-8 lg:mt-32 lg:px-52">
        <div className="flex justify-center w-full">
          <p className="p-4 px-8 text-xl font-bold text-center rounded-lg bg-gGray">
            Coming Soon
          </p>
        </div>

        {/* Call for registration container */}
        <div className="flex flex-col mt-12 mb-8 space-y-8 lg:mt-44 lg:mb-16">
          <p className="text-2xl font-bold text-center lg:text-4xl">
            Profit from Restoration: Earn while Healing the Land!
          </p>
          <div className="flex flex-col items-center justify-center">
            <button
              className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
              onClick={() => navigate("/contact")}
            >
              <p>Register Your Project</p>
              <img src={rightArrow} className="w-4" alt="Right Arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectStories;
