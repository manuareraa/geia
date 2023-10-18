import React from "react";
import { useNavigate } from "react-router-dom";

import rightArrow from "../../assets/svg/right-arrow.svg";

function Contact(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center w-full h-screen contact-page-bg">
      {/* title container */}
      <div className="flex flex-col items-center justify-center space-y-8 pt-36">
        {/* title */}
        <p className="font- lg:text-[80px] text-[33px] md:text-[50px] text-white">
          Contact
        </p>

        <p
          className="pb-6 font-light text-center w-[1200px] lg:text-[20px] text-[15px] md:text-[17px]  hover:cursor-pointer text-white"
          onClick={() => window.open("mailto:thomas@geia.ie")}
        >
          Mail Us @{" "}
          <span className="font-bold underline underline-offset-4">
            thomas@geia.ie
          </span>
        </p>

        {/* title button */}
        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
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
