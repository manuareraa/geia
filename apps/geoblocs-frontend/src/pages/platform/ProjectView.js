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
import Navbar from "../../components/Navbar";
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
import geoIcon from "../../assets/img/geoblocs-small-icon.png";
import plantingimg from "../../assets/img/dashboard/plantingimg.png";
import monitoringimg from "../../assets/img/dashboard/monitoringimg.png";
import projectdataimg from "../../assets/img/dashboard/projectdataimg.png";
import sponsorsimg from "../../assets/img/dashboard/sponsorsimg.png";
import "../../utils/TooltipStyles.css";
import ownershipIcon from "../../assets/img/dashboard/projectOwnership.png";
import sizeIcon from "../../assets/img/dashboard/projectSize.png";
import interventionIcon from "../../assets/img/dashboard/interventionType.png";

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "../../components/platform/projectView/MapComponent";
import { qrCodes } from "../../utils/qrcodes";
import { textTrimmer } from "../../utils/utils";

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
    getProjectById,
    getProjectTokenDetails,
    updateProjectTokenDetails,
  } = useContext(AppContext);
  const { projectId, qrcode } = useParams();
  const [subWindow, setSubWindow] = useState("default");
  const [storyInView, setStoryInView] = useState([]);
  const [formData, setFormData] = useState({});
  const [buyContainerView, setBuyContainerView] = useState(false);
  const [redeemContainerView, setRedeemContainerView] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState(false);
  const [redeeemInProcess, setRedeemInProcess] = useState(false);
  const [latLong, setLatLong] = useState([51.903614, -8.468399]);
  const [mapCenter, setMapCenter] = useState([51.903614, -8.468399]);
  const [redeemEnabled, setRedeemEnabled] = useState(false);
  const [buyEnabled, setBuyEnabled] = useState(false);
  const [tokenBalDetails, setTokenBalDetails] = useState({});
  const [checkoutEnabled, setCheckoutEnabled] = useState(true);

  const ChangeView = ({ center }) => {
    console.log("executing change view", center);
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
    console.log("validating", latLonArray);
    try {
      // remove white space in the string
      latLonArray = latLonArray.replace(/\s/g, "");
      latLonArray = latLonArray.split(",");
      latLonArray[0] = parseFloat(latLonArray[0]);
      latLonArray[1] = parseFloat(latLonArray[1]);
      console.log("latLonArray after parsing", latLonArray);
    } catch (error) {
      console.error("Error parsing latLonArray", error);
      return false;
    }

    // Check if the array has exactly two elements
    if (latLonArray.length !== 2) return false;
    console.log("1");

    // Check if lat and lon are numbers
    if (
      typeof latLonArray[0] !== "number" ||
      typeof latLonArray[1] !== "number"
    )
      return false;
    console.log("2");

    // Check the range of lat and lon values
    if (
      latLonArray[0] < -90 ||
      latLonArray[0] > 90 ||
      latLonArray[1] < -180 ||
      latLonArray[1] > 180
    )
      return false;
    console.log("3");

    // If all checks pass, return true
    position = latLonArray;
    // setLatLong(latLonArray);
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
            console.log("RDM 1");
            setRedeemStatus(true);
            setRedeemInProcess(false);
            setRedeemEnabled(false);
            localStorage.setItem("geoblocsr", "asdfghjkl");
            updateTokenBalance(projectId, tokenBalDetails, 1, "redeem", qrcode);
            navigate("/platform/projects/view/" + projectId);
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
                console.log("RDM 2");
                setRedeemStatus(true);
                setRedeemInProcess(false);
                setRedeemEnabled(false);
                localStorage.setItem("geoblocsr", "asdfghjkl");
                updateTokenBalance(
                  projectId,
                  tokenBalDetails,
                  1,
                  "redeem",
                  qrcode,
                );
                navigate("/platform/projects/view/" + projectId);
                return true;
              } else {
                toast.error("Cannot redeem at the moment. Please try again.");
              }
            }
          } else {
            toast.error("Cannot redeem at the moment. Please try again.");
          }
        }
        // toast.success("Geoblocs Redeemed");
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
              console.log("RDM 5");
              setRedeemStatus(true);
              setRedeemInProcess(false);
              setRedeemEnabled(false);
              localStorage.setItem("geoblocsr", "asdfghjkl");
              updateTokenBalance(
                projectId,
                tokenBalDetails,
                1,
                "redeem",
                qrcode,
              );
              navigate("/platform/projects/view/" + projectId);
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
                  console.log("RDM 3");
                  setRedeemInProcess(false);
                  setRedeemStatus(true);
                  setRedeemEnabled(false);
                  localStorage.setItem("geoblocsr", "asdfghjkl");
                  updateTokenBalance(
                    projectId,
                    tokenBalDetails,
                    1,
                    "redeem",
                    qrcode,
                  );
                  navigate("/platform/projects/view/" + projectId);
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
              console.log("RDM 4");
              setRedeemInProcess(false);
              setRedeemStatus(true);
              setRedeemEnabled(false);
              localStorage.setItem("geoblocsr", "asdfghjkl");
              updateTokenBalance(
                projectId,
                tokenBalDetails,
                1,
                "redeem",
                qrcode,
              );
              navigate("/platform/projects/view/" + projectId);
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
      console.log("User is logged in");
      // if an address already exists
      if (
        appData.userProfile.blockchainAcc &&
        appData.userProfile.blockchainAcc.seed
      ) {
        console.log("User has an existing address");
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
          console.log("Token transfer successful");
          toast.success("Geoblocs Purchased");
          setBuyContainerView(false);
          setRedeemContainerView(false);
          toast.success("Please wait for the page to reload...");
          await updateTokenBalance(
            projectId,
            tokenBalDetails,
            parseInt(formData.quantity),
            "buy",
            qrcode,
          );
          // reload the page after 3 seconds
          setTimeout(() => {
            console.log("Reloading page...");
            window.location.reload();
          }, 3000);
        } else {
          console.log("Token transfer failed");
          toast.error("Cannot purchase at the moment. Please try again.");
        }
      } else {
        console.log("User does not have an existing address");
        // if an address does not exist before
        // create the account
        const accCreationResult = await createNewUniqueNetworkAcc(
          details.payer.email_address,
        );

        if (accCreationResult !== false) {
          console.log("Blockchain account created");
          // update the profile in the database and appData
          const profileUpdateResult = await updateBlockchainAccInUser(
            appData.userProfile.uuid,
            accCreationResult,
          );

          if (profileUpdateResult === true) {
            console.log("Profile updated with new blockchain account");
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
              console.log("Token transfer successful");
              toast.success("Geoblocs Purchased");
              setBuyContainerView(false);
              setRedeemContainerView(false);
              toast.success("Please wait for the page to reload...");
              await updateTokenBalance(
                projectId,
                tokenBalDetails,
                parseInt(formData.quantity),
                "buy",
                qrcode,
              );
              // reload the page after 3 seconds
              setTimeout(() => {
                console.log("Reloading page...");
                window.location.reload();
              }, 3000);
            } else {
              console.log("Token transfer failed");
              toast.error("Cannot purchase at the moment. Please try again.");
            }
          }
        } else {
          console.log("Blockchain account creation failed");
          toast.error("Cannot redeem at the moment. Please try again.");
        }
      }
      // toast.success("Geoblocs Redeemed");
    } else {
      console.log("User is not logged in or is the admin");
      // if not logged in or if it is the admin (do nothing)

      // check if the user actually exists
      const checkUser = await checkUserExistence(details.payer.email_address);

      // if exists
      if (checkUser !== false) {
        console.log("User exists");
        if (
          checkUser.blockchainAcc &&
          checkUser.blockchainAcc.keyfile.address
        ) {
          console.log("User has an existing address");
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
            console.log("Token transfer successful");
            toast.success("Geoblocs Purchased");
            setBuyContainerView(false);
            setRedeemContainerView(false);
            toast.success("Please wait for the page to reload...");
            await updateTokenBalance(
              projectId,
              tokenBalDetails,
              parseInt(formData.quantity),
              "buy",
              qrcode,
            );
            // reload the page after 3 seconds
            setTimeout(() => {
              console.log("Reloading page...");
              window.location.reload();
            }, 3000);
          } else {
            console.log("Token transfer failed");
            toast.error("Cannot purchase at the moment. Please try again.");
          }
        } else {
          console.log("User exists but does not have a blockchain account");
          const accCreationResult = await createNewUniqueNetworkAcc(
            details.payer.email_address,
          );

          console.log("accCreationResult", accCreationResult, checkUser);
          if (accCreationResult !== false) {
            console.log("Blockchain account created");
            // update the profile in the database and appData
            const profileUpdateResult = await updateBlockchainAccInUser(
              checkUser.uuid,
              accCreationResult,
            );

            if (profileUpdateResult === true) {
              console.log("Profile updated with new blockchain account");
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
                console.log("Token transfer successful");
                toast.success("Geoblocs Purchased");
                setBuyContainerView(false);
                setRedeemContainerView(false);
                toast.success("Please wait for the page to reload...");
                await updateTokenBalance(
                  projectId,
                  tokenBalDetails,
                  parseInt(formData.quantity),
                  "buy",
                  qrcode,
                );
                // reload the page after 3 seconds
                setTimeout(() => {
                  console.log("Reloading page...");
                  window.location.reload();
                }, 3000);
              } else {
                console.log("Token transfer failed");
                toast.error("Cannot purchase at the moment. Please try again.");
              }
            }
          } else {
            console.log("Blockchain account creation failed");
            toast.error("Cannot redeem at the moment. Please try again.");
          }
        }
      } else {
        console.log("User does not exist");
        // if user does not exist

        // generate a 12 character random alpha numeric password
        const randomPassword = Math.random().toString(36).slice(-12);

        const createUser = await userRegisterQuietMode(
          details.payer.email_address,
          randomPassword,
          "buyer",
        );

        if (createUser !== false) {
          console.log("User registered");
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
            console.log("Token transfer successful");
            toast.success("Geoblocs Purchased");
            setBuyContainerView(false);
            setRedeemContainerView(false);
            toast.success("Please wait for the page to reload...");
            await updateTokenBalance(
              projectId,
              tokenBalDetails,
              parseInt(formData.quantity),
              "buy",
              qrcode,
            );
            // reload the page after 3 seconds
            setTimeout(() => {
              console.log("Reloading page...");
              window.location.reload();
            }, 3000);
          } else {
            console.log("Token transfer failed");
            toast.error("Cannot purchase at the moment. Please try again.");
          }
        }
      }
    }
  };

  const checkSponsorId = (projectId, sponsorId) => {
    const project = qrCodes[projectId];
    if (project) {
      return project.includes(sponsorId);
    }
    return false;
  };

  const checkAndVerifyBalance = async (projectId, type) => {
    console.log("CAVTB", type);
    let data = await getProjectTokenDetails(projectId);
    data = data.project;
    console.log("tokendata", data);
    setTokenBalDetails(data);
    if (type === "buy") {
      if (data !== undefined) {
        const bal = data.currentBalance - (data.reserved - data.redeemed);
        console.log("bala", bal);
        if (bal > 0) {
          setBuyEnabled(true);
        }
      } else {
        setBuyEnabled(false);
      }
    } else {
      if (data !== undefined) {
        const sponsorData = data.sponsors.filter((sponsor) => {
          return sponsor.sponsorId === qrcode;
        });
        if (sponsorData.length > 0) {
          const sponsor = sponsorData[0];
          if (sponsor.tokenBalance > 0) {
            setRedeemEnabled(true);
          }
        } else {
          setRedeemEnabled(false);
        }
      }
    }
  };

  const updateTokenBalance = async (
    projectId,
    tokenDetails,
    deduct,
    type,
    sponsorId,
  ) => {
    console.log("UTB");
    let tempTokDet = tokenDetails;
    deduct = parseInt(deduct);
    if (type === "buy") {
      console.log("inparam", projectId, tokenDetails, deduct, type, sponsorId);
      tempTokDet.currentBalance = tempTokDet.currentBalance - deduct;
      console.log(
        "tempTokDet",
        tempTokDet.bought,
        deduct,
        tempTokDet.bought + deduct,
        tempTokDet.bought - deduct,
      );
      tempTokDet.bought = tempTokDet.bought + deduct;
      console.log("tempTokDet", tempTokDet);
    } else if (type === "redeem") {
      tempTokDet.currentBalance = tempTokDet.currentBalance - deduct;
      tempTokDet.redeemed = tempTokDet.redeemed + deduct;
      const sponsorData = tempTokDet.sponsors.filter((sponsor) => {
        return sponsor.sponsorId === sponsorId;
      });
      const remArray = tempTokDet.sponsors.filter((sponsor) => {
        return sponsor.sponsorId !== sponsorId;
      });
      console.log("sponsorData", sponsorData, sponsorId);
      sponsorData[0].tokensRedeemed = sponsorData[0].tokensRedeemed + deduct;
      sponsorData[0].tokenBalance =
        sponsorData[0].tokensSponsored - sponsorData[0].tokensRedeemed;
      remArray.push(sponsorData[0]);
      tempTokDet.sponsors = [...remArray];
      console.log("tempTokDet", tempTokDet, remArray, sponsorData);
    }
    const result = await updateProjectTokenDetails(projectId, tempTokDet);
    console.log("UTB result", result);
  };

  useEffect(() => {
    // qrcode handler
    console.log("qrcode", qrcode, qrCodes);
    if (qrcode !== undefined) {
      if (checkSponsorId(projectId, qrcode) === true) {
        console.log("Valid QRCODE Found**");
        const localRedeemStatus = localStorage.getItem("geoblocsr");
        if (localRedeemStatus !== "asdfghjkl") {
          checkAndVerifyBalance(projectId, "redeem");
        }
      } else {
        console.log("Invalid QRCODE Found**");
      }
    } else {
      console.log("No QRCODE Found**");
    }

    // projectdata handler
    console.log("appData", appData);
    const getProjectDataFromDB = async () => {
      console.log("Getting project data from DB", projectId);
      const projectData = await getProjectById(projectId);
      console.log("getprojectbyid ::", projectData);
      if (projectData.status !== "success") {
        navigate("/platform/projects");
        return false;
      } else {
        console.log("Project data >> ", projectData);
        // buy only handler
        checkAndVerifyBalance(projectId, "buy");
        isValidLatLon(projectData.project.metadata.gps);
        setAppData((prevState) => {
          return {
            ...prevState,
            projectInView: projectData.project,
          };
        });
        return true;
      }
    };

    // in view project handler
    if (Object.keys(appData.projectInView).length > 0) {
      console.log(appData.projectInView);
      checkAndVerifyBalance(projectId, "buy");
      isValidLatLon(appData.projectInView.metadata.gps);
    } else {
      getProjectDataFromDB();
    }
  }, []);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const render = (status) => {
    if (status === Status.FAILURE) {
      console.log("error occured while rendering maps", status);
    }
    console.log("loading...");
  };

  const mapOptions = {
    center: {
      lat: position[0], // latitude
      lng: position[1], // longitude
    },
    zoom: 4,
  };

  return (
    <>
      {Object.keys(appData.projectInView).length > 0 ? (
        <div className="flex flex-col justify-center w-full">
            <Navbar />
          {/* title container */}
          <div className="flex flex-col">
            {/* top gray container */}
            <div className="flex w-full flex-col items-center justify-center mb-0 lg:mb-16 space-y-10 bg-[#b7b7b7] sm:p-4 px-2 py-8 lg:flex-row lg:justify-between lg:space-x-8 space-y-8 lg:space-y-0 lg:px-16">
              {/* back button container */}
              <div className="flex flex-row items-center space-x-4">
                <img
                  src={geoIcon}
                  alt="Back"
                  className="w-8 hover:cursor-pointer lg:w-12"
                  onClick={() => navigate("/platform/projects")}
                ></img>
                <p
                  className="text-md md:text-md font-bold underline underline-offset-2 hover:cursor-pointer lg:text-lg"
                  onClick={() => navigate("/platform/projects")}
                >
                  Back to explore projects
                </p>
              </div>

              {/* center container */}
              <div className="px-2">
                <p className="text-center text-3xl font-bold ">
                  {appData.projectInView.metadata.projectName}
                </p>
              </div>

              {/* end container */}
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
                  <img src={calendarIcon} className="w-4 lg:w-6"></img>
                  <p className="font-bold">
                    Start Date:&nbsp;
                    <span className="font-medium">
                      {appData.projectInView.metadata.startedFrom}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
                  <img src={locationIcon} className="w-4 lg:w-6"></img>
                  <p className="font-bold">
                    Location:&nbsp;
                    <span className="font-medium">
                      {appData.projectInView.metadata.location}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="round flex flex-col items-center justify-between gap-y-4 border-2 border-gGray px-8 lg:mx-32 lg:flex-row lg:gap-x-10 lg:gap-y-0 2xl:flex-row">
              {/* left container for carousel */}
              <Carousel imageUrls={appData.projectInView.gallery} />

              {/* right - title sub-container */}
              <div className="flex w-full flex-col">
                {/*  for description */}
                <div className="flex w-full flex-col space-y-4 border-2 border-gGray p-2 lg:items-start">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-2xl font-bold">
                      Project&nbsp;
                      <span className="text-gGreen">Description</span>
                    </p>
                    <p className="text-center text-lg">
                      {textTrimmer(
                        appData.projectInView.metadata.description,
                        550,
                      ) || <>No Description Available.</>}
                    </p>
                  </div>
                </div>

                {/* green* container - ownership / size / intervention */}
                <div className="lg:gap-y- my-4 grid w-full grid-cols-1 grid-rows-3 items-center justify-center gap-y-4 lg:w-full lg:grid-cols-1 lg:py-2">
                  <div className="flex w-full flex-row items-center space-x-4 border-2 border-gGray p-2 text-black">
                    <img className="w-8" src={ownershipIcon}></img>
                    <p className="text-xl font-bold text-gGreen">Ownership</p>
                    <p className="text-xl capitalize">
                      {appData.projectInView.metadata.ownership}
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center space-x-4 border-2 border-gGray p-2 text-black">
                    <img className="w-8" src={sizeIcon}></img>
                    <p className="text-xl font-bold text-gGreen">
                      Project Size
                    </p>
                    <p className="text-xl capitalize">
                      {appData.projectInView.metadata.size} Ha
                    </p>
                  </div>
                  <div className="flex w-full flex-row items-center space-x-4 border-2 border-gGray p-2 text-black">
                    <img className="w-8" src={interventionIcon}></img>
                    <p className="text-xl font-bold text-gGreen">
                      Intervention
                    </p>
                    <p className="text-xl capitalize">
                      {appData.projectInView.metadata.interventionType || null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* charts container */}
          <div className="my-10 flex flex-col items-center justify-center space-x-0 space-y-8 lg:flex-row lg:gap-x-8 lg:space-y-0">
            {/* project status chart */}
            <div className="flex w-fit flex-col items-center justify-center space-y-6 focus:outline-none">
              <StatusChart
                completed={appData.projectInView.metadata.projectStatus}
                inProgress={100 - appData.projectInView.metadata.projectStatus}
              />
              <p className="text-center text-2xl font-bold">
                Project <span className="text-gBlue">Status</span>
              </p>
            </div>

            {/* geoblocs distribution chart */}
            <div className="flex w-fit flex-col items-center justify-center space-y-6 focus:outline-none">
              <GeoblocsChart
                totalSupply={appData.projectInView.geoblocsData.totalSupply}
                purchased={appData.projectInView.geoblocsData.purchased}
              />
              <p className="text-center text-2xl font-bold">
                <span className="text-gGreen">Geoblocs</span> Distribution
              </p>
            </div>

            {/* nft image */}
            <div>
              <img
                src={appData.projectInView.metadata.nftImage || null}
                className="h-96 w-96 border-8 border-black"
              ></img>
            </div>
          </div>

          {/* geoblocs stats */}
          <div className="mt-8 lg:mt-16 grid w-full grid-cols-1 items-center justify-center gap-y-8 bg-[#B5BFA4] py-8 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-0 lg:px-60">
            {/* buy geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className={
                  buyEnabled === true
                    ? "text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
                    : "text-md disabled w-fit rounded-full border-0 bg-gGreen/40 px-8 py-2 font-bold capitalize text-white disabled:cursor-not-allowed lg:px-10 lg:py-4 lg:text-xl"
                }
                onClick={() => {
                  setBuyContainerView(!buyContainerView);
                  setRedeemContainerView(false);
                }}
                disabled={buyEnabled === true ? false : true}
              >
                Buy Geoblocs
              </button>
            </div>

            {/* remaining geoblocs */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-md text-center font-bold lg:text-lg">
                Geoblocs Remaining
              </p>
              <p className="text-4xl lg:text-5xl">
                {parseInt(appData.projectInView.geoblocsData.totalSupply) -
                  appData.projectInView.geoblocsData.purchased}
              </p>
            </div>

            {/* total supply */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-md text-center font-bold lg:text-lg">
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
                className={
                  redeemEnabled === true
                    ? "text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
                    : "text-md disabled w-fit rounded-full border-0 bg-gGreen/40 px-8 py-2 font-bold capitalize text-white disabled:cursor-not-allowed lg:px-10 lg:py-4 lg:text-xl"
                }
                onClick={() => {
                  setRedeemContainerView(!redeemContainerView);
                  setBuyContainerView(false);
                }}
                disabled={redeemEnabled === true ? false : true}
              >
                Redeem Geoblocs
              </button>
            </div>

            {buyContainerView === true ? (
              <div className="col-span-1 w-full lg:col-span-4">
                <div className="mt-12 flex flex-col items-center justify-center rounded-lg bg-gGreen/30 py-8 lg:w-full">
                  {appData.loginMode !== "user" ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <p>
                        €&nbsp;
                        {appData.projectInView.geoblocsData.pricePerGeobloc} per
                        Geobloc
                      </p>
                      <input
                        type="text"
                        placeholder="Geoblocs to purchase"
                        disabled={checkoutEnabled === true ? false : true}
                        className="h-10 w-[95%]  rounded-full bg-gGray px-6 py-2 text-center  text-sm text-black outline-none disabled:bg-gGray/40 lg:h-12 lg:w-[400px] lg:px-8 lg:text-left lg:text-lg"
                        value={formData.quantity}
                        onChange={(e) => {
                          console.log("formq", formData.quantity);
                          setFormData((prevState) => {
                            return {
                              ...prevState,
                              quantity: e.target.value,
                              totalCost:
                                e.target.value *
                                appData.projectInView.geoblocsData
                                  .pricePerGeobloc,
                            };
                          });
                        }}
                      ></input>
                      <p className="text-md font-bold lg:text-xl">
                        {(appData.projectInView.geoblocsData.pricePerGeobloc &&
                          formData.quantity &&
                          appData.projectInView.geoblocsData.pricePerGeobloc *
                            formData.quantity ===
                            0) ||
                        appData.projectInView.geoblocsData.pricePerGeobloc *
                          formData.quantity >
                          0
                          ? (
                              appData.projectInView.geoblocsData
                                .pricePerGeobloc * formData.quantity
                            ).toFixed(3)
                          : 0}
                        &nbsp;EUR
                      </p>
                      {/* <button className="px-8 py-2 font-bold text-white capitalize border-0 rounded-full lg:px-10 lg:py-4 lg:text-xl text-md w-fit bg-gGreen">
                        Proceed to Checkout
                      </button> */}
                      {formData.quantity > 0 && formData.quantity <= 20 ? (
                        <>
                          {checkoutEnabled === true ? (
                            <button
                              className="text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
                              onClick={() => setCheckoutEnabled(false)}
                            >
                              Checkout
                            </button>
                          ) : (
                            <div className="flex w-full flex-col items-center justify-center">
                              <Paypal
                                successCallback={onPaypalSuccess}
                                price={formData.totalCost || 0}
                              />
                              <button
                                className="text-md lg:text-md btn-sm w-fit rounded-full border-0 bg-gGreen px-8 font-bold capitalize text-white lg:px-10"
                                onClick={() => setCheckoutEnabled(true)}
                              >
                                Edit Quantity
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <p>Please enter a quantity between 1 and 20</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="flex flex-col items-center space-y-6 lg:flex-row lg:space-x-4 lg:space-y-0">
                        <button
                          className="text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
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
                          className="text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
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
              <div className="col-span-1 w-full lg:col-span-4">
                <div className="mt-12 flex w-full flex-col items-center justify-center rounded-lg bg-gGreen/30 py-8">
                  {appData.loginMode !== "user" ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                      {redeemStatus === true ? (
                        <p className="text-center text-lg font-bold lg:text-xl">
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
                              setFormData((prevState) => {
                                return {
                                  ...prevState,
                                  redeemEmail: e.target.value,
                                };
                              })
                            }
                          ></input>
                          <button
                            disabled={redeeemInProcess}
                            className="text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
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
                        <span className="text- font-bold">
                          {" "}
                          {appData.userProfile.email}
                        </span>
                      </p>
                      <button
                        disabled={redeeemInProcess}
                        className="text-md w-fit rounded-full border-0 bg-gGreen px-8 py-2 font-bold capitalize text-white lg:px-10 lg:py-4 lg:text-xl"
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

          {/* map and green container */}
          <div className="flex w-full flex-col items-center justify-center bg-white px-4 lg:flex-row lg:space-x-32 lg:px-32 lg:py-16">
            {/* map container */}
            <div className="flex flex-col items-center justify-center w-full mt-10 md:mt-10 lg:mt-0">
              <MapComponent
                lat={mapCenter[0]}
                lon={mapCenter[1]}
                label={appData.projectInView.metadata.projectName}
              />

              {/* map container */}
              {/* <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{
                    height: "50vh",
                    width: "100%",
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <ChangeView center={mapCenter} />
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={mapCenter} icon={customIcon}>
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
                </MapContainer> */}

              {/* <button
                  className="px-6 py-0 my-0 text-xs font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen lg:px-6 lg:py-1"
                  onClick={() => {
                    console.log("button clicked position", position);
                    setMapCenter(latLong);
                  }}
                >
                  Recenter
                </button> */}
            </div>
          </div>

          {subWindow === "default" ? (
            <>
              {/* 4 option container */}
              <div className="mt-8 flex flex-col items-center justify-center space-y-6 py-8 lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 lg:pt-0">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="w-[75%] lg:w-[17%] button-3d flex h-full flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("sponsors");
                  }}
                >
                  <p className="text-xl font-bold text-black">Sponsors</p>
                  <img src={sponsorsimg} alt="Sponsors" className="w-40" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="w-[75%] lg:w-[17%] button-3d flex h-full flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("season");
                  }}
                >
                  <p className="text-xl font-bold text-black">
                    Planting Season
                  </p>
                  <img src={plantingimg} alt="Sponsors" className="w-40" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="w-[75%] lg:w-[17%] button-3d flex h-full flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("monitoring");
                  }}
                >
                  <p className="text-xl font-bold text-black">Monitoring</p>
                  <img src={monitoringimg} alt="Sponsors" className="w-40" />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="w-[75%] lg:w-[17%] button-3d flex h-full flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    setSubWindow("environment");
                  }}
                >
                  <p className="text-xl font-bold text-black">Project Data</p>
                  <img src={projectdataimg} alt="Sponsors" className="w-40" />
                </motion.div>
              </div>

              {/* 3 button container */}
              <div className="flex w-full flex-col items-center justify-center space-x-0 space-y-6 pb-8 lg:flex-row lg:space-x-12 lg:space-y-0 lg:pb-20">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="button-3d btn h-fit w-80 rounded-lg bg-gGreen px-16 py-4 text-xl font-bold capitalize text-white shadow-lg hover:bg-gGreen/80"
                  onClick={() => {
                    setStoryInView(appData.projectInView.story);
                    window.my_modal_1.showModal();
                  }}
                >
                  Project Story
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="button-3d btn h-fit w-80 rounded-lg bg-gGreen px-16 py-4 text-xl font-bold capitalize text-white shadow-lg hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("links");
                  }}
                >
                  Links
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.0 }}
                  className="button-3d btn h-fit w-80 rounded-lg bg-gGreen px-16 py-4 text-xl font-bold capitalize text-white shadow-lg hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("documents");
                  }}
                >
                  Documents
                </motion.button>
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
            className="modal w-screen items-start justify-center overflow-auto bg-gGreen/20 px-8 py-16 lg:w-full lg:px-28"
          >
            <div
              method="dialog"
              className="w-full rounded-3xl bg-white p-8 lg:p-12"
            >
              {/* body goes here */}
              <div className="flex w-full flex-col space-y-4">
                <div className="flex w-full flex-col items-center space-y-4 lg:flex-row lg:justify-between">
                  <p className="text-center text-xl font-bold lg:text-4xl">
                    Project Story
                  </p>
                  <div className="flex flex-row items-center space-x-8">
                    <button
                      className="btn border-2 border-gGreen bg-gGreen text-sm capitalize text-white hover:border-2 hover:border-gGreen hover:bg-gGreen lg:text-lg"
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
                      <button className="btn border-2 border-gGreen bg-gGreen bg-white/0 text-sm capitalize text-gGreen hover:border-2 hover:border-gGreen hover:bg-white lg:text-lg">
                        Close
                      </button>
                    </form>
                  </div>
                </div>
                <div className="divider"></div>

                <div className="flex w-full flex-col space-y-4">
                  <div className="flex flex-row items-start space-x-4">
                    <p className="w-full text-center text-2xl font-black focus:outline-none lg:text-5xl">
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
                        <div className="flex w-full flex-row items-center justify-center pb-2">
                          {block.file !== null ? (
                            <img
                              src={block.file}
                              alt="Image"
                              className="h-24 w-24 rounded-md object-cover lg:h-44 lg:w-44"
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
          <LandConditions
            landConditions={appData.projectInView.conditions}
            coverImage={appData.projectInView.metadata.baselineImage || null}
          />

          {/* similar projects */}
          <div className="flex w-full flex-col space-y-4 px-16 pb-16 lg:pb-28 pt-12 lg:px-32">
            <div className="mb-8 flex w-full flex-col items-center space-y-2 lg:items-start">
              <p className="text-center text-3xl font-bold">
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
