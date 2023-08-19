import React, { useEffect, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import Footer from "../../components/Footer";

function ProjectStories(props) {
  const { appData } = useContext(AppContext);
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
      let storyCard = (
        <motion.div
          key={1}
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
              setStoryInView(project.story);
              window.my_modal_1.showModal();
            }}
          >
            <img
              src={sampleOne}
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
    });
    appData.projects.forEach((project) => {
      let storyCard = (
        <motion.div
          key={1}
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
              setStoryInView(project.story);
              window.my_modal_1.showModal();
            }}
          >
            <img
              src={sampleOne}
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
      <div className="flex flex-row items-start justify-between px-32 pt-64 space-x-8">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px]">
            Stories of <br></br>{" "}
            <span className="font-bold text-gGreen">Transformative</span>{" "}
            <br></br> Projects
          </p>
        </div>

        {/* right - recent stories sub-container */}
        <div className="flex flex-col items-end ml-12 space-y-4">
          {recentStoryCards.length > 0 ? (
            <>
              <p className="text-3xl font-bold text-center">Recent Stories</p>
              <motion.div
                className={`grid grid-cols-${recentStoryCards.length} grid-rows-1 gap-x-8`}
              >
                <AnimatePresence>{recentStoryCards}</AnimatePresence>
              </motion.div>
            </>
          ) : null}
        </div>

        {/* title button */}
        {/* <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button> */}
      </div>

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-32 px-52">
        {/* title */}
        <div className="flex flex-col items-start w-full my-8">
          <p className="text-3xl font-bold text-center">All Stories</p>
        </div>
        {/* body */}
        {storyCards.length > 0 ? (
          <div className="grid w-full grid-cols-4 gap-x-8">
            <AnimatePresence>{storyCards}</AnimatePresence>
          </div>
        ) : (
          <div className="flex justify-center w-full ">
            <p className="p-4 px-8 text-xl font-bold rounded-lg bg-gGray">
              Stories are being written. Please come back later.
            </p>
          </div>
        )}

        {/* call for registration container */}
        <div className="flex flex-col mb-16 space-y-8 mt-44">
          <p className="text-4xl font-bold">
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
              <form method="dialog">
                <button className="text-lg capitalize border-2 text-gGreen btn border-gGreen bg-white/0 hover:border-2 hover:border-gGreen hover:bg-white">
                  Close
                </button>
              </form>
            </div>
            <div className="divider"></div>

            <div className="flex flex-col w-full space-y-4">
              <div className="flex flex-row items-start space-x-4">
                <p className="w-full text-5xl font-black focus:outline-none">
                  {storyInView[0].content}
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
                          className="object-cover w-32 h-32"
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
