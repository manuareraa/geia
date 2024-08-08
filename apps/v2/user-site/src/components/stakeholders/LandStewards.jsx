import React from "react";
import { useNavigate } from "react-router-dom";

// Importing assets
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

function LandStewards() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center w-full p-8 bg-[#F9FAF6] lg:p-20">
      {/* Title */}
      <p className="text-[25px] md:text-[35px] lg:text-[45px] text-center lg:w-[1000px] md:w-[85%] w-[100%]">
        Let us pay for the regeneration work and you reap the benefits.
      </p>

      {/* Description */}
      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%] text-center text-2xl py-12">
        Using the Geoblocs system we restore the natural capital of a project
        and create blockchain verified tokens that can be embedded into goods or
        services to help offset their biosphere footprint. The landowner does
        not give up any sovereign rights.
      </p>
      <div className="divider"></div>

      {/* Trio container */}
      <div className="flex flex-col items-center justify-center w-full px-8 py-16 gap-8 lg:items-start lg:flex-row bg-[#B5BFA4] rounded-xl">
        <InfoCard
          imgSrc={paidRestore}
          title="Get Paid to Restore Your Land"
          description="Once the lands are restored all physical benefits go to the
            landowner in the form of produce and a healthy environment."
        />
        <InfoCard
          imgSrc={streamlinedProcess}
          title="Streamlined Process"
          description="Registration, monitoring, reporting, verification, and payment are
            streamlined to save you precious time."
        />
        <InfoCard
          imgSrc={efficiencyTechnology}
          title="Efficiency through Technology"
          description="Because most of the system is automated, Geoblocs is very efficient
            at turning money into regeneration."
        />
      </div>

      <p className="py-0 mt-6 text-3xl font-bold text-center">
        GEIA Farmer Process
      </p>

      <div className="divider w-[500px] items-center justify-center self-center"></div>

      <p className="font-light lg:w-[800px] w-[100%] md:w-[85%] text-center text-lg py-0">
        This flowchart gives an overview of the GEIA process for work with
        on-the-ground landowners. This process is under development and subject
        to change and may vary based on individual landowner needs and
        situations.
      </p>

      <p className="font-bold underline underline-offset-4 lg:w-[1200px] w-[100%] md:w-[85%] text-center text-lg py-6">
        *Landowners maintain all sovereign land rights throughout the entire
        process and into perpetuity.
      </p>

      {/* Flow dots outer container */}
      <div className="flex flex-row justify-center w-full mt-16 space-x-4">
        <div className="flex flex-col items-end space-y-28 lg:space-y-36">
          <FlowStep
            imgSrc={register}
            stepNumber="1"
            title="Register Project"
            entities={["Land Owner"]}
          />
          <FlowStep
            imgSrc={baseline}
            stepNumber="2"
            title="Establish Baseline"
            entities={["Land Owner", "GEIA", "Monitor"]}
          />
          <FlowStep
            imgSrc={logo}
            stepNumber="3"
            title="Create Geoblocs"
            entities={["GEIA"]}
          />
          <FlowStep
            imgSrc={sell}
            stepNumber="4"
            title="Sell Geoblocs"
            entities={["GEIA"]}
          />
          <FlowStep
            imgSrc={management}
            stepNumber="5"
            title="Implement Land Management"
            entities={["GEIA", "Farmer", "Monitor"]}
          />
          <FlowStep
            imgSrc={monitor}
            stepNumber="6"
            title="Monitor"
            entities={["GEIA", "Monitor", "Farmer"]}
          />
        </div>

        <img src={flowDots} className="h-[1200px]" alt="Flow dots" />

        <div className="flex flex-col items-start space-y-28 lg:space-y-36">
          {/* Placeholder for alignment */}
        </div>
      </div>

      {/* Call for registration container */}
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
            <img src={rightArrow} className="w-4" alt="Register" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Component for information cards
const InfoCard = ({ imgSrc, title, description }) => (
  <div className="flex flex-col items-center justify-center gap-4">
    <img src={imgSrc} className="w-36" alt={title} />
    <p className="text-lg font-bold text-center">{title}</p>
    <p className="font-medium lg:w-[375px] text-center">{description}</p>
  </div>
);

// Component for flow steps
const FlowStep = ({ imgSrc, stepNumber, title, entities }) => (
  <div className="flex flex-row items-center justify-start pt-2 space-x-3 lg:pt-0 md:pt-7">
    <div className="flex flex-col space-y-1">
      <p className="text-sm font-bold text-right lg:text-xl">{title}</p>
      <div className="flex flex-col items-end space-y-1 lg:flex-row lg:space-x-2 lg:space-y-0">
        {entities.map((entity, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center px-3 py-1 text-center rounded-lg w-fit bg-gGreen"
          >
            <p className="text-xs text-white">{entity}</p>
          </div>
        ))}
      </div>
    </div>
    <p className="text-3xl font-bold leading-none lg:text-6xl">{stepNumber}</p>
  </div>
);

export default LandStewards;
