import React from "react";

import fb from "../assets/svg/fb.svg";
import insta from "../assets/svg/insta.svg";
import linkedin from "../assets/svg/linkedin.svg";
import rightArrowG from "../assets/svg/right-arrow-g.svg";

function Footer(props) {
  return (
    <footer className="footer">
      {/* // outer footer container */}
      <div className="flex flex-col items-center justify-center w-full py-16 space-y-16 lg:space-y-0 lg:px-16 lg:flex-row lg:justify-between bg-gGreen">
        {/* join community */}
        <div className="flex flex-col space-y-8">
          <p className="text-3xl font-semibold text-white">
            Join Our Community
          </p>
          <div className="flex flex-row items-center justify-center space-x-8 lg:justify-start">
            <img src={fb} className="w-8 hover:cursor-pointer" />
            <img src={insta} className="w-8 hover:cursor-pointer" />
            <img src={linkedin} className="w-8 hover:cursor-pointer" />
          </div>
          <p className="w-full font-light text-center text-white lg:text-start">© 2022 GeoBlocs.com</p>
        </div>

        {/* get in touch */}
        <div className="flex flex-col items-center space-y-8 lg:items-end">
          <p className="text-3xl font-semibold text-white">Get In Touch</p>
          <button className="px-8 space-x-4 capitalize bg-white border-0 rounded-full text-gGreen btn hover:bg-white/80">
            <p>Mail Us</p>
            <img src={rightArrowG} className="w-4 text-gGreen" />
          </button>
          <p className="font-light text-white underline underline-offset-4">
            hello@geoblocs.com
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
