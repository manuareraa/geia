import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import gbSymbol from "../assets/svg/geobloc-symbol 1.svg";
import gbText from "../assets/svg/geobloc-text 1.svg";
import location from "../assets/svg/location.svg";
import geialogo from "../assets/svg/geialogo.svg";
import arrow from "../assets/svg/arrow.svg";
import loading from "../assets/svg/loading.svg";
function Homepage(props) {
  const [stage, setStage] = useState(0);
  const [email, setEmail] = useState("");
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  return (
    <>
      {/* <div className="flex flex-col items-center justify-center w-full h-full py-6 space-y-6 custom-bg-one"> */}
      <div className="flex flex-col items-center justify-center w-full h-full py-8 space-y-6 bg-black">
        {/* geoblocs logo */}
        <div className="flex flex-row items-center ">
          <img src={gbSymbol} alt="Geobloc Symbol" className="w-16 h-16" />
          <img src={gbText} alt="Geobloc Text" className="w-64 h-16" />
        </div>

        {/* center div */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-10 lg:px-12  bg-custom-bg-primary rounded-3xl lg:rounded-[50px]">
          {/* white-container */}
          <div className="flex flex-col p-4 bg-white lg:py-10  lg:px-12 rounded-2xl lg:rounded-[30px]">
            {/* black-container */}
            <div
              className={
                stage === 2
                  ? "flex flex-col items-center justify-center p-8 lg:p-14 bg-black rounded-2xl lg:rounded-[30px]"
                  : "flex flex-col items-center justify-center p-8 lg:p-14 bg-black rounded-2xl lg:rounded-[30px]"
              }
            >
              {/* inner content */}
              <div
                className={
                  stage === 2
                    ? "flex flex-col items-center justify-center space-y-4 bg-black"
                    : "flex flex-col items-center justify-center space-y-4 bg-black"
                }
              >
                <div className="flex flex-col items-center justify-center leading-2">
                  <div className="flex flex-col items-center justify-center leading-1">
                    {/* upper free text */}
                    <div className="flex flex-row items-center justify-between w-full">
                      <p className="text-sm lg:font-bold lg:text-lg text-green">
                        Free
                      </p>
                      <p className="text-sm lg:text-lg lg:font-bold text-green">
                        Zero Gas Fee
                      </p>
                    </div>
                    {/* mint nft */}
                    <p className="text-5xl font-black text-white lg:text-[120px]">
                      Mint NFT
                    </p>
                  </div>
                  {/* geobloc */}
                  <p className="py-2 text-2xl text-white lg:text-4xl font-extralight">
                    Geobloc
                  </p>
                </div>
                {/* mint button */}
                {stage === 0 ? (
                  <button
                    className="px-10 font-bold text-black capitalize border-0 rounded-full lg:px-16 btn custom-bg-button lg:font-extrabold"
                    onClick={() => setStage(1)}
                  >
                    Mint Now
                  </button>
                ) : stage === 1 ? (
                  <>
                    <div className="flex flex-col items-center space-y-4 lg:space-x-4 lg:space-y-0 lg:items-center lg:justify-center lg:flex-row">
                      <input
                        type="text"
                        placeholder="Enter email"
                        className="rounded-3xl border-[0px] border-green p-2 lg:p-3 px-4 bg-white/10 text-sm lg:text-md text-white focus:outline-none lg:px-6"
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                      <button
                        className="px-8 text-xs font-bold text-black capitalize border-0 rounded-full lg:mt-0 btn-sm lg:btn-md lg:px-16 btn custom-bg-button lg:font-extrabold"
                        onClick={async () => {
                          if (email === "") {
                            toast.error("Please enter a valid email");
                          } else {
                            const regex = /\S+@\S+\.\S+/;
                            if (!regex.test(email)) {
                              toast.error("Please enter a valid email");
                            } else {
                              setStage(2);
                              console.log(email);
                              const response = await props.checkAndMint(email);
                              console.log("HP", response);
                              if (response.status === "success") {
                                setStage(3);
                              } else {
                                setStage(0);
                              }
                            }
                          }
                        }}
                      >
                        Mint Now
                      </button>
                    </div>
                  </>
                ) : stage === 2 ? (
                  <>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <img
                        src={loading}
                        alt="Loading"
                        className="w-12 h-12 lg:w-20 lg:h-20"
                      />
                      <p className="text-xs font-bold text-white">
                        One Geobloc NFT is on its way to your wallet...
                      </p>
                    </div>
                  </>
                ) : stage === 3 ? (
                  <>
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <p className="text-xs font-bold text-green lg:text-xl">
                        Successfully Minted !!
                      </p>
                      <p className="text-[7px] font-light  hover:cursor-pointer text-white/50 lg:text-[10px]">
                        {showPrivateKey === true ? (
                          <div className="flex flex-row items-center space-x-2 lg:text-[10px] ">
                            {/* <p className="w-">{props.appState.wallet.seed}</p> */}
                            <p
                              className="underline"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  props.appState.wallet.seed
                                );
                                toast.success("Copied to clipboard");
                              }}
                            >
                              Copy Your Wallet Seed
                            </p>
                            {
                              //   <p
                              //     className="text-[7px] font-medium underline cursor-pointer lg:text-[10px]  text-blue hover:cursor-pointer"
                              //     onClick={() => setShowPrivateKey(false)}
                              //   >
                              //     [HIDE]
                              //   </p>
                            }
                          </div>
                        ) : (
                          <p
                            className="text-[7px] font-light underline hover:cursor-pointer text-white/50 lg:text-[10px]"
                            // onClick={() => setShowPrivateKey(true)}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                props.appState.wallet.seed
                              );
                              toast.success("Copied to clipboard");
                            }}
                          >
                            Copy Your Wallet Seed
                          </p>
                        )}
                      </p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* title and location */}
          <div className="flex flex-col items-start w-full mt-6 lg:items-center lg:justify-between lg:flex-row">
            {/* title */}
            <p className="text-3xl font-light text-white lg:text-4xl">
              Sacred Forest
            </p>
            {/* location */}
            <div className="flex flex-row items-center justify-center space-x-2">
              <img src={location} alt="Location" className="w-6 h-6" />
              <p className="text-lg font-light text-white lg:text-xl">
                Philipines
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start w-full space-y-8 lg:flex-row lg:items-end lg:justify-between">
            {/* stats */}
            <div className="flex flex-col items-start w-full mt-6 space-y-2">
              {/* area */}
              <div className="flex flex-row items-center space-x-4">
                <div className="p-2 px-4 font-semibold bg-white rounded-lg">
                  15
                </div>
                <p className="text-white">Hectares</p>
              </div>
              {/* geoblocs minted */}
              <div className="flex flex-row items-center space-x-4">
                <div className="p-2 px-4 font-semibold bg-white rounded-lg">
                  {props.appState.minted}
                </div>
                <p className="text-white">Geoblocs Minted</p>
              </div>
              {/* geobloc left */}
              <div className="flex flex-row items-center space-x-4">
                <div className="p-2 px-4 font-semibold bg-white rounded-lg">
                  {props.appState.left}
                </div>
                <p className="text-white">Geoblocs Left</p>
              </div>
            </div>

            {/* buttons */}
            <div className="flex flex-col items-start w-full mt-6 space-y-2">
              {/* know more */}
              <button className="w-full text-black capitalize bg-white rounded-full btn">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-bold text-black">Know More</p>
                  <img src={arrow} alt="Arrow" className="w-4 h-4" />
                </div>
              </button>

              {/* mint more */}
              <button className="w-full text-black capitalize bg-white rounded-full btn">
                <div className="flex flex-row items-center space-x-4">
                  <p className="font-bold text-black">Mint More</p>
                  <img src={arrow} alt="Arrow" className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* geia logo */}
        <div className="flex flex-row items-center">
          <img src={geialogo} alt="GEIA Logo" className="h-16 w-60" />
        </div>
      </div>
    </>
  );
}

export default Homepage;
