import React from "react";
import { motion, stagger, AnimatePresence } from "framer-motion";

import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";

function CaseStudies(props) {
  return (
    // outer container
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col items-center justify-center pt-64 space-y-8">
        {/* title */}
        <p className="font- text-[80px]">Case Studies</p>

        <p className="font-light text-center">Learn more about how we work</p>

        <p className="font-light text-center w-[1200px]">
          All our projects focus on an holistic approach because without a
          symbiosis between the land and the people that rely on it no amount of
          tree planting is going to help, so whether it,s a sacred forest
          restoration in the Philippines using a mix of fmnr* and agroforestry,
          or re-wilding in the west of Ireland we make sure that long term
          viability is built in to every project.
        </p>

        {/* title button */}
        <button className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70">
          <p>Explore Projects</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>

      <motion.div className="grid grid-cols-4 grid-rows-3 px-64 py-24 gap-x-8 gap-y-8">
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
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
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
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
          <motion.div
            key={3}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
          <motion.div
            key={4}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
          <motion.div
            key={5}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
          <motion.div
            key={6}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
          <motion.div
            key={7}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
          <motion.div
            key={8}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer"
            >
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
              <p className="font-bold">Case Study of Phillipines Project</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default CaseStudies;
