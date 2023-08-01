import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import Footer from "../../components/Footer";

function ProjectStories(props) {
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
          <p className="text-3xl font-bold text-center">Recent Stories</p>
          <motion.div className="grid grid-cols-2 grid-rows-1 gap-x-8">
            <AnimatePresence>
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
                  className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
                >
                  <img
                    src={sampleOne}
                    className="object-cover w-full h-48 rounded-2xl"
                  ></img>
                  <p className="pr-12 font-bold">
                    Case Study of Phillipines Project
                  </p>
                  <p className="font-light">11 Apr, 2023</p>
                </motion.div>
              </motion.div>
              <motion.div
                key={2}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.0 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
                >
                  <img
                    src={sampleOne}
                    className="object-cover w-full h-48 rounded-2xl"
                  ></img>
                  <p className="font-bold ">
                    Case Study of Phillipines Project Phillipines Project{" "}
                  </p>
                  <p className="font-light">11 Apr, 2023</p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
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
        <div className="grid w-full grid-cols-4 gap-x-8">
          <AnimatePresence>
            <motion.div
              key={1}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.0 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
              >
                <img
                  src={sampleOne}
                  className="object-cover w-full h-48 rounded-2xl"
                ></img>
                <p className="pr-12 font-bold">
                  Case Study of Phillipines Project
                </p>
                <p className="font-light">11 Apr, 2023</p>
              </motion.div>
            </motion.div>

            <motion.div
              key={2}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.0 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <img
                  src={sampleOne}
                  className="object-cover w-full h-48 rounded-2xl"
                ></img>
                <p className="font-bold ">
                  Case Study of Phillipines Project Phillipines Project{" "}
                </p>
                <p className="font-light">11 Apr, 2023</p>
              </motion.div>
            </motion.div>
            <motion.div
              key={3}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.0 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <img
                  src={sampleOne}
                  className="object-cover w-full h-48 rounded-2xl"
                ></img>
                <p className="pr-12 font-bold">
                  Case Study of Phillipines Project
                </p>
                <p className="font-light">11 Apr, 2023</p>
              </motion.div>
            </motion.div>

            <motion.div
              key={4}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.0 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <img
                  src={sampleOne}
                  className="object-cover w-full h-48 rounded-2xl"
                ></img>
                <p className="font-bold ">
                  Case Study of Phillipines Project Phillipines Project{" "}
                </p>
                <p className="font-light">11 Apr, 2023</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

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

export default ProjectStories;
