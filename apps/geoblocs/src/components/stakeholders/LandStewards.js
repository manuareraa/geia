import React from "react";

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
  return (
    <div className="flex flex-col items-center justify-center w-full p-20 bg-gGreen/20">
      {/* title */}
      <p className="text-[45px] text-center w-[1000px]">
        Let us pay for the regeneration work and you reap the benefits.
      </p>

      {/* description */}
      <p className="font-light w-[800px] text-center text-lg py-12">
        Using the Geoblocs system we restore the natural capitol of a project
        and create blockchain verified tokens that can be embedded into goods or
        services to help offset their biosphere footprint.The land owner does
        not give up any sovereign rights.
      </p>
      <div className="divider"></div>

      {/* trio container */}
      <div className="flex flex-row items-start justify-center w-full p-16 space-x-20">
        {/* get paid to restore your land */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={paidRestore} className="w-36"></img>
          <p className="text-lg font-bold text-center ">
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
          <p className="text-lg font-bold text-center ">Streamlined Process</p>
          <p className="font-light w-[375px] text-center">
            Registration, monitoring, reporting, verification andpayment are
            streamlined to save you precious time.
          </p>
        </div>

        {/* efficiency through technology */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={efficiencyTechnology} className="w-36"></img>
          <p className="text-lg font-bold text-center ">
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

      <p className="font-light w-[1200px] text-center text-lg py-0">
        This flowchart gives an overview of the GEIA process for work with
        on-the-ground landowners. This process is under development and subject
        to change and may vary based on individual landowner needs and
        situations.
      </p>

      <p className="font-bold underline underline-offset-4 w-[1200px] text-center text-lg py-6">
        *Landowners maintain all sovereign land rights throughout the entire
        process and into perpetuity.
      </p>

      {/* flow dots outer container */}
      <div className="flex flex-row justify-center w-full mt-16 space-x-4">
        <div className="flex flex-col items-end space-y-36">
          {/* register project */}
          <img src={register} className="w-16 mt-32"></img>

          {/* Establish Baseline */}
          <div className="flex flex-row items-center justify-start space-x-3">
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold text-right">Establish Baseline</p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Land Owner</p>
                </div>
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Monitor</p>
                </div>
              </div>
            </div>
            <p className="text-6xl font-bold leading-none">2</p>
          </div>

          {/* create geoblocs */}
          <img src={logo} className="w-48 mt-32"></img>

          {/* sell geoblocs */}
          <div className="flex flex-row items-center justify-start space-x-3">
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold text-right">Sell Geoblocs</p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
              </div>
            </div>
            <p className="text-6xl font-bold leading-none">4</p>
          </div>

          {/* management */}
          <img src={management} className="w-16"></img>

          {/* monitor */}
          <div className="flex flex-row items-center justify-start space-x-3">
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold text-right">Monitor</p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Monitor</p>
                </div>
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Farmer</p>
                </div>
              </div>
            </div>
            <p className="text-6xl font-bold leading-none">6</p>
          </div>

          {/* end */}
        </div>

        <img src={flowDots} className="h-[1200px]"></img>

        <div className="flex flex-col items-start space-y-36">
          {/* Register Project */}
          <div className="flex flex-row items-center justify-start mt-32 space-x-3">
            <p className="text-6xl font-bold leading-none">1</p>
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold">Register Project</p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">Land Owner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Establish Baseline */}
          <img src={baseline} className="w-16"></img>

          {/* create geoblocs */}
          <div className="flex flex-row items-center justify-start mt-32 space-x-3">
            <p className="text-6xl font-bold leading-none">3</p>
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold">Create Geoblocs</p>
              <div className="flex flex-row space-x-2">
                <div className="flex flex-row px-3 py-1 text-center rounded-lg w-fit bg-gGreen">
                  <p className="text-xs text-white">GEIA</p>
                </div>
              </div>
            </div>
          </div>

          {/* sell geoblocs */}
          <img src={sell} className="w-16"></img>

          {/* management */}
          <div className="flex flex-row items-center justify-start mt-32 space-x-3">
            <p className="text-6xl font-bold leading-none">5</p>
            <div className="flex flex-col space-y-1">
              <p className="text-xl font-bold">Implement Land Management</p>
              <div className="flex flex-row space-x-2">
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
          <img src={monitor} className="w-16"></img>

          {/* end */}
        </div>
      </div>

      {/* call for registration container */}
      <div className="flex flex-col mt-40 mb-24 space-y-8">
        <p className="text-4xl font-bold">
          Profit from Restoration: Earn while Healing the Land!
        </p>
        <div className="flex flex-col items-center justify-center">
          <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
            <p>Register Your Project</p>
            <img src={rightArrow} className="w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandStewards;
