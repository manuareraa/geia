import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Popup,
  useMap,
} from "react-leaflet";
import { icon } from "leaflet";
import FlipNumbers from "react-flip-numbers";

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
import markerIcon from "../../assets/img/marker-icon.png";
import calendarIcon from "../../assets/img/dashboard/calendar-icon.png";
import locationIcon from "../../assets/img/dashboard/location-icon.png";

import StatusChart from "../../components/admin/StatusChart";
import GeoblocsChart from "../../components/admin/GeoblocsChart";
import Carousel from "../../components/Carousel";
import CarouselTwo from "../../components/CarouselTwo";
import SponsorsSW from "../../components/platform/projectView/subWindows/SponsorsSW";
import SeasonsSW from "../../components/platform/projectView/subWindows/SeasonsSW";
import MonitorsSW from "../../components/platform/projectView/subWindows/MonitorsSW";
import EnvironmentSW from "../../components/platform/projectView/subWindows/EnvironmentSW";
import LinksSW from "../../components/platform/projectView/subWindows/LinksSW";
import DocumentsSW from "../../components/platform/projectView/subWindows/DocumentsSW";
import LandConditions from "../../components/platform/projectView/LandConditions";
import SimilarProjects from "../../components/platform/projectView/SimilarProjects";
import Paypal from "../../components/Paypal";
import "../../utils/TooltipStyles.css";

