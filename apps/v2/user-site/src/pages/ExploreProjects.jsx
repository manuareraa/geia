import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state-management/AppState"; // Import Zustand store
import rightArrow from "../assets/svg/right-arrow.svg";
import sampleOne from "../assets/test/sample-one.png";
import location from "../assets/svg/location.svg";

function ExploreProjects() {
  const navigate = useNavigate();
  const { projects, fetchProjectsSummary } = useUserStore();
  const [projectCards, setProjectCards] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (projects.length === 0) fetchProjectsSummary();
  }, []);

  useEffect(() => {
    console.log("Projects UE", projects);
    if (projects.length > 0) {
      renderProjectCards();
    }
  }, [projects]);

  const renderProjectCards = () => {
    console.log("exec rendercard");
    const tempArrayForProjectCards = projects.map((project, index) => {
      if (project.projectStatus === "inactive") {
        return (
          // <div
          //   key={index}
          //   className="flex flex-col space-y-3 rounded-2xl bg-gGray p-4 shadow-lg hover:cursor-pointer min-w-[50%] max-w-[100%] lg:min-w-[25%] lg:max-w-[32%]"
          //   onClick={() => {
          //     navigate("/project/view/" + project.projectId);
          //     window.scrollTo(0, 0);
          //   }}
          // >
          // <div
          //   key={index}
          //   className="flex flex-col p-4 space-y-3 shadow-lg rounded-2xl bg-gGray hover:cursor-pointer "
          //   onClick={() => {
          //     navigate("/project/view/" + project.projectId);
          //     window.scrollTo(0, 0);
          //   }}
          // >
          //   {/* Image container */}
          //   <img
          //     src={project.metaImages?.logo || sampleOne}
          //     className="object-cover w-full h-48 rounded-2xl"
          //     alt="Project"
          //   />
          //   {/* Text container */}
          //   <div className="flex flex-col justify-start">
          //     <p className="px-2 text-lg font-bold">{project.projectName}</p>
          //     <p className="px-2 pt-1 text-sm font-light">
          //       {project.metadata?.address || "No address provided"}
          //     </p>
          //   </div>
          // </div>
          <div
            key={index}
            className="flex flex-col p-4 space-y-3 transition-all duration-300 transform shadow-lg rounded-2xl bg-gGray hover:cursor-pointer hover:scale-105"
            onClick={() => {
              navigate("/project/view/" + project.projectId);
              window.scrollTo(0, 0);
            }}
          >
            {/* Image container */}
            <img
              src={project.metaImages?.logo || sampleOne}
              className="object-cover w-full h-48 rounded-2xl"
              alt="Project"
            />
            {/* Text container */}
            <div className="flex flex-col justify-start">
              <p className="px-2 text-lg font-bold">{project.projectName}</p>
              <p className="px-2 pt-1 text-sm font-light">
                {project.metadata?.address || "No address provided"}
              </p>
            </div>
          </div>
        );
      }
      return null;
    });
    setProjectCards(tempArrayForProjectCards);
  };

  useEffect(() => {
    console.log("Rendered Cards UE", projectCards);
  }, [projectCards]);

  return (
    <div className="flex flex-col justify-center w-full">
      {/* Title container */}
      <div className="flex flex-col items-center justify-center px-8 pt-16 lg:pt-36 lg:space-x-8 lg:px-32">
        {/* Sub title */}
        <p className="font-light text-center">
          Empowering Communities, Restoring Ecosystems
        </p>
        {/* Main title */}
        <p className="text-center text-[33px] leading-[50px] md:text-[50px] md:leading-[70px] lg:text-[80px] lg:leading-[95px] font-bold">
          Discover Our <br />
          <span className="text-gGreen">Transformative</span> <br />
          Projects
        </p>
      </div>

      {/* Project stories container */}
      <div className="flex flex-col items-center justify-center w-full px-8 my-24 mt-16 lg:mt-32 lg:px-52">
        {/* Title */}
        <div className="flex flex-col items-center w-full pb-6 my-8">
          <p className="text-3xl font-bold text-center">All Projects</p>
        </div>
        {/* Body */}
        {projectCards.length > 0 ? (
          // <div className="flex flex-col gap-x-8 gap-y-6 lg:w-full lg:flex-row lg:flex-wrap">
          //   {projectCards}
          // </div>
          // <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-8 md:grid-cols-3">
          //   {projectCards}
          // </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {projectCards}
          </div>
        ) : (
          <div className="flex justify-center w-full ">
            <p className="p-4 px-8 text-xl font-bold text-center rounded-lg bg-gGray">
              Projects are being onboarded. Please check back later.
            </p>
          </div>
        )}

        {/* Call for registration container */}
        <div className="flex flex-col mt-16 mb-16 space-y-8 lg:mt-44">
          <p className="text-4xl font-bold text-center mt-28">
            Profit from Restoration: Earn while Healing the Land!
          </p>
          <div className="flex flex-col items-center justify-center">
            <button
              className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
              onClick={() => navigate("/new-application")}
            >
              <p>Register Your Project</p>
              <img src={rightArrow} className="w-4" alt="Right Arrow" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreProjects;
