import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUserStore,
  useTransactionStore,
} from "../state-management/AppState";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { inAppWallet, hasStoredPasskey } from "thirdweb/wallets/in-app";
import { client } from "../state-management/thirdwebClient";
import { useConnect, ConnectButton } from "thirdweb/react";

import geoIcon from "../assets/img/geoblocs-small-icon.png";
import calendarIcon from "../assets/img/dashboard/calendar-icon.png";
import locationIcon from "../assets/img/dashboard/location-icon.png";
import ownershipIcon from "../assets/img/dashboard/projectOwnership.png";
import sizeIcon from "../assets/img/dashboard/projectSize.png";
import interventionIcon from "../assets/img/dashboard/interventionType.png";
import plantingimg from "../assets/img/dashboard/plantingimg.png";
import monitoringimg from "../assets/img/dashboard/monitoringimg.png";
import projectdataimg from "../assets/img/dashboard/projectdataimg.png";
import sponsorsimg from "../assets/img/dashboard/sponsorsimg.png";

import Carousel from "../components/Carousel";
import StatusChart from "../components/admin/StatusChart";
import GeoblocsChart from "../components/admin/GeoblocsChart";
import Paypal from "../components/Paypal";
import MapComponent from "../components/platform/projectView/MapComponent";

// subwindows
import SponsorsSW from "../components/platform/projectView/subWindows/SponsorsSW";
import MonitorsSW from "../components/platform/projectView/subWindows/MonitorsSW";
import SeasonsSW from "../components/platform/projectView/subWindows/SeasonsSW";
import EnvironmentSW from "../components/platform/projectView/subWindows/EnvironmentSW";
import LinksSW from "../components/platform/projectView/subWindows/LinksSW";
import DocumentsSW from "../components/platform/projectView/subWindows/DocumentsSW";
import LandConditions from "../components/platform/projectView/LandConditions";
import toast from "react-hot-toast";

