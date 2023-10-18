import React from "react";
import { useNavigate } from "react-router-dom";

import rightArrow from "../../assets/svg/right-arrow.svg";
import paidRestore from "../../assets/svg/paid-restore.svg";
import streamlinedProcess from "../../assets/svg/streamlined-process.svg";
import efficiencyTechnology from "../../assets/svg/efficiency-technology.svg";
import flowDots from "../../assets/svg/flow-dots.svg";
import register from "../../assets/svg/register.svg";
import baseline from "../../assets/svg/baseline.svg";
import sell from "../../assets/svg/sell.svg";
import management from "../../assets/svg/management.svg";
import monitor from "../../assets/svg/monitor.svg";
import logo from "../../assets/img/full-logo.png";

function LandStewards(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="text-[25px] md:text-[35px] lg:text-[45px] text-center lg:w-[1000px] md:w-[85%] w-[100%]">
        Let us pay for the regeneration work and you reap the benefits.
      </p>

      {/* description */}
      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%]  text-center text-lg py-12">
        Using the Geoblocs system we restore the natural capitol of a project
        and create blockchain verified tokens that can be embedded into goods or
        services to help offset their biosphere footprint.The land owner does
        not give up any sovereign rights.
      </p>
      <div className="divider"></div>

      {/* trio container */}
      <div className="flex flex-col items-center justify-center w-full p-16 space-y-8 lg:items-start lg:flex-row lg:space-y-0 lg:space-x-20">
        {/* get paid to restore your land */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={paidRestore} className="w-36"></img>
          <p className="text-lg font-bold text-center underline">
            Get Paid to Restore Your Land
          </p>
          <p className="font-light w-[375px] text-center">
            Once the lands are restored all physical benefits go to the
            landowner in the form of produce and a healthy environment.
          </p>
        </div>

        {/* streamlined process */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={streamlinedProcess} className="w-36"></img>
          <p className="text-lg font-bold text-center underline">
            Streamlined Process
          </p>
          <p className="font-light w-[375px] text-center">
            Registration, monitoring, reporting, verification andpayment are
            streamlined to save you precious time.
          </p>
        </div>

        {/* efficiency through technology */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={efficiencyTechnology} className="w-36"></img>
          <p className="text-lg font-bold text-center underline">
            Efficiency through Technology
          </p>
          <p className="font-light w-[375px] text-center">
            Because most of the system is automated Geoblocs is very efficient
            at turning money into regeneration.
          </p>
        </div>
      </div>

      <p className="py-0 mt-6 text-3xl font-bold text-center">
        GEIA Farmer Process
      </p>

      <div className="divider w-[500px] items-center justify-center self-center"></div>

      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%]  text-center text-lg py-0">
        This flowchart gives an overview of the GEIA process for work with
        on-the-ground landowners. This process is under development and subject
        to change and may vary based on individual landowner needs and
        situations.
      </p>

      <p className="font-bold underline underline-offset-4 lg:w-[1200px]  w-[100%] md:w-[85%] text-center text-lg py-6">
        *Landowners maintain all sovereign land rights throughout the entire
        process and into perpetuity.
      </p>

      {/* flow dots outer container */}
      <div className="flex flex-row justify-center w-full mt-16 space-x-4">
        <div className="flex flex-col items-end space-y-28 lg:space-y-36">
          {/* register project */}
          <img src={register} className="w-8 mt-[140px] lg:mt-32 lg:w-16"></img>

          {/* Establish Baseline */}
          <div className="flex flex-row items-center justify-start pt-2 space-x-3 lg:pt-0">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold text-right lg:text-xl">
                Establish Baseline
              </p>
              <div className="flex flex-col items-end space-y-1 lg:flex-row lg:space-x-2 lg:space-y-0">
                <div className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Land Owner</p>
                </div>
                <div className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
                <div className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Monitor</p>
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold leading-none lg:text-6xl">2</p>
          </div>

          {/* create geoblocs */}
          <img src={logo} className="pt-2 lg:pt-0 lg:mt-32 w-36 lg:w-48"></img>

          {/* sell geoblocs */}
          <div className="flex flex-row items-center justify-start pt-10 space-x-3 lg:pt-0">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold text-right lg:text-xl">
                Sell Geoblocs
              </p>
              <div className="flex flex-row justify-end space-x-2 lg:justify-start">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold leading-none lg:text-6xl">4</p>
          </div>

          {/* management */}
          <img
            src={management}
            className="w-8 mt-[140px] lg:mt-32 lg:w-16 lg:pt-0 pt-10"
          ></img>

          {/* monitor */}
          <div className="flex flex-row items-center justify-start space-x-3 pt-7 lg:pt-0">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold text-right lg:text-xl">Monitor</p>
              <div className="flex flex-col items-end space-y-1 lg:items-start lg:flex-row lg:space-x-2 lg:space-y-0">
                <div className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
                <div className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Monitor</p>
                </div>
                <div className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Farmer</p>
                </div>
              </div>
            </div>
            <p className="text-3xl font-bold leading-none lg:text-6xl">6</p>
          </div>

          {/* end */}
        </div>

        <img src={flowDots} className="h-[1200px]"></img>

        <div className="flex flex-col items-start lg:space-y-36 space-y-28">
          {/* Register Project */}
          <div className="flex flex-row items-center justify-start space-x-3 lg:mt-32 mt-[115px]">
            <p className="text-3xl font-bold leading-none lg:text-6xl">1</p>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold text-left lg:text-xl">
                Register Project
              </p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Land Owner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Establish Baseline */}
          <img
            src={baseline}
            className="w-8 mt-[140px] lg:mt-32 lg:w-16 lg:pt-0 pt-8"
          ></img>

          {/* create geoblocs */}
          <div className="flex flex-row items-center justify-start mt-32 space-x-3 pt-11 lg:pt-0">
            <p className="text-3xl font-bold leading-none lg:text-6xl">3</p>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold text-left lg:text-xl">
                Create Geoblocs
              </p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
              </div>
            </div>
          </div>

          {/* sell geoblocs */}
          <img
            src={sell}
            className="w-8 mt-[140px] lg:mt-32 lg:w-16 lg:pt-0 pt-11"
          ></img>

          {/* management */}
          <div className="flex flex-row items-center justify-start pt-1 space-x-3 lg:mt-32 lg:pt-0">
            <p className="text-3xl font-bold leading-none lg:text-6xl">5</p>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-bold text-left lg:text-xl">
                Implement Land Management
              </p>
              <div className="flex flex-col space-y-1 lg:flex-row lg:space-x-2 lg:space-y-0">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Farmer</p>
                </div>
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Monitor</p>
                </div>
              </div>
            </div>
          </div>

          {/* monitor */}
          <img
            src={monitor}
            className="w-8 mt-[140px] lg:mt-32 lg:w-16 lg:pt-0 pt-2"
          ></img>

          {/* end */}
        </div>
      </div>

      {/* call for registration container */}
      <div className="flex flex-col mt-40 mb-24 space-y-8">
        <p className="text-2xl font-bold text-center lg:text-4xl">
          Profit from Restoration: Earn while Healing the Land!
        </p>
        <div className="flex flex-col items-center justify-center">
          <button
            className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
            onClick={() => navigate("/new-application")}
          >
            <p>Register Your Project</p>
            <img src={rightArrow} className="w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandStewards;
