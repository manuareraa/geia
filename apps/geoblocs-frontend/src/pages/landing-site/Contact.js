import React from "react";
import { useNavigate } from "react-router-dom";

import rightArrow from "../../assets/svg/right-arrow.svg";

function Contact(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center w-full h-screen pt-[30vh] contact-page-bg">
      {/* title container */}
      <div className="lg:mx-60 flex flex-col items-center justify-center space-y-8 bg-[#656565]/80 p-24 rounded-2xl">
        {/* title */}
        <p className="font- text-[30px] text-white md:text-[36px] lg:text-[48px]">
          Contact
        </p>

        <p
          className="lg:w-[1200px] text-center text-3xl font-light text-white hover:cursor-pointer  md:text-xl lg:text-3xl"
          onClick={() => window.open("mailto:thomas@geia.ie")}
        >
          Email Us at{" "}
          <span className="font-bold">
            thomas@geia.ie
          </span>
        </p>
      </div>
      <div className="flex flex-col items-center w-full pt-16">
        {/* title button */}
        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gBlue"
          onClick={() => navigate("/platform/projects")}
        >
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>
    </div>
  );
}

export default Contact;
