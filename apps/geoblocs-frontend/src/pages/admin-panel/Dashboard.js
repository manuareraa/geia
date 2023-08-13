import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import location from "../../assets/svg/location.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";

function Dashboard(props) {
  const navigate = useNavigate();
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

     <ButtonsContainer />
    </div>
  );
}

export default Dashboard;
