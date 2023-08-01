import React from "react";

import rightArrow from "../../assets/svg/right-arrow.svg";

function Stakeholders(props) {
  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col items-center justify-center pt-48 space-y-8">
        <p className="font- text-[80px]">The Stakeholders</p>
        <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
          <p>Subscribe</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>
    </div>
  );
}

export default Stakeholders;