function ProjectView(props) {
  let position = [51.903614, -8.468399];
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
  const [latLong, setLatLong] = useState([51.903614, -8.468399]);
  const [mapCenter, setMapCenter] = useState(latLong);

  const ChangeView = ({ center }) => {
    console.log("executing change view");
    const map = useMap();
    map.setView(center, map.getZoom());
    return null;
  };

  const customIcon = icon({
    iconUrl: markerIcon,
    // iconRetinaUrl: "/marker-icon-2x.png",
    // shadowUrl: "/marker-shadow.png",
    iconSize: [25, 41], // size of the icon
    // shadowSize: [41, 41], // size of the shadow
    iconAnchor: [12.5, 41], // point of the icon which will correspond to marker's location
    // shadowAnchor: [13, 41], // the same for the shadow
    // popupAnchor: [0, -41], // point from which the popup should open relative to the iconAnchor
  });

  function isValidLatLon(latLonArray) {
    // Check if the array has exactly two elements
    if (latLonArray.length !== 2) return false;

    // Destructure the array into lat and lon variables
    const [lat, lon] = latLonArray;

    // Check if lat and lon are numbers
    if (typeof lat !== "number" || typeof lon !== "number") return false;

    // Check the range of lat and lon values
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) return false;

    // If all checks pass, return true
    position = latLonArray;
    setLatLong(latLonArray);
    setMapCenter(latLonArray);
    console.log("all checks passed", position);
  }

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
            appData.userProfile.email,
            "redeem",
            null,
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
            appData.userProfile.email,
          );

          if (accCreationResult !== false) {
            // update the profile in the database and appData
            const profileUpdateResult = await updateBlockchainAccInUser(
              appData.userProfile.uuid,
              accCreationResult,
            );

            if (profileUpdateResult === true) {
              // transfer the tokens
              const transferResult = await transferToken(
                projectId,
                accCreationResult.keyfile.address,
                appData.projectInView.geoblocsData.collectionId,
                appData.projectInView.geoblocsData.tokenId[0],
                1,
                appData.userProfile.email,
                "redeem",
                null,
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
              checkUser.email,
              "redeem",
              null,
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
              formData.redeemEmail,
            );

            console.log("accCreationResult", accCreationResult, checkUser);
            if (accCreationResult !== false) {
              // update the profile in the database and appData
              const profileUpdateResult = await updateBlockchainAccInUser(
                checkUser.uuid,
                accCreationResult,
              );

              if (profileUpdateResult === true) {
                // transfer the tokens
                const transferResult = await transferToken(
                  projectId,
                  accCreationResult.keyfile.address,
                  appData.projectInView.geoblocsData.collectionId,
                  appData.projectInView.geoblocsData.tokenId[0],
                  1,
                  checkUser.email,
                  "redeem",
                  null,
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
            "redeemer",
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
              email,
              "redeem",
              null,
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

  const onPaypalSuccess = async (details, data) => {
    console.log("details", details);
    console.log("data", data);
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
          formData.quantity,
          details.payer.email_address,
          "paypal",
          { ...details, ...data },
        );
        if (transferResult === true) {
          toast.success("Geoblocs Purchased");
          setBuyContainerView(false);
          setRedeemContainerView(false);
        } else {
          toast.error("Cannot purchase at the moment. Please try again.");
        }
      } else {
        // if an address does not exist before
        // create the account
        const accCreationResult = await createNewUniqueNetworkAcc(
          details.payer.email_address,
        );

        if (accCreationResult !== false) {
          // update the profile in the database and appData
          const profileUpdateResult = await updateBlockchainAccInUser(
            appData.userProfile.uuid,
            accCreationResult,
          );

          if (profileUpdateResult === true) {
            // transfer the tokens
            const transferResult = await transferToken(
              projectId,
              accCreationResult.keyfile.address,
              appData.projectInView.geoblocsData.collectionId,
              appData.projectInView.geoblocsData.tokenId[0],
              formData.quantity,
              details.payer.email_address,
              "paypal",
              { ...details, ...data },
            );
            if (transferResult === true) {
              toast.success("Geoblocs Purchased");
              setBuyContainerView(false);
              setRedeemContainerView(false);
            } else {
              toast.error("Cannot purchase at the moment. Please try again.");
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
      const checkUser = await checkUserExistence(details.payer.email_address);

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
            formData.quantity,
            details.payer.email_address,
            "paypal",
            { ...details, ...data },
          );
          if (transferResult === true) {
            toast.success("Geoblocs Purchased");
            setBuyContainerView(false);
            setRedeemContainerView(false);
          } else {
            toast.error("Cannot purchase at the moment. Please try again.");
          }
        } else {
          // if user exists but does not have a blockchain account
          const accCreationResult = await createNewUniqueNetworkAcc(
            details.payer.email_address,
          );

          console.log("accCreationResult", accCreationResult, checkUser);
          if (accCreationResult !== false) {
            // update the profile in the database and appData
            const profileUpdateResult = await updateBlockchainAccInUser(
              checkUser.uuid,
              accCreationResult,
            );

            if (profileUpdateResult === true) {
              // transfer the tokens
              const transferResult = await transferToken(
                projectId,
                accCreationResult.keyfile.address,
                appData.projectInView.geoblocsData.collectionId,
                appData.projectInView.geoblocsData.tokenId[0],
                formData.quantity,
                details.payer.email_address,
                "paypal",
                { ...details, ...data },
              );
              if (transferResult === true) {
                toast.success("Geoblocs Purchased");
                setBuyContainerView(false);
                setRedeemContainerView(false);
              } else {
                toast.error("Cannot purchase at the moment. Please try again.");
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
          details.payer.email_address,
          randomPassword,
          "buyer",
        );

        if (createUser !== false) {
          const { email, password, role, blockchainAcc } = createUser;
          // transfer the tokens
          const transferResult = await transferToken(
            projectId,
            blockchainAcc.keyfile.address,
            appData.projectInView.geoblocsData.collectionId,
            appData.projectInView.geoblocsData.tokenId[0],
            formData.quantity,
            details.payer.email_address,
            "paypal",
            { ...details, ...data },
          );
          if (transferResult === true) {
            toast.success("Geoblocs Purchased");
            setBuyContainerView(false);
            setRedeemContainerView(false);
          } else {
            toast.error("Cannot purchase at the moment. Please try again.");
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log("appData", appData);
    if (Object.keys(appData.projectInView).length > 0) {
      console.log(appData.projectInView);
      // isValidLatLon(appData.projectInView.metadata.gps);
      isValidLatLon([48.8566, 2.3522]);
    } else {
      navigate("/platform/projects");
    }
  }, []);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <>
      {Object.keys(appData.projectInView).length > 0 ? (
        <div className="flex flex-col justify-center w-full">
          {/* title container */}
          <div className="flex flex-col pt-12">
            {/* back button container */}
            <div className="flex flex-row items-center justify-center px-8 mb-16 space-x-8 lg:justify-start lg:px-32">
              <img
                src={backCircle}
                alt="Back"
                className="w-8 hover:cursor-pointer lg:w-12"
                onClick={() => navigate("/platform/projects")}
              ></img>
              <p
                className="font-bold underline text-md md:text-md underline-offset-2 hover:cursor-pointer lg:text-lg"
                onClick={() => navigate("/platform/projects")}
              >
                Back to explore projects
              </p>
            </div>
            <div className="flex flex-col items-center justify-between px-8 lg:space-x-28 lg:px-32 2xl:flex-row">
              {/* left - title sub-container */}
              <div className="flex flex-col space-y-4 lg:items-start">
                {/* sub title */}
                <div className="p-1 px-2 rounded-md bg-gGreen lg:p-2 lg:px-4">
                  <p className="text-sm font-bold text-center text-white lg:text-lg">
                    Dashboard
                  </p>
                </div>
                {/* main title */}
                <p
                  className="
                  font- md: w-full self-center text-center text-3xl lg:w-[800px]  lg:text-start lg:text-[80px] lg:leading-[95px]
                "
                >
                  {appData.projectInView.metadata.projectName}
                </p>
                <div className="flex flex-row items-center space-x-2">
                  <img src={calendarIcon} className="w-4 lg:w-6"></img>
                  <p className="text-sm text-center lg:text-left lg:text-lg">
                    Started on {appData.projectInView.metadata.startedFrom}
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-8 lg:justify-left">
                  <div className="flex flex-row items-center space-x-2">
                    <img src={locationIcon} className="w-4 lg:w-6"></img>
                    <p className="text-sm lg:text-lg">
                      {appData.projectInView.metadata.location}
                    </p>
                  </div>
                </div>
              </div>
              {/* right container - gallery */}
            </div>
          </div>

          {/* map container */}
          <div className="flex flex-col items-center justify-center w-full">
            {/* map container */}
            <MapContainer
              center={latLong}
              zoom={13}
              style={{
                height: "60vh",
                width: "60%",
                borderRadius: "40px",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <ChangeView center={mapCenter} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={latLong} icon={customIcon}>
                <Tooltip
                  permanent
                  interactive
                  direction="top"
                  offset={[0, -40]}
                >
                  {appData.projectInView.metadata.projectName}
                </Tooltip>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>

            <button
              className="px-6 py-1 my-0 font-bold text-white capitalize border-0 rounded-full text-md lg:text-md w-fit bg-gGreen lg:px-10 lg:py-4"
              onClick={() => {
                console.log("button clicked position", position);
                setMapCenter(latLong);
              }}
            >
              Recenter
            </button>
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

          {/* geoblocs stats */}
          <div className="mt-16 grid w-full grid-cols-1 items-center justify-center gap-y-8 bg-[#A1AEB4] py-6 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-0 lg:px-60">
            {/* buy geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full text-md w-fit bg-gGreen lg:px-10 lg:py-4 lg:text-xl"
                onClick={() => {
                  setBuyContainerView(!buyContainerView);
                  setRedeemContainerView(false);
                }}
              >
                Buy Geoblocs
              </button>
            </div>

            {/* remaining geoblocs */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="font-bold text-center text-md lg:text-lg">
                Geoblocs Remaining
              </p>
              <p className="text-4xl lg:text-5xl">
                {parseInt(appData.projectInView.geoblocsData.totalSupply) -
                  appData.projectInView.geoblocsData.purchased}
              </p>
            </div>

            {/* total supply */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="font-bold text-center text-md lg:text-lg">
                Total Supply
              </p>
              <p className="text-4xl lg:text-5xl">
                {appData.projectInView.geoblocsData.totalSupply}
              </p>
              {/* <FlipNumbers
                height={40}
                width={40}
                color="white"
                background="black"
                play
                perspective={1000}
                numbers="12345"
                duration={10}
              /> */}
            </div>

            {/* redeem geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full text-md w-fit bg-gGreen lg:px-10 lg:py-4 lg:text-xl"
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
                <div className="flex flex-col items-center justify-center py-8 mt-12 rounded-lg bg-gGreen/30 lg:w-full">
                  {appData.loginMode !== "user" ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <p>
                        ${appData.projectInView.geoblocsData.pricePerGeobloc}{" "}
                        per Geobloc
                      </p>
                      <input
                        type="text"
                        placeholder="Geoblocs to purchase"
                        className="h-10 w-[95%]  rounded-full bg-gGray px-6 py-2 text-center  text-sm text-black outline-none lg:h-12 lg:w-[400px] lg:px-8 lg:text-left lg:text-lg"
                        value={formData.quantity}
                        onChange={(e) =>
                          setFormData({ ...formData, quantity: e.target.value })
                        }
                      ></input>
                      <p className="font-bold text-md lg:text-xl">
                        {appData.projectInView.geoblocsData.pricePerGeobloc *
                          formData.quantity || 0}{" "}
                        USD
                      </p>
                      {/* <button className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen">
                        Proceed to Checkout
                      </button> */}
                      {formData.quantity > 0 && formData.quantity <= 20 ? (
                        <Paypal
                          successCallback={onPaypalSuccess}
                          price={
                            appData.projectInView.geoblocsData.pricePerGeobloc *
                              formData.quantity || 0
                          }
                        />
                      ) : (
                        <p>Please enter a quantity between 1 and 20</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-4 lg:space-y-0">
                        <button
                          className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full text-md w-fit bg-gGreen lg:px-10 lg:py-4 lg:text-xl"
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
                          className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full text-md w-fit bg-gGreen lg:px-10 lg:py-4 lg:text-xl"
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
                            className="h-10 w-[95%]  rounded-full bg-gGray px-6 py-2 text-center  text-sm text-black outline-none lg:h-12 lg:w-[400px] lg:px-8 lg:text-left lg:text-lg"
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
                            className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full text-md w-fit bg-gGreen lg:px-10 lg:py-4 lg:text-xl"
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
                        className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full text-md w-fit bg-gGreen lg:px-10 lg:py-4 lg:text-xl"
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

          {/* gallery and green container */}
          <div className="flex flex-row items-center justify-center w-full px-32 py-16 space-x-32">
            <Carousel imageUrls={appData.projectInView.gallery} />

            {/* green* container */}
            <div className="grid items-center justify-center grid-cols-3 grid-rows-1 py-12 my-16 space-y-12 lg:grid-cols-1 lg:space-y-6">
              <div className="flex flex-col items-center justify-center space-y-2 text-black">
                <p className="text-2xl font-bold underline underline-offset-2">
                  Ownership
                </p>
                <p className="text-2xl font-semibold capitalize">
                  {appData.projectInView.metadata.ownership}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-black">
                <p className="text-2xl font-bold underline underline-offset-2">
                  Project Size
                </p>
                <p className="text-2xl font-semibold capitalize">
                  {appData.projectInView.metadata.size} Ha
                </p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-black">
                <p className="text-2xl font-bold underline underline-offset-2">
                  Intervention Type
                </p>
                <p className="text-2xl font-semibold capitalize">
                  {appData.projectInView.seasons.length}
                </p>
              </div>
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
              <div className="flex flex-col items-center justify-center w-full space-x-0 space-y-6 pb-28 lg:flex-row lg:space-x-12 lg:space-y-0">
                <button
                  className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg btn h-fit w-80 bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setStoryInView(appData.projectInView.story);
                    window.my_modal_1.showModal();
                  }}
                >
                  Project Story
                </button>
                <button
                  className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg btn h-fit w-80 bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("links");
                  }}
                >
                  Links
                </button>
                <button
                  className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg btn h-fit w-80 bg-gGreen hover:bg-gGreen/80"
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
            className="items-start justify-center w-screen px-8 py-16 overflow-auto modal bg-gGreen/20 lg:w-full lg:px-28"
          >
            <div
              method="dialog"
              className="w-full p-8 bg-white rounded-3xl lg:p-12"
            >
              {/* body goes here */}
              <div className="flex flex-col w-full space-y-4">
                <div className="flex flex-col items-center w-full space-y-4 lg:flex-row lg:justify-between">
                  <p className="text-xl font-bold text-center lg:text-4xl">
                    Project Story
                  </p>
                  <div className="flex flex-row items-center space-x-8">
                    <button
                      className="text-sm text-white capitalize border-2 btn border-gGreen bg-gGreen hover:border-2 hover:border-gGreen hover:bg-gGreen lg:text-lg"
                      onClick={() => {
                        toast.error(
                          "This feature is not available yet. Please navigate to 'Platform' to view different project",
                        );
                        // navigate(
                        //   "/platform/projects/view/" + storyInView[0]?.projectId
                        // );
                      }}
                    >
                      View Project
                    </button>
                    <form method="dialog">
                      <button className="text-sm capitalize border-2 btn border-gGreen bg-gGreen bg-white/0 text-gGreen hover:border-2 hover:border-gGreen hover:bg-white lg:text-lg">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
                <div className="divider"></div>

                <div className="flex flex-col w-full space-y-4">
                  <div className="flex flex-row items-start space-x-4">
                    <p className="w-full text-2xl font-black text-center focus:outline-none lg:text-5xl">
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
                              className="object-cover w-24 h-24 rounded-md lg:h-44 lg:w-44"
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
          <div className="flex flex-col w-full px-16 pt-12 space-y-4 pb-28 lg:px-32">
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
