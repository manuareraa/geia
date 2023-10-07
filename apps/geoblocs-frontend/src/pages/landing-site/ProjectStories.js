import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import Footer from "../../components/Footer";
import { toast } from "react-hot-toast";

function ProjectStories(props) {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();
  const [storyCards, setStoryCards] = useState([]);
  const [recentStoryCards, setRecentStoryCards] = useState([]);
  const [storyInView, setStoryInView] = useState([]);

  const renderStoryCards = async () => {
    let tempArrayForStoryCards = [];
    let tempArrayForRecentStoryCards = [];
    setStoryCards([]);
    setRecentStoryCards([]);
    const recentProjects = appData.projects
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0, 2);
    recentProjects.forEach((project) => {
      if (project.story.length !== 0) {
        let storyCard = (
          <motion.div
            key={1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            className="w-[100%]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="h-full flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer lg:w-[100%] w-[100%] max-w-[300px]"
              onClick={() => {
                setStoryInView(project.story);
                window.my_modal_1.showModal();
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
                  {project.story[0].content}
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
        tempArrayForRecentStoryCards.push(storyCard);
        setRecentStoryCards(tempArrayForRecentStoryCards);
      }
    });
    appData.projects.forEach((project) => {
      if (project.story.length !== 0) {
        let storyCard = (
          <motion.div
            key={1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            className="w-[100%]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="h-full flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer lg:w-[100%] w-full max-w-[300px]"
              onClick={() => {
                setStoryInView(project.story);
                window.my_modal_1.showModal();
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
                  {project.story[0].content}
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
        tempArrayForStoryCards.push(storyCard);
        setStoryCards(tempArrayForStoryCards);
      }
    });
  };

  useEffect(() => {
    if (appData.projects.length > 0) {
      renderStoryCards();
    }
  }, [appData.projects]);

  useEffect(() => {
    console.log(storyInView);
  }, [storyInView]);

  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col items-start justify-between px-8 pt-64 lg:px-32 lg:flex-row lg:space-x-8">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-left">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- lg:text-[80px] text-[33px] md:text-[50px] lg:leading-[95px] md:leading-[70px] leading-[50px] ">
            Stories of <br></br>{" "}
            <span className="font-bold text-gGreen">Transformative</span>{" "}
            <br></br> Projects
          </p>
        </div>

        {/* right - recent stories sub-container */}
        <div className="flex flex-col self-center mt-16 space-y-4 lg:mt-0 lg:ml-12 lg:items-end">
          {recentStoryCards.length > 0 ? (
            <>
              <p className="text-xl font-bold text-center lg:text-3xl">
                Recent Stories
              </p>
              <motion.div className="grid grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 lg:gap-x-8 gap-y-8 lg:gap-y-0">
                <AnimatePresence>{recentStoryCards}</AnimatePresence>
              </motion.div>
            </>
          ) : null}
        </div>
      </div>

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full px-8 my-24 mt-32 lg:px-52">
        {/* title */}
        <div className="flex flex-col items-start w-full my-8">
          <p className="self-center text-3xl font-bold text-center lg:self-start">
            All Stories
          </p>
        </div>
        {/* body */}
        {storyCards.length > 0 ? (
          <div className="grid w-full grid-cols-1 lg:grid-cols-4 lg:gap-x-8 justify-items-center lg:justify-items-start gap-y-8 lg:gap-y-0">
            <AnimatePresence>{storyCards}</AnimatePresence>
          </div>
        ) : (
          <div className="flex justify-center w-full ">
            <p className="p-4 px-8 text-xl font-bold text-center rounded-lg bg-gGray">
              Stories are being written. Please come back later.
            </p>
          </div>
        )}

        {/* call for registration container */}
        <div className="flex flex-col mb-16 space-y-8 mt-44">
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

      {/* // story view modal */}
      <dialog
        id="my_modal_1"
        className="items-start w-full py-16 overflow-auto px-28 modal bg-gGreen/20"
      >
        <div method="dialog" className="w-full p-12 bg-white rounded-3xl">
          {/* body goes here */}
          <div className="flex flex-col w-full space-y-4">
            <div className="flex flex-row items-center justify-between w-full">
              <p className="text-4xl font-bold text-center">Project Story</p>
              <div className="flex flex-row items-center space-x-8">
                <button
                  className="text-lg text-white capitalize border-2 btn border-gGreen bg-gGreen hover:border-2 hover:border-gGreen hover:bg-gGreen"
                  onClick={() => {
                    toast.error(
                      "This feature is not available yet. Please navigate to 'Platform' to view different project"
                    );
                    // navigate(
                    //   "/platform/projects/view/" + storyInView[0]?.projectId
                    // );
                  }}
                >
                  View Project
                </button>
                <form method="dialog">
                  <button className="text-lg capitalize border-2 bg-gGreen text-gGreen btn border-gGreen bg-white/0 hover:border-2 hover:border-gGreen hover:bg-white">
                    Close
                  </button>
                </form>
              </div>
            </div>
            <div className="divider"></div>

            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-row items-start space-x-4">
                <p className="w-full text-5xl font-black focus:outline-none">
                  {storyInView[0]?.content}
                </p>
              </div>

              {/* body */}
              {storyInView.map((block, index) => (
                <div key={index} className="flex flex-col pb-2">
                  {block.type === "text" && (
                    <div className="flex flex-row items-start">
                      <p className="text-xl">{block.content}</p>
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="flex flex-row items-center justify-center w-full pb-2">
                      {block.file !== null ? (
                        <img
                          src={block.file}
                          alt="Image"
                          className="object-cover rounded-md w-44 h-44"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </dialog>
      <Footer />
    </div>
  );
}

export default ProjectStories;
