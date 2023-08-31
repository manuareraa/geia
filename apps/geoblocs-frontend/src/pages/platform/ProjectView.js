import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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
import Carousel from "../../components/Carousel";
import SponsorsSW from "../../components/platform/projectView/subWindows/SponsorsSW";
import SeasonsSW from "../../components/platform/projectView/subWindows/SeasonsSW";
import MonitorsSW from "../../components/platform/projectView/subWindows/MonitorsSW";
import EnvironmentSW from "../../components/platform/projectView/subWindows/EnvironmentSW";
import LinksSW from "../../components/platform/projectView/subWindows/LinksSW";
import DocumentsSW from "../../components/platform/projectView/subWindows/DocumentsSW";
import LandConditions from "../../components/platform/projectView/LandConditions";
import SimilarProjects from "../../components/platform/projectView/SimilarProjects";

function ProjectView(props) {
  const navigate = useNavigate();
  const { appData, setAppData } = useContext(AppContext);
  const { projectId } = useParams();
  const [subWindow, setSubWindow] = useState("default");
  const [storyInView, setStoryInView] = useState([]);
  const [formData, setFormData] = useState({});
  const [buyContainerView, setBuyContainerView] = useState(false);
  const [redeemContainerView, setRedeemContainerView] = useState(false);

  function formatDate(inputDate) {
    const [day, month, year] = inputDate.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedMonth = months[parseInt(month) - 1];
    return `${day} ${formattedMonth}, ${year}`;
  }

  useEffect(() => {
    if (Object.keys(appData.projectInView).length > 0) {
      console.log(appData.projectInView);
    } else {
      navigate("/platform/projects");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-col pt-40">
        {/* back button container */}
        <div className="flex flex-row items-center px-32 mb-16 space-x-8">
          <img
            src={backCircle}
            alt="Back"
            className="w-12 hover:cursor-pointer"
            onClick={() => navigate("/platform/projects")}
          ></img>
          <p
            className="text-lg font-bold underline underline-offset-2 hover:cursor-pointer"
            onClick={() => navigate("/platform/projects")}
          >
            Back to explore projects
          </p>
        </div>
        <div className="flex flex-row items-center justify-between px-32 space-x-28">
          {/* left - title sub-container */}
          <div className="flex flex-col items-start space-y-4">
            {/* sub title */}
            <div className="p-2 px-4 rounded-md bg-gGreen">
              <p className="font-bold text-center text-white">Dashboard</p>
            </div>
            {/* main title */}
            <p className="font- text-[80px] leading-[95px] w-[800px]">
              {appData.projectInView.metadata.projectName}
            </p>
            <p>
              Started on{" "}
              {formatDate(appData.projectInView.metadata.startedFrom)}
            </p>
            <div className="flex flex-row items-center space-x-8">
              <div className="flex flex-row items-center space-x-2">
                <img src={location} className="w-6"></img>
                <p className="text-lg">
                  {appData.projectInView.metadata.location}
                </p>
              </div>
            </div>
          </div>
          <Carousel imageUrls={appData.projectInView.gallery || []} />
        </div>
      </div>

      {/* geoblocs stats */}
      <div className="grid items-center justify-center grid-cols-4 mt-16 px-60 gap-x-16">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-lg font-bold">Geoblocs Remaining</p>
          <p className="text-5xl">
            {parseInt(appData.projectInView.geoblocsData.totalSupply) -
              appData.projectInView.geoblocsData.purchased}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-lg font-bold">Total Supply</p>
          <p className="text-5xl">
            {appData.projectInView.geoblocsData.totalSupply}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            className="px-10 py-4 text-xl font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen"
            onClick={() => {
              setBuyContainerView(!buyContainerView);
              setRedeemContainerView(false);
            }}
          >
            Buy Geoblocs
          </button>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            className="px-10 py-4 text-xl font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen"
            onClick={() => {
              setRedeemContainerView(!redeemContainerView);
              setBuyContainerView(false);
            }}
          >
            Redeem Geoblocs
          </button>
        </div>

        {buyContainerView === true ? (
          <div className="w-full col-span-4">
            <div className="flex flex-col items-center justify-center w-full py-8 mt-12 rounded-lg bg-gGreen/30">
              {appData.loginMode === "user" ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p>
                    ${appData.projectInView.geoblocsData.pricePerGeobloc} per{" "}
                    Geobloc
                  </p>
                  <input
                    type="text"
                    placeholder="Geoblocs to purchase"
                    className="w-[400px] h-12 px-8 text-black  rounded-full outline-none bg-gGray py-2"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  ></input>
                  <p className="text-xl font-bold">
                    {appData.projectInView.geoblocsData.pricePerGeobloc *
                      formData.quantity || 0}{" "}
                    USD
                  </p>
                  <button className="px-10 py-2 text-lg font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen">
                    Proceed to Checkout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="w-[400px] h-12 px-8 text-black  rounded-full outline-none bg-gGray py-2"
                    value={formData.loginEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, loginEmail: e.target.value })
                    }
                  ></input>
                </div>
              )}
            </div>
          </div>
        ) : redeemContainerView === true ? (
          <div className="w-full col-span-4">
            <div className="flex flex-col items-center justify-center w-full py-8 mt-12 rounded-lg bg-gGreen/30">
              <div className="flex flex-col items-center justify-center space-y-4">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-[400px] h-12 px-8 text-black  rounded-full outline-none bg-gGray py-2"
                  value={formData.redeemEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, redeemEmail: e.target.value })
                  }
                ></input>
                <button className="px-10 py-2 text-lg font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen">
                  Redeem your Geobloc
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* charts container */}
      <div className="flex flex-row items-center justify-center mt-20 space-x-0">
        {/* project status chart */}
        <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
          <p className="text-2xl font-bold text-center">Project Status</p>
          <StatusChart
            completed={appData.projectInView.metadata.projectStatus}
            inProgress={100 - appData.projectInView.metadata.projectStatus}
          />
        </div>

        {/* geoblocs distribution chart */}
        <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
          <p className="text-2xl font-bold text-center">
            Geoblocs Distribution
          </p>
          <GeoblocsChart
            totalSupply={appData.projectInView.geoblocsData.totalSupply}
            purchased={appData.projectInView.geoblocsData.purchased}
          />
        </div>
      </div>

      {/* green* container */}
      <div className="grid items-center justify-center grid-cols-3 py-12 my-16 bg-gGreen">
        <div className="flex flex-col items-center justify-center space-y-2 text-white">
          <p className="text-6xl font-black">
            {appData.projectInView.metadata.size} Ha
          </p>
          <p className="text-lg font-bold">Geoblocs Remaining</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 text-white">
          <p className="text-6xl font-black">
            {appData.projectInView.seasons.length}
          </p>
          <p className="text-lg font-bold">Species Growing</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 text-white">
          <p className="text-6xl font-black capitalize">
            {appData.projectInView.metadata.ownership}
          </p>
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
                setStoryInView(appData.projectInView.story);
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
        <SponsorsSW
          setSubWindow={setSubWindow}
          sponsorsData={appData.projectInView.sponsors}
        />
      ) : subWindow === "monitoring" ? (
        <MonitorsSW
          setSubWindow={setSubWindow}
          monitorsData={appData.projectInView.monitors}
        />
      ) : subWindow === "season" ? (
        <SeasonsSW
          setSubWindow={setSubWindow}
          seasonData={appData.projectInView.seasons}
        />
      ) : subWindow === "environment" ? (
        <EnvironmentSW
          setSubWindow={setSubWindow}
          projectEnvDatas={appData.projectInView.environment}
        />
      ) : subWindow === "links" ? (
        <LinksSW
          setSubWindow={setSubWindow}
          linksData={appData.projectInView.links}
        />
      ) : subWindow === "documents" ? (
        <DocumentsSW
          setSubWindow={setSubWindow}
          documentsData={appData.projectInView.documents}
        />
      ) : null}

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

      {/* land conditions bar */}
      <LandConditions landConditions={appData.projectInView.conditions} />

      {/* similar projects */}
      <div className="flex flex-col w-full px-32 pt-12 space-y-4 pb-28">
        <div className="flex flex-col items-start w-full mb-8 space-y-2">
          <p className="text-3xl font-bold text-center">
            Explore Similar Projects
          </p>
        </div>
        <SimilarProjects />
      </div>

      <Footer />
    </div>
  );
}

export default ProjectView;
