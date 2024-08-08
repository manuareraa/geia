import React from "react";
import { useNavigate } from "react-router-dom";

// Importing assets
import rightArrow from "../assets/svg/right-arrow.svg";

function Contact() {
  const navigate = useNavigate();

  return (
    // Outer container
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col items-center h-screen pt-[20vh] contact-page-bg">
        {/* Title container */}
        <div className="flex flex-col items-center justify-center w-11/12 p-16 space-y-8 glass lg:mx-60 lg:p-24 rounded-2xl lg:w-1/2">
          <p className="text-[30px] text-white md:text-[36px] lg:text-[48px] font-bold">
            Contact
          </p>
          <p
            className="lg:w-[1200px] text-center text-3xl font-light text-white cursor-pointer md:text-xl lg:text-3xl"
            onClick={() => window.open("mailto:thomas@geia.ie")}
          >
            Email Us at <span className="font-bold">thomas@geia.ie</span>
          </p>
        </div>
        <div className="flex flex-col items-center w-full pt-16">
          {/* Title button */}
          <button
            className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
            onClick={() => navigate("/explore-projects")}
          >
            <p>Explore Projects</p>
            <img src={rightArrow} className="w-4" alt="Right Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
