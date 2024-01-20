import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import rightArrow from "../../assets/svg/right-arrow.svg";

import Navbar from "../../components/Navbar";

function UserRegister(props) {
    const navigate = useNavigate();
  const { userRegister } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="flex flex-col justify-center w-full">
        <Navbar />
      {/* title container */}
      <div className="flex flex-row items-center justify-between space-x-8 lg:px-32 pt-44">
        {/* left - title sub-container */}
        <div className="flex flex-col items-center space-y-4 lg:items-start">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- lg:text-[80px] text-5xl lg:leading-[95px] text-center">User Register</p>
        </div>

        {/* right - logo container */}
        <img src={AdminLogo} alt="Admin Logo" className="hidden lg:block w-[150px]"></img>
      </div>

      {/* buttons container */}
      <div className="flex flex-col items-center justify-center w-full mt-16 space-y-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="lg:w-[400px] w-[100%] lg:h-12 h-10 px-8 text-black  rounded-full outline-none bg-gGray py-2 text-sm lg:text-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <input
            type="text"
            placeholder="Enter your password"
            className="lg:w-[400px] w-[100%] lg:h-12 h-10 px-8 text-black  rounded-full outline-none bg-gGray py-2 text-sm lg:text-lg"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></input>
          <input
            type="text"
            placeholder="Confirm your password"
            className="lg:w-[400px] w-[100%] lg:h-12 h-10 px-8 text-black  rounded-full outline-none bg-gGray py-2 text-sm lg:text-lg"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          ></input>
        </div>

        <p>
          Already have an account?{" "}
          <span
            className="hover:underline text-gGreen hover:cursor-pointer underline-offset-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </span>
        </p>

        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
          onClick={async () => {
            if (
              formData.email === "" ||
              formData.password === "" ||
              formData.confirmPassword === ""
            ) {
              toast.error("Please fill all the fields");
            } else {
              if (formData.password !== formData.confirmPassword) {
                toast.error("Passwords do not match");
              } else {
                const result = userRegister(
                  formData.email,
                  formData.password,
                  "user"
                );
              }
            }
          }}
        >
          <p>Register</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>
    </div>
  );
}

export default UserRegister;
