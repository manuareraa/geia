import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/img/full-logo-v2.png";
import rightArrow from "../assets/svg/right-arrow.svg";
import mobileMenu from "../assets/svg/mobile-menu.svg";
import rightArrowG from "../assets/svg/right-arrow-g.svg";

function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    setLoading,
    loading,
    appData,
    logoutUser,
    createNewUniqueNetworkAcc,
  } = useContext(AppContext);

  return (
    <>
      {location.pathname.startsWith("/platform/projects/view/") ? null : ( // outer container
        <div className="flex flex-row items-center justify-between w-full p-4 shadow bg-white/70">
          {/* first half */}

          {/* logo container */}
          <div className="">
            <img src={logo} className="w-48 lg:w-72" />
          </div>

          {/* second half for large screen */}
          <div className="flex-row items-center hidden space-x-16 lg:flex">
            {/* menu container */}
            <div className="flex flex-row items-center justify-between space-x-12 text-black">
              <p
                className={
                  location.pathname === "/"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/")}
              >
                Home
              </p>
              {/* <div
              // style={{ zIndex: 99999 }}
              // onClick={() => {
              //   console.log("Gen Acc");
              //   createNewUniqueNetworkAcc();
              // }}
              >
                <Web3Button
                  contractAddress={contractAddress}
                  action={() =>
                    updateMetadata({
                      name: "OldG",
                      description: "This NFT collection has been abandoned",
                      image:
                        "https://4318bd47272bd9c4cee78ce3b5bb1fe8.ipfscdn.io/ipfs/QmYVc7voKxGb57ACGjtofA79MreP1EnMzg1pE3c5gS9DPz/forest.jpg",
                      external_link: "https://#",
                    })
                  }
                >
                  Update Metadata
                </Web3Button>
              </div> */}
              <p
                className={
                  location.pathname === "/stakeholders"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/stakeholders")}
              >
                Stakeholders
              </p>
              <p
                className={
                  location.pathname === "/case-studies"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/case-studies")}
              >
                Case Studies
              </p>
              <p
                className={
                  location.pathname === "/project-stories"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/project-stories")}
              >
                Project Stories
              </p>
              <p
                className={
                  location.pathname === "/team"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/team")}
              >
                Team
              </p>
              <p
                className={
                  location.pathname === "/contact"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/contact")}
              >
                Contact
              </p>
              <p
                className={
                  location.pathname === "/howitworks"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/howitworks")}
              >
                How it Works
              </p><p
                className={
                  location.pathname === "/faq"
                    ? "underline underline-offset-4 hover:cursor-pointer hover:underline hover:underline-offset-4"
                    : "hover:cursor-pointer hover:underline hover:underline-offset-4"
                }
                onClick={() => navigate("/faq")}
              >
                FAQ
              </p>
            </div>

            {location.pathname.startsWith("/platform") ? (
              <>
                {appData.loginMode !== "user" ? (
                  <button
                    className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen outline-0 hover:bg-gGreen/60"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    <div className="flex flex-row items-center space-x-4">
                      <p>Login</p>
                      <img src={rightArrow} className="w-4" />
                    </div>
                  </button>
                ) : (
                  <button
                    className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen outline-0 hover:bg-gGreen/60"
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    <div className="flex flex-row items-center space-x-4">
                      <p>Logout</p>
                      <img src={rightArrow} className="w-4" />
                    </div>
                  </button>
                )}
              </>
            ) : (
              <button
                className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen outline-0 hover:bg-gGreen/60"
                onClick={() => {
                  navigate("/platform/projects");
                }}
              >
                <div className="flex flex-row items-center space-x-4">
                  <p>To Projects</p>
                  <img src={rightArrow} className="w-4" />
                </div>
              </button>
            )}
          </div>

          {/* second half for small screen */}
          <div className="flex flex-row lg:hidden">
            {/* menu container */}
            <img
              src={mobileMenu}
              className="w-6 mobile-button hover:cursor-pointer lg:hidden"
              onClick={() => document.getElementById("mobileMenu").showModal()}
            />
          </div>

          {/* mobile menu */}
          <dialog id="mobileMenu" className="modal bg-gGreen">
            <div className="shadow-none modal-box bg-gGreen/0">
              <h3 className="flex flex-col items-center w-full text-2xl font-bold text-white">
                Menu
              </h3>
              <div className="divider before:bg-white after:bg-white"></div>
              <div className="flex flex-col items-center justify-center space-y-4">
                <div
                  className={
                    location.pathname === "/"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/" ? "text-gGreen" : "text-white"
                    }
                  >
                    Home
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/stakeholders"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/stakeholders");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/stakeholders"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    Stakeholders
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/case-studies"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/case-studies");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/case-studies"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    Case Studies
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/project-stories"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/project-stories");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/project-stories"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    Project Stories
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/team"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/team");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/team"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    Team
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/contact"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/contact");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/contact"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    Contact
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/howitworks"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/howitworks");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/howitworks"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    How it Works
                  </p>
                </div>

                <div
                  className={
                    location.pathname === "/faq"
                      ? "rounded-md bg-white px-6 py-2"
                      : "px-6 py-2"
                  }
                  onClick={() => {
                    document.getElementById("mobileMenu").close();
                    navigate("/faq");
                  }}
                >
                  <p
                    className={
                      location.pathname === "/faq"
                        ? "text-gGreen"
                        : "text-white"
                    }
                  >
                    FAQ
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-4 pt-6">
                {location.pathname.startsWith("/platform") ? (
                  <>
                    {appData.loginMode !== "user" ? (
                      <button
                        className="px-8 capitalize bg-white border-0 rounded-full btn text-gGreen outline-0 hover:bg-gGreen/60"
                        onClick={() => {
                          document.getElementById("mobileMenu").close();
                          navigate("/login");
                        }}
                      >
                        <div className="flex flex-row items-center space-x-4">
                          <p>Login</p>
                          <img src={rightArrowG} className="w-4" />
                        </div>
                      </button>
                    ) : (
                      <button
                        className="px-8 capitalize bg-white border-0 rounded-full btn text-gGreen outline-0 hover:bg-gGreen/60"
                        onClick={() => {
                          document.getElementById("mobileMenu").close();
                          logoutUser();
                        }}
                      >
                        <div className="flex flex-row items-center space-x-4">
                          <p>Logout</p>
                          <img src={rightArrowG} className="w-4" />
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="px-8 capitalize bg-white border-0 rounded-full btn text-gGreen outline-0 hover:bg-gGreen/60"
                    onClick={() => {
                      document.getElementById("mobileMenu").close();
                      navigate("/platform/projects");
                    }}
                  >
                    <div className="flex flex-row items-center space-x-4">
                      <p>To Projects</p>
                      <img src={rightArrowG} className="w-4" />
                    </div>
                  </button>
                )}
              </div>

              <div className="divider before:bg-white after:bg-white"></div>

              <form
                method="dialog"
                className="flex flex-col items-center justify-center w-full border-0"
              >
                {/* if there is a button in form, it will close the modal */}
                <button className="text-white underline capitalize border-0 bg-gGreen underline-offset-2">
                  Close
                </button>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}

export default Navbar;
