import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import Footer from "../../components/Footer";
import location from "../../assets/svg/location.svg";

function ExploreProjects(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const [projectCards, setProjectCards] = useState([]);
  const [recentProjectCards, setRecentProjectCards] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const renderProjectCards = async () => {
    console.log("exec rendercard");
    let tempArrayForProjectCards = [];
    let tempArrayForRecentProjectCards = [];
    setProjectCards([]);
    setRecentProjectCards([]);
    const recentProjects = appData.projects.sort(
      (a, b) => b.createdOn - a.createdOn,
    );
    console.log("recentProjects", recentProjects);
    recentProjects.forEach((project, index) => {
      console.log("project status", project.status, index);
      if (project.status === "live" && index >= 2) {
        console.log("adding new react");
        let projectCard = (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            className="w-[100%]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="flex h-full w-full max-w-[300px] flex-col space-y-3 rounded-2xl bg-gGray p-3 shadow-lg hover:cursor-pointer lg:w-[100%]"
              onClick={() => {
                setAppData((prevState) => {
                  return {
                    ...prevState,
                    projectInView: project,
                  };
                });
                navigate("/platform/projects/view/" + project.projectId);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={
                  project.metadata.coverImage
                    ? project.metadata.coverImage[0]
                    : sampleOne
                }
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <div className="flex flex-col justify-between h-full">
                <p className="px-2 text-lg font-bold">
                  {project.metadata.projectName}
                </p>
                <p className="px-2 pt-3 text-sm font-light">
                  {project.metadata.startedFrom}
                  {/* {new Date(project.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} */}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
        tempArrayForRecentProjectCards.push(projectCard);
        setRecentProjectCards(tempArrayForRecentProjectCards);
      }
    });
    appData.projects.forEach((project, index) => {
      if (project.status === "live") {
        let projectCard = (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            className="w-[100%]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="max-w-[300px]w-[300px] flex h-full w-full flex-col space-y-3 rounded-2xl bg-gGray p-3 shadow-lg hover:cursor-pointer lg:w-[100%]"
              onClick={() => {
                setAppData((prevState) => {
                  return {
                    ...prevState,
                    projectInView: project,
                  };
                });
                navigate("/platform/projects/view/" + project.projectId);
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={
                  project.metadata.coverImage
                    ? project.metadata.coverImage[0]
                    : sampleOne
                }
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <div className="flex flex-col justify-between h-full">
                <p className="px-2 text-lg font-bold">
                  {project.metadata.projectName}
                </p>
                <p className="px-2 pt-3 text-sm font-light">
                  {project.metadata.startedFrom}
                  {/* {new Date(project.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })} */}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
        tempArrayForProjectCards.push(projectCard);
        setProjectCards(tempArrayForProjectCards);
      }
    });
  };

  useEffect(() => {
    if (appData.projects.length > 0) {
      renderProjectCards();
    }
  }, [appData.projects]);

  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col items-center justify-between px-8 pt-36 lg:flex-row lg:items-start lg:space-x-8 lg:px-32">
        {/* left - title sub-container */}
        <div className="flex flex-col items-center space-y-4 lg:items-start">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-center text-[33px] leading-[50px] md:text-[50px] md:leading-[70px] lg:text-left lg:text-[80px] lg:leading-[95px]">
            Discover Our <br></br>{" "}
            <span className="font-bold text-gGreen">Transformative</span>{" "}
            <br></br> Projects
          </p>
        </div>

        {/* right - recent stories sub-container */}
        <div className="flex flex-col items-end self-center mt-20 space-y-4 lg:ml-12 lg:mt-0 lg:self-start">
          {recentProjectCards.length > 0 ? (
            <>
              <p className="self-center mb-4 text-3xl font-bold text-center lg:mb-0 lg:self-end">
                Recent Projects
              </p>
              <motion.div
                className={
                  recentProjectCards.length === 1
                    ? "grid grid-cols-1 grid-rows-1 gap-y-8 lg:grid-cols-1 lg:gap-x-8 lg:gap-y-0"
                    : "grid grid-cols-1 grid-rows-1 gap-y-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0"
                }
              >
                <AnimatePresence>{recentProjectCards}</AnimatePresence>
              </motion.div>
            </>
          ) : null}
        </div>
      </div>

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full px-8 my-24 mt-32 lg:px-52">
        {/* title */}
        <div className="flex flex-col items-center w-full pb-6 my-8 lg:items-start lg:pb-0">
          <p className="text-3xl font-bold text-center">All Projects</p>
        </div>
        {/* body */}
        {projectCards.length > 0 ? (
          <div className="grid w-full grid-cols-1 justify-items-center gap-y-8 md:grid-cols-2 lg:grid-cols-4 lg:justify-items-start lg:gap-x-8 lg:gap-y-0">
            <AnimatePresence>{projectCards}</AnimatePresence>
          </div>
        ) : (
          <div className="flex justify-center w-full ">
            <p className="p-4 px-8 text-xl font-bold text-center rounded-lg bg-gGray">
              Projects are being onboarded. Please check back later.
            </p>
          </div>
        )}

        {/* call for registration container */}
        <div className="flex flex-col mb-16 space-y-8 mt-44">
          <p className="text-4xl font-bold text-center">
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
      <Footer />
    </div>
  );
}

export default ExploreProjects;
