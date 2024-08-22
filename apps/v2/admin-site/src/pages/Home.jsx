import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useStore } from "zustand";
import {
  useAuthStore,
  loginAdminUser,
  generateQrCode,
  verifyToken,
  autoLogin,
} from "../state-management/AppState";
import { useNavigate } from "react-router-dom";

import PassviewIcon from "../assets/icons-svg/passview.svg";
import PasshideIcon from "../assets/icons-svg/passhide.svg";

function Home(props) {
  const navigate = useNavigate();
  const { isAuthenticated, user, setUser } = useStore(useAuthStore);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [authStage, setAuthStage] = useState("login");
  const [twoFactor, setTwoFactor] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleGenerateQR = async (event) => {
    console.log("Two Factor event: ", event);
    event.preventDefault();
    const result = await generateQrCode(email);
    console.log(
      "Generate QR result: ",
      result,
      "Filtered: ",
      result.data.qrCode
    );
    if (result.status === "success") {
      setQrCode(result.data.qrCode);
    }
  };

  const moveToTwoFactor = () => {
    setAuthStage("twoFactor");
  };

  const handleLogin = async (event) => {
    console.log("Login event: ", event);
    event.preventDefault();
    // Add login logic here
    const result = await loginAdminUser(email, password);
    console.log("Login result: ", result);
    if (result.status === "success") {
      setAuthStage("twoFactor");
    }
  };

  const verify2FACode = async (event) => {
    if (
      twoFactor === "" ||
      twoFactor === null ||
      twoFactor === undefined ||
      twoFactor.length !== 6
    ) {
      toast.error("Please enter correct 2FA code");
    } else {
      console.log("Verify 2FA event: ", event);
      event.preventDefault();
      // Add 2FA verification logic here
      const result = await verifyToken(email, twoFactor);
      console.log("Verify 2FA result: ", result);
      if (result.status === "success") {
        console.log("2FA verified successfully", result.data);
        navigate("/dashboard/projects");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div
        // onSubmit={handleLogin}
        className="w-full max-w-sm p-4 bg-white rounded"
      >
        <div className="my-4">
          <p className="text-lg font-bold text-center manrope-800">
            Admin Login
          </p>
        </div>
        <div className="flex flex-col w-full gap-4">
          {/* email input */}

          <label className="flex items-center gap-2 input input-bordered focus:outline-none focus-within:outline-none">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="grow focus-within:outline-none manrope-400"
              required
            />
            <div
              onClick={() => {
                console.log("Show password");
                toggleVisibility();
              }}
              className="invisible"
            >
              <img
                src={isVisible ? PassviewIcon : PasshideIcon}
                alt="show password"
                className="text-2xl pointer-events-none text-default-400 hover:cursor-pointer"
              />
            </div>
          </label>

          {/* password input */}
          <label className="flex items-center gap-2 input input-bordered focus:outline-none focus-within:outline-none">
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grow manrope-400 focus-within:outline-none"
              required
            />
            <div
              onClick={() => {
                console.log("Show password");
                toggleVisibility();
              }}
              className="visible"
            >
              <img
                src={isVisible ? PassviewIcon : PasshideIcon}
                alt="show password"
                className="text-2xl pointer-events-none text-default-400 hover:cursor-pointer"
              />
            </div>
          </label>

          {authStage !== "login" ? (
            <div className="flex flex-col items-center justify-center mt-6">
              <p className="text-lg font-bold text-center manrope-800">
                Two Factor Authentication
              </p>
              {authStage === "newTwoFactor" ? (
                <p
                  className="text-xs underline hover:cursor-pointer"
                  onClick={() => setAuthStage("twoFactor")}
                >
                  Old User? Go Back
                </p>
              ) : authStage === "twoFactor" ? (
                <p
                  className="text-xs underline hover:cursor-pointer"
                  onClick={() => setAuthStage("newTwoFactor")}
                >
                  New User? Setup 2FA
                </p>
              ) : null}
            </div>
          ) : null}

          {/* 2FA input */}
          {authStage === "twoFactor" ? (
            <>
              <label className="flex items-center gap-2 input input-bordered focus:outline-none focus-within:outline-none">
                <input
                  type="text"
                  placeholder="Enter your 2FA Code"
                  value={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.value)}
                  className="grow focus-within:outline-none manrope-400"
                  required
                />
                <div
                  onClick={() => {
                    console.log("Show password");
                    toggleVisibility();
                  }}
                  className="invisible"
                >
                  {/* <img
                src={isVisible ? PassviewIcon : PasshideIcon}
                alt="show password"
                className="text-2xl pointer-events-none text-default-400 hover:cursor-pointer"
              /> */}
                </div>
              </label>
            </>
          ) : authStage === "newTwoFactor" ? (
            <div className="flex flex-col items-center w-full my-4 manrope-400">
              <div>
                {qrCode !== "" ? <img src={qrCode} alt="QR Code" /> : null}
              </div>
              {qrCode === "" ? (
                <button
                  // type="submit"
                  className="w-full py-3 text-white h-fit btn btn-sm bg-gGreen manrope-700"
                  onClick={handleGenerateQR}
                >
                  Generate QR Code
                </button>
              ) : (
                <button
                  // type="submit"
                  className="w-full py-3 text-white h-fit btn btn-sm bg-gGreen manrope-700"
                  onClick={moveToTwoFactor}
                >
                  Next
                </button>
              )}
            </div>
          ) : null}
        </div>
        {authStage === "login" ? (
          <div className="flex flex-col items-center w-full my-4 manrope-400">
            <button
              // type="submit"
              className="w-full py-3 text-white h-fit btn btn-sm bg-gGreen manrope-700"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        ) : authStage === "twoFactor" ? (
          <div className="flex flex-col items-center w-full my-4 manrope-400">
            <button
              // type="submit"
              className="w-full py-3 text-white h-fit btn btn-sm bg-gGreen manrope-700"
              onClick={verify2FACode}
            >
              Verify Code
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
