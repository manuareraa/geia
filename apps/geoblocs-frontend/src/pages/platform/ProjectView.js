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
  const {
    appData,
    setAppData,
    transferToken,
    createNewUniqueNetworkAcc,
    updateBlockchainAccInUser,
    checkUserExistence,
    userRegisterQuietMode,
  } = useContext(AppContext);
  const { projectId } = useParams();
  const [subWindow, setSubWindow] = useState("default");
  const [storyInView, setStoryInView] = useState([]);
  const [formData, setFormData] = useState({});
  const [buyContainerView, setBuyContainerView] = useState(false);
  const [redeemContainerView, setRedeemContainerView] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState(false);
  const [redeeemInProcess, setRedeemInProcess] = useState(false);

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

  const executeRedeemProcess = async () => {
    // perform validation
    if (formData.redeemEmail === "") {
      toast.error("Please enter your email");
    } else {
      // if logged in
      if (appData.loginMode === "user") {
        // if an address already exists
        if (
          appData.userProfile.blockchainAcc &&
          appData.userProfile.blockchainAcc.seed
        ) {
          const transferResult = await transferToken(
            projectId,
            appData.userProfile.blockchainAcc.keyfile.address,
            appData.projectInView.geoblocsData.collectionId,
            appData.projectInView.geoblocsData.tokenId[0],
            1,
            appData.userProfile.email
          );
          if (transferResult === true) {
            toast.success("Geoblocs Redeemed");
            setRedeemStatus(true);
            setRedeemInProcess(false);
            return true;
          } else {
            toast.error("Cannot redeem at the moment. Please try again.");
          }
        } else {
          // if an address does not exist before
          // create the account
          const accCreationResult = await createNewUniqueNetworkAcc(
            appData.userProfile.email
          );

          if (accCreationResult !== false) {
            // update the profile in the database and appData
            const profileUpdateResult = await updateBlockchainAccInUser(
              appData.userProfile.uuid,
              accCreationResult
            );

            if (profileUpdateResult === true) {
              // transfer the tokens
              const transferResult = await transferToken(
                projectId,
                accCreationResult.keyfile.address,
                appData.projectInView.geoblocsData.collectionId,
                appData.projectInView.geoblocsData.tokenId[0],
                1,
                appData.userProfile.email
              );
              if (transferResult === true) {
                toast.success("Geoblocs Redeemed");
                setRedeemStatus(true);
                setRedeemInProcess(false);
                return true;
              } else {
                toast.error("Cannot redeem at the moment. Please try again.");
              }
            }
          } else {
            toast.error("Cannot redeem at the moment. Please try again.");
          }
        }
        toast.success("Geoblocs Redeemed");
      } else {
        // if not logged in or if it is the admin (do nothing)

        // check if the user actuall exists
        const checkUser = await checkUserExistence(formData.redeemEmail);

        // if exists
        if (checkUser !== false) {
          if (
            checkUser.blockchainAcc &&
            checkUser.blockchainAcc.keyfile.address
          ) {
            // get the address and transfer
            const transferResult = await transferToken(
              projectId,
              checkUser.blockchainAcc.keyfile.address,
              appData.projectInView.geoblocsData.collectionId,
              appData.projectInView.geoblocsData.tokenId[0],
              1,
              checkUser.email
            );
            if (transferResult === true) {
              toast.success("Geoblocs Redeemed");
              setRedeemStatus(true);
              setRedeemInProcess(false);
              return true;
            } else {
              toast.error("Cannot redeem at the moment. Please try again.");
            }
          } else {
            // if user exists but does not have a blockchain account
            const accCreationResult = await createNewUniqueNetworkAcc(
              formData.redeemEmail
            );

            console.log("accCreationResult", accCreationResult, checkUser);
            if (accCreationResult !== false) {
              // update the profile in the database and appData
              const profileUpdateResult = await updateBlockchainAccInUser(
                checkUser.uuid,
                accCreationResult
              );

              if (profileUpdateResult === true) {
                // transfer the tokens
                const transferResult = await transferToken(
                  projectId,
                  accCreationResult.keyfile.address,
                  appData.projectInView.geoblocsData.collectionId,
                  appData.projectInView.geoblocsData.tokenId[0],
                  1,
                  checkUser.email
                );
                if (transferResult === true) {
                  toast.success("Geoblocs Redeemed");
                  setRedeemInProcess(false);
                  setRedeemStatus(true);
                } else {
                  toast.error("Cannot redeem at the moment. Please try again.");
                }
              }
            } else {
              toast.error("Cannot redeem at the moment. Please try again.");
            }
          }
        } else {
          // if user does not exist

          // generate a 12 character random alpha numeric password
          const randomPassword = Math.random().toString(36).slice(-12);

          const createUser = await userRegisterQuietMode(
            formData.redeemEmail,
            randomPassword,
            "redeemer"
          );

          if (createUser !== false) {
            const { email, password, role, blockchainAcc } = createUser;
            // transfer the tokens
            const transferResult = await transferToken(
              projectId,
              blockchainAcc.keyfile.address,
              appData.projectInView.geoblocsData.collectionId,
              appData.projectInView.geoblocsData.tokenId[0],
              1,
              email
            );
            if (transferResult === true) {
              toast.success("Geoblocs Redeemed");
              setRedeemInProcess(false);
              setRedeemStatus(true);
            } else {
              toast.error("Cannot redeem at the moment. Please try again.");
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log("appData", appData);
    if (Object.keys(appData.projectInView).length > 0) {
      console.log(appData.projectInView);
    } else {
      navigate("/platform/projects");
    }
  }, []);

  return (
    <>
      {Object.keys(appData.projectInView).length > 0 ? (
        <div className="flex flex-col justify-center w-full">
          {/* title container */}
          <div className="flex flex-col pt-40">
            {/* back button container */}
            <div className="flex flex-row items-center justify-center px-8 mb-16 space-x-8 lg:justify-start lg:px-32">
              <img
                src={backCircle}
                alt="Back"
                className="w-8 hover:cursor-pointer lg:w-12"
                onClick={() => navigate("/platform/projects")}
              ></img>
              <p
                className="font-bold underline text-md md:text-md lg:text-lg underline-offset-2 hover:cursor-pointer"
                onClick={() => navigate("/platform/projects")}
              >
                Back to explore projects
              </p>
            </div>
            <div className="flex flex-col items-center justify-between px-8 lg:flex-row lg:px-32 lg:space-x-28">
              {/* left - title sub-container */}
              <div className="flex flex-col space-y-4 lg:items-start">
                {/* sub title */}
                <div className="p-1 px-2 rounded-md lg:p-2 lg:px-4 bg-gGreen">
                  <p className="text-sm font-bold text-center text-white lg:text-lg">
                    Dashboard
                  </p>
                </div>
                {/* main title */}
                <p
                  className="
                  font- lg:text-[80px] text-3xl text-center lg:text-start self-center w-full  lg:leading-[95px] lg:w-[800px] md:
                "
                >
                  {appData.projectInView.metadata.projectName}
                </p>
                <p className="text-sm text-center lg:text-left lg:text-lg">
                  Started on{" "}
                  {formatDate(appData.projectInView.metadata.startedFrom)}
                </p>
                <div className="flex flex-row items-center justify-center space-x-8 lg:justify-left">
                  <div className="flex flex-row items-center space-x-2">
                    <img src={location} className="w-4 lg:w-6"></img>
                    <p className="text-sm lg:text-lg">
                      {appData.projectInView.metadata.location}
                    </p>
                  </div>
                </div>
              </div>
              {/* right container - gallery */}
              <div className="">
                <Carousel imageUrls={appData.projectInView.gallery || []} />
              </div>
            </div>
          </div>

          {/* geoblocs stats */}
          <div className="grid items-center justify-center grid-cols-1 mt-16 lg:grid-cols-4 lg:px-60 lg:gap-x-16 gap-y-8 lg:gap-y-0">
            {/* remaining geoblocs */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="font-bold lg:text-lg text-md">Geoblocs Remaining</p>
              <p className="text-4xl lg:text-5xl">
                {parseInt(appData.projectInView.geoblocsData.totalSupply) -
                  appData.projectInView.geoblocsData.purchased}
              </p>
            </div>

            {/* total supply */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="font-bold lg:text-lg text-md">Total Supply</p>
              <p className="text-4xl lg:text-5xl">
                {appData.projectInView.geoblocsData.totalSupply}
              </p>
            </div>

            {/* buy geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen"
                onClick={() => {
                  setBuyContainerView(!buyContainerView);
                  setRedeemContainerView(false);
                }}
              >
                Buy Geoblocs
              </button>
            </div>

            {/* redeem geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen"
                onClick={() => {
                  setRedeemContainerView(!redeemContainerView);
                  setBuyContainerView(false);
                }}
              >
                Redeem Geoblocs
              </button>
            </div>

            {buyContainerView === true ? (
              <div className="w-full col-span-1 lg:col-span-4">
                <div className="flex flex-col items-center justify-center py-8 mt-12 rounded-lg lg:w-full bg-gGreen/30">
                  {appData.loginMode !== "user" ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <p>
                        ${appData.projectInView.geoblocsData.pricePerGeobloc}{" "}
                        per Geobloc
                      </p>
                      <input
                        type="text"
                        placeholder="Geoblocs to purchase"
                        className="lg:w-[400px] w-[95%]  lg:h-12 h-10 lg:px-8 px-6 text-black  rounded-full outline-none bg-gGray py-2 lg:text-lg text-sm text-center lg:text-left"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                      ></input>
                      <p className="font-bold lg:text-xl text-md">
                        {appData.projectInView.geoblocsData.pricePerGeobloc *
                          formData.quantity || 0}{" "}
                        USD
                      </p>
                      <button className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen">
                        Proceed to Checkout
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="flex flex-col items-center space-y-6 lg:space-x-4 lg:space-y-0 lg:flex-row">
                        <button
                          className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen"
                          onClick={() => {
                            setAppData((prevState) => ({
                              ...prevState,
                              afterLoginRedirectURL:
                                "/platform/projects/view/" + projectId,
                            }));
                            navigate("/register");
                          }}
                        >
                          Register
                        </button>
                        <button
                          className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen"
                          onClick={() => {
                            setAppData((prevState) => ({
                              ...prevState,
                              afterLoginRedirectURL:
                                "/platform/projects/view/" + projectId,
                            }));
                            navigate("/login");
                          }}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : redeemContainerView === true ? (
              <div className="w-full col-span-1 lg:col-span-4">
                <div className="flex flex-col items-center justify-center w-full py-8 mt-12 rounded-lg bg-gGreen/30">
                  {appData.loginMode !== "user" ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {redeemStatus === true ? (
                        <p className="text-lg font-bold text-center lg:text-xl">
                          Geoblocs redeemed successfully. Thank you for your
                          support!
                        </p>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Enter your email"
                            className="lg:w-[400px] w-[95%]  lg:h-12 h-10 lg:px-8 px-6 text-black  rounded-full outline-none bg-gGray py-2 lg:text-lg text-sm text-center lg:text-left"
                            value={formData.redeemEmail}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                redeemEmail: e.target.value,
                              })
                            }
                          ></input>
                          <button
                            disabled={redeeemInProcess}
                            className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen"
                            onClick={async () => {
                              setRedeemInProcess(true);
                              executeRedeemProcess();
                            }}
                          >
                            {redeeemInProcess === true
                              ? "Please wait...Minting your NFT"
                              : redeemStatus === true
                              ? "Redeem Successful"
                              : "Redeem your Geobloc"}
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <p className="text-md lg:text-lg ">
                        Logged in as:
                        <span className="font-bold text-">
                          {" "}
                          {appData.userProfile.email}
                        </span>
                      </p>
                      <button
                        disabled={redeeemInProcess}
                        className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen"
                        onClick={async () => {
                          setRedeemInProcess(true);
                          executeRedeemProcess();
                        }}
                      >
                        {redeeemInProcess === true
                          ? "Please wait...Minting your NFT"
                          : redeemStatus === true
                          ? "Redeem Successful"
                          : "Mint Geobloc to your account"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* charts container */}
          <div className="flex flex-col items-center justify-center mt-20 space-x-0 space-y-16 lg:flex-row lg:space-y-0">
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
          <div className="grid items-center justify-center grid-cols-1 py-12 my-16 space-y-12 lg:grid-cols-3 bg-gGreen lg:space-y-0">
            <div className="flex flex-col items-center justify-center space-y-2 text-white">
              <p className="text-6xl font-black">
                {appData.projectInView.metadata.size} Ha
              </p>
              <p className="text-lg font-bold">Project Area</p>
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
              <div className="flex flex-col items-center justify-center py-12 pb-20 space-y-6 lg:flex-row lg:space-x-16 lg:space-y-0">
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
                  <p className="text-xl font-bold text-black">
                    Planting Season
                  </p>
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
              <div className="flex flex-col items-center justify-center w-full space-x-0 space-y-6 lg:flex-row lg:space-x-12 pb-28 lg:space-y-0">
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
            className="items-start justify-center w-screen px-8 py-16 overflow-auto lg:w-full lg:px-28 modal bg-gGreen/20"
          >
            <div method="dialog" className="w-full p-8 bg-white lg:p-12 rounded-3xl">
              {/* body goes here */}
              <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-col items-center w-full space-y-4 lg:justify-between lg:flex-row">
                  <p className="text-xl font-bold text-center lg:text-4xl">
                    Project Story
                  </p>
                  <div className="flex flex-row items-center space-x-8">
                    <button
                      className="text-sm text-white capitalize border-2 lg:text-lg btn border-gGreen bg-gGreen hover:border-2 hover:border-gGreen hover:bg-gGreen"
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
                      <button className="text-sm capitalize border-2 lg:text-lg bg-gGreen text-gGreen btn border-gGreen bg-white/0 hover:border-2 hover:border-gGreen hover:bg-white">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
                <div className="divider"></div>

                <div className="flex flex-col w-full space-y-4">
                  <div className="flex flex-row items-start space-x-4">
                    <p className="w-full text-2xl font-black text-center lg:text-5xl focus:outline-none">
                      {storyInView[0]?.content}
                    </p>
                  </div>

                  {/* body */}
                  {storyInView.map((block, index) => (
                    <div key={index} className="flex flex-col pb-2">
                      {block.type === "text" && (
                        <div className="flex flex-row items-start">
                          <p className="text-sm lg:text-xl">{block.content}</p>
                        </div>
                      )}

                      {block.type === "image" && (
                        <div className="flex flex-row items-center justify-center w-full pb-2">
                          {block.file !== null ? (
                            <img
                              src={block.file}
                              alt="Image"
                              className="object-cover w-24 h-24 rounded-md lg:w-44 lg:h-44"
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
          <div className="flex flex-col w-full px-16 pt-12 space-y-4 lg:px-32 pb-28">
            <div className="flex flex-col items-center w-full mb-8 space-y-2 lg:items-start">
              <p className="text-3xl font-bold text-center">
                Explore Similar Projects
              </p>
            </div>
            <SimilarProjects />
          </div>

          <Footer />
        </div>
      ) : null}
    </>
  );
}

export default ProjectView;
