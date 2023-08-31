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

  const renderProjectCards = async () => {
    let tempArrayForProjectCards = [];
    let tempArrayForRecentProjectCards = [];
    setProjectCards([]);
    setRecentProjectCards([]);
    const recentProjects = appData.projects
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0, 2);
    recentProjects.forEach((project, index) => {
      if (project.status === "live") {
        let projectCard = (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="h-full flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
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
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <div className="flex flex-col justify-between h-full">
                <p className="px-2 text-lg font-bold">
                  {project.metadata.projectName}
                </p>
                <p className="px-2 pt-3 text-sm font-light">
                  {new Date(project.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="h-full flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
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
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <div className="flex flex-col justify-between h-full">
                <p className="px-2 text-lg font-bold">
                  {project.metadata.projectName}
                </p>
                <p className="px-2 pt-3 text-sm font-light">
                  {new Date(project.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
      <div className="flex flex-row items-start justify-between px-32 pt-64 space-x-8">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px]">
            Discover Our <br></br>{" "}
            <span className="font-bold text-gGreen">Transformative</span>{" "}
            <br></br> Projects
          </p>
        </div>

        {/* right - recent stories sub-container */}
        <div className="flex flex-col items-end ml-12 space-y-4">
          {recentProjectCards.length > 0 ? (
            <>
              <p className="text-3xl font-bold text-center">Recent Projects</p>
              <motion.div
                className={`grid grid-cols-${recentProjectCards.length} grid-rows-1 gap-x-8`}
              >
                <AnimatePresence>{recentProjectCards}</AnimatePresence>
              </motion.div>
            </>
          ) : null}
        </div>
      </div>

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-32 px-52">
        {/* title */}
        <div className="flex flex-col items-start w-full my-8">
          <p className="text-3xl font-bold text-center">All Projects</p>
        </div>
        {/* body */}
        {projectCards.length > 0 ? (
          <div className="grid w-full grid-cols-4 gap-x-8">
            <AnimatePresence>{projectCards}</AnimatePresence>
          </div>
        ) : (
          <div className="flex justify-center w-full ">
            <p className="p-4 px-8 text-xl font-bold rounded-lg bg-gGray">
              Projects are being onboarded. Please check back later.
            </p>
          </div>
        )}

        {/* call for registration container */}
        <div className="flex flex-col mb-16 space-y-8 mt-44">
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
      <Footer />
    </div>
  );
}

export default ExploreProjects;