function ProjectView(props) {
  const { projectId, sponsorId } = useParams();
  const {
    fetchProjectDetails,
    fetchProjectById,
    allProjects,
    fetchOnChainTokenData,
    setWalletAddress,
    walletAddress,
  } = useUserStore();
  const { buyTokens, redeemTokens, transferTokens, txnStatus } =
    useTransactionStore();
  const [project, setProject] = useState({});
  const navigate = useNavigate();
  const [buyContainerView, setBuyContainerView] = useState(false);
  const [redeemContainerView, setRedeemContainerView] = useState(false);
  const [buyEnabled, setBuyEnabled] = useState(false);
  const [onChainTokenData, setOnChainTokenData] = useState({
    totalSupply: 0,
    availableSupply: 0,
  });
  const [redeemEnabled, setRedeemEnabled] = useState(false);
  const [formData, setFormData] = useState({
    quantity: 0,
    totalCost: 0,
  });
  const [checkoutEnabled, setCheckoutEnabled] = useState(true);
  const [redeeemInProcess, setRedeemInProcess] = useState(false);
  const [redeemStatus, setRedeemStatus] = useState(false);
  const [subWindow, setSubWindow] = useState("default");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [reservedTokens, setReservedTokens] = useState(0);

  // container that should open after passkey
  const [containerToOpen, setContainerToOpen] = useState("");

  useEffect(() => {
    if (projectId) {
      if (!allProjects[projectId]) {
        console.log("Not found in state", projectId);
        fetchProject();
      } else {
        console.log("Found in state", projectId, allProjects[projectId]);
        setProject(allProjects[projectId]);
      }
    }
  }, []);

  const fetchProject = async () => {
    const project = await fetchProjectById(projectId);
    setProject(project);
  };

  const textTrimmer = (text, length) => {
    if (text == undefined) {
      return text;
    }
    if (text.length > length) {
      return text.substring(0, length) + "...";
    } else {
      return text;
    }
  };

  const onPaypalSuccess = async (details, data) => {
    console.log("Paypal Success", details, data);
    setRedeemInProcess(true);
    await handleBuyTokens(data.orderID);
    setBuyContainerView(false);
    setFormData({
      quantity: 0,
      totalCost: 0,
    });
  };

  const calculateReservedTokens = (project) => {
    let reservedTokens = 0;
    if (project.sponsors) {
      project.sponsors.forEach((sponsor) => {
        reservedTokens += parseInt(sponsor.tokensSponsored);
      });
    }
    console.log("Reserved Tokens: ", reservedTokens);
    setReservedTokens(reservedTokens);
    return reservedTokens;
  };

  useEffect(() => {
    console.log("Project", project);
    if (Object.keys(project).length > 0) {
      const reservedTokens = calculateReservedTokens(project);
      // if (onChainTokenData.availableSupply > project.tokenData.reserved) {
      if (onChainTokenData.availableSupply > reservedTokens) {
        setBuyEnabled(true);
      }
      // check if the sponsorId from params is present in the project's sponsors array of objects with sponsorId
      if (project.sponsors) {
        console.log("Sponsor got its", project.sponsors);
        const sponsor = project.sponsors.find(
          (sponsor) => sponsor.sponsorId === sponsorId
        );
        console.log("Sponsor!!", sponsor);
        if (sponsor) {
          console.log("Sponsor", sponsor);
          if (
            parseInt(sponsor.tokensSponsored) >
            parseInt(sponsor.tokensClaimed || 0)
          ) {
            setRedeemEnabled(true);
          } else {
            console.log("All tokens claimed");
            setRedeemEnabled(false);
          }
        }
      }
      // fetch on chain token data
      fetchOnChainTokenData(project.tokenData.tokenId).then((data) => {
        setOnChainTokenData(data);
        if (data.availableSupply > project.tokenData.reserved) {
          setBuyEnabled(true);
        } else {
          setBuyEnabled(false);
        }
      });
    }
  }, [project]);

  const handleBuyTokens = async (orderId) => {
    console.log("Buy Tokens Executing");
    const txnData = {
      txnType: "buy",
      fromAddress: "0x3F6f50314f5e3A282ddBa77102711979f634A08b",
      toAddress: walletAddress,
      tokenId: project.tokenData.tokenId,
      qty: 1,
      orderId: orderId,
    };

    // const txnData = {
    //   txnType: "buy",
    //   fromAddress: "0x3F6f50314f5e3A282ddBa77102711979f634A08b",
    //   toAddress: "0x139c560EA48C5E6841BC3E7A8CebbC53c5c93EC9",
    //   tokenId: project.tokenData.tokenId,
    //   qty: 1,
    //   orderId: "9TU28527111036337",
    // };

    console.log("TxnData", txnData);

    const response = await buyTokens(txnData);

    if (response === "success") {
      console.log("Transaction was successful!");
      toast.success(
        "Transaction was successful! Thank you for buying Geoblocs.."
      );
      navigate("/wallet");
      return true;
    } else if (response === "failure") {
      console.log("Transaction failed. Please try again.");
    } else if (response === "duplicate") {
      toast.error(
        "Transaction dropped because of duplicacy. Redeem can be done only once."
      );
    } else {
      console.log("Transaction is pending...");
    }
  };

  const handleRedeemTokens = async () => {
    const txnData = {
      txnType: "redeem",
      fromAddress: "0x3F6f50314f5e3A282ddBa77102711979f634A08b",
      toAddress: walletAddress,
      tokenId: project.tokenData.tokenId,
      qty: 0,
      sponsorId: sponsorId,
    };

    // const txnData = {
    //   txnType: "redeem",
    //   fromAddress: "0x3F6f50314f5e3A282ddBa77102711979f634A08b",
    //   toAddress: "0x139c560EA48C5E6841BC3E7A8CebbC53c5c93EC9",
    //   tokenId: project.tokenData.tokenId,
    //   qty: 0,
    //   sponsorId: "e646138d-86cd-4dc9-aad4-fded7d34fc64",
    // };

    const response = await redeemTokens(txnData);

    console.log("Redeem Response", response);

    if (response === "success") {
      console.log("Transaction was successful!");
      toast.success(
        "Transaction was successful! Thank you for redeeming your tokens."
      );
      setRedeemInProcess(false);
      setRedeemContainerView(false);
      navigate("/wallet");
      // setRedeemEnabled(false)
      // set local storage cookies
      // localStorage.setItem("redeemStatus", true);
      return;
    } else if (response === "failure") {
      console.log("Transaction failed!");
      toast.error("Transaction failed. Please try again.");
      return;
    } else if (response === "duplicate") {
      toast.error(
        "Transaction dropped because of duplicacy. Redeem can be done only once."
      );
      setRedeemInProcess(false);
      setRedeemContainerView(false);
      // setRedeemEnabled(false)
    } else {
      console.log("Transaction is pending...");
    }
  };

  // ==================================
  // thirdweb Code
  // ==================================

  const [passkeyInProcess, setPasskeyInProcess] = useState(false);
  const { connect } = useConnect();

  const login = async (userStatus) => {
    try {
      setPasskeyInProcess(true);
      await connect(async () => {
        const wallet = inAppWallet();
        const hasPasskey = await hasStoredPasskey(client);
        if (userStatus === "new") {
          console.log("New User");
        } else {
          console.log("Existing User");
        }
        await wallet.connect({
          client,
          strategy: "passkey",
          // type: hasPasskey ? "sign-in" : "sign-up",
          type: userStatus === "new" ? "sign-up" : "sign-in",
        });
        console.log("Wallet", wallet);
        console.log("Account", wallet.getAccount());
        setWalletAddress(wallet.getAccount().address);
        if (containerToOpen === "redeem") {
          setRedeemContainerView(true);
        } else {
          setBuyContainerView(true);
        }
        return wallet;
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPasskeyInProcess(false);
    }
  };

  const isFirefox = () => {
    return navigator.userAgent.toLowerCase().includes("firefox");
    // return false;
  };

  return (
    <div className="flex flex-col w-full h-full mb-16">
      {/* authentication modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Have you already created a wallet for Geoblocs using "passkey"?
              </ModalHeader>
              <ModalBody>
                {isFirefox() ? (
                  <>
                    <p className="">
                      Unfortunately, we do not support Desktop Firefox for this
                      feature. Please use Chrome or Edge.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center gap-y-4">
                      <button
                        disabled={passkeyInProcess}
                        className="font-bold text-white btn bg-gGreen hover:bg-gGreen/80"
                        onClick={async () => {
                          await login("new");
                          onClose();
                        }}
                      >
                        No, I am a new user
                      </button>
                      <button
                        disabled={passkeyInProcess}
                        className="font-bold text-white btn bg-gGreen hover:bg-gGreen/80"
                        onClick={async () => {
                          await login("existing");
                          onClose();
                        }}
                      >
                        Yes, I have a passkey
                      </button>
                    </div>
                    <p className="pt-2 text-xs italic">
                      Please note: The wallet here does not refer to a
                      third-party wallet like Metamask or Trustwallet. It is a
                      wallet created and managed specifically by Geoblocs.
                    </p>

                    <p className="pt-2 text-xs italic">
                      Warning: Incase you have Free Download Manager extension
                      enabled, please disable it. It may block the transaction
                      process.
                    </p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-bold"
                  disabled={passkeyInProcess}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {Object.keys(project).length > 0 ? (
        <>
          {/* // title container */}
          <div className="flex flex-col">
            {/* top gray container */}
            <div className="mb-0 flex w-full flex-col items-center justify-center space-y-10 space-y-8 bg-[#b7b7b7] px-2 py-8 sm:p-4 lg:mb-16 lg:flex-row lg:justify-between lg:space-x-8 lg:space-y-0 lg:px-16">
              {/* back button container */}
              <div className="flex flex-row items-center space-x-4">
                <img
                  src={geoIcon}
                  alt="Back"
                  className="w-8 hover:cursor-pointer lg:w-12"
                  onClick={() => navigate("/explore-projects")}
                ></img>
                <p
                  className="font-bold underline text-md md:text-md underline-offset-2 hover:cursor-pointer lg:text-lg"
                  onClick={() => navigate("/explore-projects")}
                >
                  Back to explore projects
                </p>
              </div>

              {/* center container */}
              <div className="px-2">
                <p className="text-3xl font-bold text-center ">
                  {project.projectName}
                </p>
              </div>

              {/* end container */}
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
                  <img src={calendarIcon} className="w-4 lg:w-6"></img>
                  <p className="font-bold">
                    Start Date:&nbsp;
                    <span className="font-medium">
                      {/* {new Date(project.createdAt).toLocaleString()} */}
                      {project.createdAt}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row items-center justify-center space-x-2 lg:justify-start">
                  <img src={locationIcon} className="w-4 lg:w-6"></img>
                  <p className="font-bold">
                    Location:&nbsp;
                    <span className="font-medium">
                      {project.metadata.country}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between px-8 border-2 round gap-y-4 border-gGray lg:mx-32 lg:flex-row lg:gap-x-10 lg:gap-y-0 2xl:flex-row">
              {/* left container for carousel */}
              {/* <Carousel imageUrls={project.gallery} /> */}
              <Carousel imageUrls={project.imageGallery} />

              {/* right - title sub-container */}
              <div className="flex flex-col w-full">
                {/*  for description */}
                <div className="flex flex-col w-full p-2 space-y-4 border-2 border-gGray lg:items-start">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <p className="text-2xl font-bold">
                      Project&nbsp;
                      <span className="text-gGreen">Description</span>
                    </p>
                    <p className="text-lg text-center">
                      {textTrimmer(project.metadata.description, 500)}
                      {/* {textTrimmer(
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Seda nisl nec nisl consectetur facilisis. Nullam ac nisl necnisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis. Nullam ac nisl nec nisl consectetur facilisis.",
                        500
                      )} */}
                    </p>
                  </div>
                </div>

                {/* green* container - ownership / size / intervention */}
                <div className="grid items-center justify-center w-full grid-cols-1 grid-rows-3 my-4 lg:gap-y- gap-y-4 lg:w-full lg:grid-cols-1 lg:py-2">
                  <div className="flex flex-row items-center w-full p-2 space-x-4 text-black border-2 border-gGray">
                    <img className="w-8" src={ownershipIcon}></img>
                    <p className="text-xl font-bold text-gGreen">Ownership</p>
                    <p className="text-xl capitalize">
                      {project.metadata.ownership}
                    </p>
                  </div>
                  <div className="flex flex-row items-center w-full p-2 space-x-4 text-black border-2 border-gGray">
                    <img className="w-8" src={sizeIcon}></img>
                    <p className="text-xl font-bold text-gGreen">
                      Project Size
                    </p>
                    <p className="text-xl capitalize">
                      {project.metadata.areaSize}
                    </p>
                  </div>
                  <div className="flex flex-row items-center w-full p-2 space-x-4 text-black border-2 border-gGray">
                    <img className="w-8" src={interventionIcon}></img>
                    <p className="text-xl font-bold text-gGreen">
                      Intervention
                    </p>
                    <p className="text-xl capitalize">
                      {project.metadata.interventionType || null}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // charts container */}
          <div className="flex flex-col items-center justify-center my-10 space-x-0 space-y-8 lg:flex-row lg:gap-x-8 lg:space-y-0">
            {/* project status chart */}
            <div className="flex flex-col items-center justify-center space-y-6 w-fit focus:outline-none">
              <StatusChart
                completed={project.metadata.projectProgress}
                inProgress={100 - project.metadata.projectProgress}
              />
              <p className="text-2xl font-bold text-center">
                Project <span className="text-gBlue">Status</span>
              </p>
            </div>

            {/* geoblocs distribution chart */}
            <div className="flex flex-col items-center justify-center space-y-6 w-fit focus:outline-none">
              <GeoblocsChart totalSupply={1000} purchased={900} />
              <p className="text-2xl font-bold text-center">
                <span className="text-gGreen">Geoblocs</span> Distribution
              </p>
            </div>

            {/* nft image */}
            <div>
              <img
                src={project.metaImages.nft || null}
                className="border-8 border-black h-96 w-96"
              ></img>
            </div>
          </div>
          {/* geoblocs stats */}
          <div className="mt-8 grid w-full grid-cols-1 items-center justify-center gap-y-8 bg-[#B5BFA4] py-8 sm:grid-cols-2 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-0 lg:px-60">
            {/* buy geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className={`text-sm sm:text-md md:text-lg w-fit rounded-full border-0 px-6 py-2 sm:px-8 md:px-10 lg:py-4 font-bold capitalize text-white lg:text-xl ${
                  buyEnabled
                    ? "bg-gGreen"
                    : "bg-gGreen/40 disabled:cursor-not-allowed"
                }`}
                onClick={async () => {
                  console.log("Buy Geoblocs");
                  // setBuyContainerView(!buyContainerView);
                  if (walletAddress === null) {
                    setContainerToOpen("buy");
                    onOpen();
                    return;
                  }
                  setBuyContainerView(!buyContainerView);
                  setRedeemContainerView(false);
                }}
                disabled={!buyEnabled}
              >
                Buy Geoblocs
              </button>
            </div>

            {/* remaining geoblocs */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-sm font-bold text-center sm:text-md md:text-lg">
                Geoblocs Remaining
              </p>
              <p className="text-3xl sm:text-4xl lg:text-5xl">
                {onChainTokenData.availableSupply - reservedTokens}
              </p>
            </div>

            {/* total supply */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <p className="text-sm font-bold text-center sm:text-md md:text-lg">
                Total Supply
              </p>
              <p className="text-3xl sm:text-4xl lg:text-5xl">
                {onChainTokenData.totalSupply}
              </p>
            </div>

            {/* redeem geoblocs button */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <button
                className={`text-sm sm:text-md md:text-lg w-fit rounded-full border-0 px-6 py-2 sm:px-8 md:px-10 lg:py-4 font-bold capitalize text-white lg:text-xl ${
                  redeemEnabled
                    ? "bg-gGreen"
                    : "bg-gGreen/40 disabled:cursor-not-allowed"
                }`}
                onClick={async () => {
                  console.log("Redeem Geoblocs");
                  if (walletAddress === null) {
                    setContainerToOpen("redeem");
                    onOpen();
                    return;
                  }
                  setRedeemContainerView(!redeemContainerView);
                  setBuyContainerView(false);
                }}
                disabled={!redeemEnabled}
              >
                Redeem Geoblocs
              </button>
            </div>

            {buyContainerView && (
              <div className="w-full col-span-1 lg:col-span-4">
                <div className="flex flex-col items-center justify-center py-8 mt-12 rounded-lg bg-gGreen/30 lg:w-full">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <p>€ {project.tokenData.buyPrice} per Geobloc</p>
                    <input
                      type="text"
                      placeholder="Geoblocs to purchase"
                      disabled={!checkoutEnabled}
                      className="h-10 w-[90%] rounded-full bg-gGray px-4 py-2 text-center text-sm text-black outline-none disabled:bg-gGray/40 sm:w-[95%] lg:h-12 lg:w-[400px] lg:px-8 lg:text-left lg:text-lg"
                      value={formData.quantity}
                      onChange={(e) => {
                        console.log("formq", formData.quantity);
                        setFormData((prevState) => ({
                          ...prevState,
                          quantity: e.target.value,
                          totalCost: e.target.value * project.metadata.buyPrice,
                        }));
                      }}
                    />
                    <p className="font-bold text-md lg:text-xl">
                      {(project.tokenData.buyPrice &&
                        formData.quantity &&
                        project.tokenData.buyPrice * formData.quantity === 0) ||
                      project.tokenData.buyPrice * formData.quantity > 0
                        ? (
                            project.tokenData.buyPrice * formData.quantity
                          ).toFixed(3)
                        : 0}
                      &nbsp;EUR
                    </p>
                    {formData.quantity > 0 &&
                    formData.quantity <=
                      onChainTokenData.availableSupply -
                        project.tokenData.reserved ? (
                      <>
                        {checkoutEnabled ? (
                          <button
                            className="px-6 py-2 text-sm font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen sm:px-8 md:px-10 lg:px-10 lg:py-4 lg:text-xl"
                            onClick={() => setCheckoutEnabled(false)}
                          >
                            Checkout
                          </button>
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full">
                            <Paypal
                              successCallback={onPaypalSuccess}
                              price={
                                (
                                  project.tokenData.buyPrice * formData.quantity
                                ).toFixed(0) || 0
                              }
                              tokenQty={formData.quantity}
                              tokenId={project.tokenData.tokenId}
                              address={walletAddress}
                            />
                            <button
                              className="px-6 mt-4 font-bold text-white capitalize border-0 rounded-full btn-sm w-fit bg-gGreen sm:px-8 md:px-10 lg:px-10 lg:text-md"
                              onClick={() => setCheckoutEnabled(true)}
                            >
                              Edit Quantity
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <p>
                        Please enter a quantity between 1 and{" "}
                        {onChainTokenData.availableSupply -
                          project.tokenData.reserved}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {redeemContainerView && (
              <div className="w-full col-span-1 lg:col-span-4">
                <div className="flex flex-col items-center justify-center w-full py-8 mt-12 rounded-lg bg-gGreen/30">
                  <>
                    <button
                      disabled={redeeemInProcess}
                      className="px-6 py-2 text-sm font-bold text-white capitalize border-0 rounded-full w-fit bg-gGreen sm:px-8 md:px-10 lg:px-10 lg:py-4 lg:text-xl"
                      onClick={async () => {
                        setRedeemInProcess(true);
                        await handleRedeemTokens();
                        console.log("Redeem Process");
                      }}
                    >
                      {redeeemInProcess
                        ? "Please wait...Minting your NFT"
                        : redeemStatus
                        ? "Redeem Successful"
                        : "Mint Geobloc to your account"}
                    </button>
                  </>
                </div>
              </div>
            )}

            <div className="w-full col-span-1 text-center sm:col-span-2 lg:col-span-4">
              <p className="mt-4 italic">
                Note: Visit our{" "}
                <span
                  className="font-bold underline hover:cursor-pointer"
                  onClick={() => navigate("/wallet")}
                >
                  Wallet Page Here
                </span>{" "}
                or Download our{" "}
                <span
                  className="font-bold underline hover:cursor-pointer"
                  onClick={() => alert("App will be released soon!")}
                >
                  Geoblocs Wallet App
                </span>{" "}
                from Play Store.
              </p>
            </div>
          </div>

          {/* map and green container */}
          <div className="flex flex-col items-center justify-center w-full px-4 bg-white lg:flex-row lg:space-x-32 lg:px-32 lg:py-16">
            {/* map container */}
            <div className="flex flex-col items-center justify-center w-full mt-10 md:mt-10 lg:mt-0">
              <MapComponent
                // lat and lon of ireland
                // lat={53.41291}
                // lon={-8.24389}
                lat={
                  parseFloat(project.metadata.gpsCoordinates.split(",")[0]) || 0
                }
                lon={
                  parseFloat(project.metadata.gpsCoordinates.split(",")[1]) || 0
                }
                label={project.projectName}
              />
            </div>
          </div>
          {/* subwindows */}
          {subWindow === "default" ? (
            <>
              {/* 4 option container */}
              <div className="flex flex-col items-center justify-center py-8 mt-8 space-y-6 lg:mt-0 lg:flex-row lg:space-x-8 lg:space-y-0 lg:pt-0">
                <div
                  className="button-3d flex h-full w-[75%] flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer lg:w-[17%]"
                  onClick={() => {
                    setSubWindow("sponsors");
                  }}
                >
                  <p className="text-xl font-bold text-black">Sponsors</p>
                  <img src={sponsorsimg} alt="Sponsors" className="w-40" />
                </div>
                <div
                  className="button-3d flex h-full w-[75%] flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer lg:w-[17%]"
                  onClick={() => {
                    setSubWindow("season");
                  }}
                >
                  <p className="text-xl font-bold text-black">
                    Planting Season
                  </p>
                  <img src={plantingimg} alt="Sponsors" className="w-48" />
                </div>
                <div
                  className="button-3d flex h-full w-[75%] flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer lg:w-[17%]"
                  onClick={() => {
                    setSubWindow("monitoring");
                  }}
                >
                  <p className="text-xl font-bold text-black">Monitoring</p>
                  <img src={monitoringimg} alt="Sponsors" className="w-40" />
                </div>
                <div
                  className="button-3d flex h-full w-[75%] flex-col items-center justify-between space-y-4 rounded-lg bg-[#B5BFA4] p-4 py-6 shadow-lg hover:cursor-pointer lg:w-[17%]"
                  onClick={() => {
                    setSubWindow("environment");
                  }}
                >
                  <p className="text-xl font-bold text-black">Project Data</p>
                  <img src={projectdataimg} alt="Sponsors" className="w-40" />
                </div>
              </div>

              {/* 3 button container */}
              <div className="flex flex-col items-center justify-center w-full pb-8 space-x-0 space-y-6 lg:flex-row lg:space-x-12 lg:space-y-0 lg:pb-20">
                <button
                  className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg shadow-lg button-3d btn h-fit w-80 bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    console.log("Project Story");
                    window.open(project.substackArticles[0], "_blank");
                  }}
                >
                  Project Story
                </button>
                <button
                  className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg shadow-lg button-3d btn h-fit w-80 bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("links");
                  }}
                >
                  Links
                </button>
                <button
                  className="px-16 py-4 text-xl font-bold text-white capitalize rounded-lg shadow-lg button-3d btn h-fit w-80 bg-gGreen hover:bg-gGreen/80"
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
              sponsorsData={project.sponsors}
            />
          ) : subWindow === "monitoring" ? (
            <MonitorsSW
              setSubWindow={setSubWindow}
              monitorsData={project.mainData.monitors}
            />
          ) : subWindow === "season" ? (
            <SeasonsSW
              setSubWindow={setSubWindow}
              seasonData={project.mainData.seasons}
            />
          ) : subWindow === "environment" ? (
            <EnvironmentSW
              setSubWindow={setSubWindow}
              projectEnvDatas={project.mainData.environment}
            />
          ) : subWindow === "links" ? (
            <LinksSW
              setSubWindow={setSubWindow}
              linksData={project.mainData.links}
            />
          ) : subWindow === "documents" ? (
            <DocumentsSW
              setSubWindow={setSubWindow}
              documentsData={project.mainData.docs}
            />
          ) : null}
          {/* land conditions */}
          <LandConditions
            landConditions={project.mainData.landCondition}
            coverImage={project.metaImages.baseline || null}
          />
        </>
      ) : null}
    </div>
  );
}

export default ProjectView;
