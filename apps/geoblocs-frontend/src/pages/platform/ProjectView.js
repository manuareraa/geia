import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import rightArrow from "../../assets/svg/right-arrow-b.svg";
import sampleOne from "../../assets/test/sample-one.png";
import Footer from "../../components/Footer";
import location from "../../assets/svg/location.svg";
import backCircle from "../../assets/svg/back-circle.svg";
import sponsorsIcon from "../../assets/svg/sponsors-icon.svg";
import environmentIcon from "../../assets/svg/environment-icon.svg";
import seasonIcon from "../../assets/svg/season-icon.svg";
import monitoringIcon from "../../assets/svg/monitoring-icon.svg";
import sponsorOne from "../../assets/test/sponsor-one.png";
import document from "../../assets/svg/document.svg";

import StatusChart from "../../components/admin/StatusChart";
import GeoblocsChart from "../../components/admin/GeoblocsChart";

function ProjectView(props) {
  const { projectId } = useParams();
  const [subWindow, setSubWindow] = useState("default");

  useEffect(() => {
    console.log(projectId);
  }, []);
  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-row items-center justify-between px-32 space-x-8 pt-52">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <div className="p-2 px-4 rounded-md bg-gGreen">
            <p className="font-bold text-center text-white">Dashboard</p>
          </div>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px] w-[900px]">
            Cliffs of Moher West Ireland
          </p>
          <p>Started on 01 March, 2022</p>
          <div className="flex flex-row items-center space-x-8">
            <div className="flex flex-row items-center space-x-2">
              <img src={location} className="w-6"></img>
              <p className="text-lg">Ireland</p>
            </div>
          </div>
        </div>

        {/* right - recent stories sub-container */}
        <div className="flex flex-col items-end ml-12 space-y-4">
          <p className="text-3xl font-bold text-center">Gallery</p>
          <div className="relative p-6 rounded-xl bg-glGreen">
            <img
              src={sampleOne}
              className="object-cover w-[600px] rounded-lg h-[300px]"
              alt="Gallery Image"
            />
            <div className="absolute flex flex-row items-center w-full transform -translate-y-1/2 space-x-[620px] top-1/2 left-4">
              {/* previous button */}
              <img src={backCircle} alt="Previous" className="ml-[-45px]" />
              {/* next button */}
              <img src={backCircle} alt="Next" className="rotate-180" />
            </div>
          </div>
        </div>
      </div>

      {/* geoblocs stats */}
      <div className="grid grid-cols-4 mt-16 px-60 gap-x-16">
        <div className="flex flex-col justify-center space-y-2">
          <p className="text-lg font-bold">Geoblocs Remaining</p>
          <p className="text-5xl">149,835</p>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <p className="text-lg font-bold">Total Supply</p>
          <p className="text-5xl">150,000</p>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <button className="px-10 py-4 text-xl font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen">
            Buy Geoblocs
          </button>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <button className="px-10 py-4 text-xl font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen">
            Redeem Geoblocs
          </button>
        </div>
      </div>

      {/* charts container */}
      <div className="flex flex-row items-center justify-center space-x-0 mt-28">
        {/* project status chart */}
        <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
          <p className="text-2xl font-bold text-center">Project Status</p>
          <StatusChart />
        </div>

        {/* geoblocs distribution chart */}
        <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
          <p className="text-2xl font-bold text-center">
            Geoblocs Distribution
          </p>
          <GeoblocsChart />
        </div>
      </div>

      {/* green container */}
      <div className="grid items-center justify-center grid-cols-3 py-12 my-16 bg-gGreen">
        <div className="flex flex-col items-center justify-center space-y-2 text-white">
          <p className="text-6xl font-black">15 Ha</p>
          <p className="text-lg font-bold">Geoblocs Remaining</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 text-white">
          <p className="text-6xl font-black">Mar - Nov</p>
          <p className="text-lg font-bold">Planting Season</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 text-white">
          <p className="text-6xl font-black">Private</p>
          <p className="text-lg font-bold">Ownership</p>
        </div>
      </div>

      {subWindow === "default" ? (
        <>
          {/* 4 option container */}
          <div className="flex flex-row items-center justify-center py-12 pb-20 space-x-16">
            <div
              className="flex flex-col items-center justify-center p-4 py-6 space-y-4 rounded-lg bg-glGreen hover:cursor-pointer"
              onClick={() => {
                setSubWindow("sponsors");
              }}
            >
              <p className="text-xl font-bold text-black">Sponsors</p>
              <img src={sponsorsIcon} alt="Sponsors" className="w-40" />
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 py-6 space-y-4 rounded-lg bg-glGreen hover:cursor-pointer"
              onClick={() => {
                setSubWindow("season");
              }}
            >
              <p className="text-xl font-bold text-black">Planting Season</p>
              <img src={seasonIcon} alt="Sponsors" className="w-40" />
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 py-6 space-y-4 rounded-lg bg-glGreen hover:cursor-pointer"
              onClick={() => {
                setSubWindow("monitoring");
              }}
            >
              <p className="text-xl font-bold text-black">Monitoring</p>
              <img src={monitoringIcon} alt="Sponsors" className="w-40" />
            </div>
            <div
              className="flex flex-col items-center justify-center p-4 py-6 space-y-4 rounded-lg bg-glGreen hover:cursor-pointer"
              onClick={() => {
                setSubWindow("environment");
              }}
            >
              <p className="text-xl font-bold text-black">Environment</p>
              <img src={environmentIcon} alt="Sponsors" className="w-40" />
            </div>
          </div>

          {/* 3 button container */}
          <div className="flex flex-row items-center justify-center w-full space-x-12 pb-28">
            <button
              className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg h-fit bg-gGreen w-80 btn hover:bg-gGreen/80"
              onClick={() => {
                window.my_modal_1.showModal();
              }}
            >
              Project Story
            </button>
            <button
              className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg h-fit bg-gGreen w-80 btn hover:bg-gGreen/80"
              onClick={() => {
                setSubWindow("links");
              }}
            >
              Links
            </button>
            <button
              className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg h-fit bg-gGreen w-80 btn hover:bg-gGreen/80"
              onClick={() => {
                setSubWindow("documents");
              }}
            >
              Documents
            </button>
          </div>
        </>
      ) : subWindow === "sponsors" ? (
        <>
          <div className="flex flex-col pb-16 px-60">
            <div className="flex flex-col p-8 rounded-xl bg-glGreen">
              {/* title bar */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-2xl font-bold text-center">Sponsors</p>
                <img
                  src={backCircle}
                  className="w-12 hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("default");
                  }}
                ></img>
              </div>
              <div className="divider"></div>
              <div className="grid grid-cols-4">
                <div className="flex flex-col items-center justify-center px-0 py-4 bg-white rounded-xl">
                  <img
                    src={sponsorOne}
                    className="w-48 object-fit hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : subWindow === "monitoring" ? (
        <>
          <div className="flex flex-col pb-16 px-60">
            <div className="flex flex-col p-8 rounded-xl bg-glGreen">
              {/* title bar */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-2xl font-bold text-center">Monitoring</p>
                <img
                  src={backCircle}
                  className="w-12 hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("default");
                  }}
                ></img>
              </div>
              <div className="divider"></div>
              <div className="grid grid-cols-4">
                <div className="flex flex-col items-center justify-center px-0 py-4 bg-white rounded-xl">
                  <img
                    src={sponsorOne}
                    className="w-48 object-fit hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : subWindow === "season" ? (
        <>
          <div className="flex flex-col pb-16 px-60">
            <div className="flex flex-col p-8 rounded-xl bg-glGreen">
              {/* title bar */}
              <div className="flex flex-row items-center justify-between">
                <p className="text-2xl font-bold text-center">Season</p>
                <img
                  src={backCircle}
                  className="w-12 hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("default");
                  }}
                ></img>
              </div>
              <div className="divider"></div>
              <div className="w-full overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Species</th>
                      <th>Season</th>
                      <th>Document</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover">
                      <th>Rice</th>
                      <td>Nov-Dec</td>
                      <td>
                        <button
                          className="text-white capitalize btn btn-sm bg-gGreen hover:bg-gGreen/80"
                          onClick={() => {
                            navigate(
                              "/admin/dashboard/projects/view/CDU-156-885"
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : subWindow === "environment" ? (
        <div className="flex flex-col pb-16 px-60">
          <div className="flex flex-col p-8 rounded-xl bg-glGreen">
            {/* title bar */}
            <div className="flex flex-row items-center justify-between">
              <p className="text-2xl font-bold text-center">Environment Data</p>
              <img
                src={backCircle}
                className="w-12 hover:cursor-pointer"
                onClick={() => {
                  setSubWindow("default");
                }}
              ></img>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-4">
              <div className="flex flex-col items-center justify-center px-0 py-4 bg-white rounded-xl">
                <img
                  src={sponsorOne}
                  className="w-48 object-fit hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      ) : subWindow === "links" ? (
        <div className="flex flex-col pb-16 px-60">
          <div className="flex flex-col p-8 rounded-xl bg-glGreen">
            {/* title bar */}
            <div className="flex flex-row items-center justify-between">
              <p className="text-2xl font-bold text-center">Links</p>
              <img
                src={backCircle}
                className="w-12 hover:cursor-pointer"
                onClick={() => {
                  setSubWindow("default");
                }}
              ></img>
            </div>
            <div className="divider"></div>

            {/* links container */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={rightArrow} className="w-6 -rotate-45"></img>
                <p className="underline">Google</p>
              </div>
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={rightArrow} className="w-6 -rotate-45"></img>
                <p className="underline">Google</p>
              </div>
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={rightArrow} className="w-6 -rotate-45"></img>
                <p className="underline">Google</p>
              </div>
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={rightArrow} className="w-6 -rotate-45"></img>
                <p className="underline">Google</p>
              </div>
            </div>
          </div>
        </div>
      ) : subWindow === "documents" ? (
        <div className="flex flex-col pb-16 px-60">
          <div className="flex flex-col p-8 rounded-xl bg-glGreen">
            {/* title bar */}
            <div className="flex flex-row items-center justify-between">
              <p className="text-2xl font-bold text-center">Documents</p>
              <img
                src={backCircle}
                className="w-12 hover:cursor-pointer"
                onClick={() => {
                  setSubWindow("default");
                }}
              ></img>
            </div>
            <div className="divider"></div>

            {/* documents container */}
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={document} className="w-6 "></img>
                <p className="underline">Google</p>
              </div>
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={document} className="w-6 "></img>
                <p className="underline">Google</p>
              </div>
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={document} className="w-6 "></img>
                <p className="underline">Google</p>
              </div>
              <div className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md">
                <img src={document} className="w-6 "></img>
                <p className="underline">Google</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* project story modal */}
      <dialog
        id="my_modal_1"
        className="items-start w-full py-16 overflow-auto px-28 modal bg-gGreen/20"
      >
        <div method="dialog" className="w-full p-12 bg-white rounded-3xl">
          <div className="flex flex-col w-full space-y-4">
            {/* title container */}
            <div className="flex flex-row items-center justify-between w-full">
              {/* title  */}
              <p className="text-4xl font-bold text-center">Project Story</p>
              {/* title button containers */}
              <div className="flex flex-row space-x-4">
                <button
                  className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-gGreen"
                  onClick={() => {
                    window.my_modal_1.close();
                  }}
                >
                  Close
                </button>
              </div>
            </div>
            <div className="divider"></div>
          </div>
        </div>
      </dialog>

      {/* land conditions bar */}
      <div className="items-center justify-center w-full pb-20 px-80">
        <div className="items-center justify-center p-8 rounded-xl bg-glGreen">
          <div className="flex flex-col space-y-0">
            <p>Baseline Land Condition</p>
            <p className="text-3xl font-semibold">Degraded Rain Forest</p>
          </div>

          {/* parameters */}
          <div className="grid grid-cols-2 grid-rows-5 py-6 gap-y-6">
            <div className="flex flex-col space-y-1">
              <p>Local Environment</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Tree Cover</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Soil Health</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Ground Cover</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Water</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Invasive Species</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Fauna</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Fire Risk</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Flood Risk</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
            <div className="flex flex-col space-y-1">
              <p>Outcome Assessment</p>
              <progress
                className="bg-white w-[550px] progress text-gGreen"
                value={66}
                max="100"
              ></progress>
            </div>
          </div>
        </div>
      </div>

      {/* similar projects */}
      <div className="flex flex-col w-full px-32 pt-12 space-y-4 pb-28">
        <div className="flex flex-col items-start w-full mb-8 space-y-2">
          <p className="text-3xl font-bold text-center">
            Explore Similar Projects
          </p>
        </div>
        <motion.div className="grid grid-cols-5 grid-rows-1 gap-x-10">
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
                <div className="flex flex-row items-center space-x-2">
                  <img src={location} className="w-4"></img>
                  <p className="font-light">11 Apr, 2023</p>
                </div>
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

      <Footer />
    </div>
  );
}

export default ProjectView;
