import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../AppContext";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import rightArrow from "../../assets/svg/right-arrow.svg";

function Login(props) {
  const { userLogin } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-row items-center justify-between px-32 space-x-8 pt-44">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px]">Admin Login</p>
        </div>

        {/* right - logo container */}
        <img src={AdminLogo} alt="Admin Logo" className="w-[150px]"></img>
      </div>

      {/* buttons container */}
      <div className="flex flex-col items-center justify-center w-full mt-16 space-y-10">
        <div className="flex flex-col items-center justify-center space-y-4">
          <input
            type="text"
            placeholder="Enter your email"
            className="h-12 w-[400px] rounded-full bg-gGray  px-8 py-2 text-black outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          <input
            type="text"
            placeholder="Enter your password"
            className="h-12 w-[400px] rounded-full bg-gGray  px-8 py-2 text-black outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          ></input>
        </div>

        <button
          className="px-8 text-white capitalize border-0 rounded-full btn bg-gGreen hover:bg-gGreen/70"
          onClick={async () => {
            if (formData.email === "" || formData.password === "") {
              toast.error("Please fill all the fields");
            } else {
              console.log("CREDs: ", formData.email, formData.password);
              const result = userLogin(formData.email, formData.password);
            }
          }}
        >
          <p>Login</p>
          <img src={rightArrow} className="w-4" />
        </button>
      </div>
    </div>
  );
}

export default Login;
