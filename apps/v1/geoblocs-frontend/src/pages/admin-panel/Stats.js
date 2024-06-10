import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";

function Stats(props) {
  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-row items-center justify-between px-32 space-x-8 pt-44">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px]">Admin Panel</p>
        </div>

        {/* right - logo container */}
        <img src={AdminLogo} alt="Admin Logo" className="w-[150px]"></img>
      </div>

      {/* buttons container */}
      <ButtonsContainer />

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-20 px-52">
        {/* title */}
        <div className="flex flex-col items-start w-full my-">
          <p className="text-3xl font-bold text-center">Stats</p>
        </div>
        <div className="mb-6 divider"></div>
        <p className="text-4xl font-black text-black/20">
          {"< "}Under Development{" / >"}
        </p>
      </div>
    </div>
  );
}

export default Stats;
