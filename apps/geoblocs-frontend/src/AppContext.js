import React, { useState, useEffect, createContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    status: "false",
    message: "",
  });

  const [appData, setAppData] = useState({
    loginMode: null,
    userProfile: null,
  });

  const [miscData, setMiscData] = useState({
    applicationCount: 0,
  });

  const backendUrl = "http://localhost:3010";

  const getApplicationCount = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/applications/count");
      const count = response.data.count;
      setMiscData({ ...miscData, applicationCount: count });
      return count;
    } catch (err) {
      console.log("Error occurred while getting application count: ", err);
    }
  };

  const createNewApplication = async (data) => {
    try {
      const response = await axios.post(backendUrl + "/api/applications/new", {
        ...data,
      });
      const newApplication = response.data;
      console.log("New application created: ", newApplication);
      return true;
    } catch (error) {
      console.log("Error occurred while creating new application: ", error);
      return false;
    }
  };

  const userLogin = async (email, password) => {
    try {
      const response = await axios.post(backendUrl + "/auth/signin", {
        email,
        password,
      });
      const user = response.data;
      if (!user.status || user.status === "fail") {
        toast.error("Invalid credentials");
        return {
          status: "fail",
        };
      } else {
        if (user.role === "admin") {
          setAppData((prevState) => {
            return { ...prevState, loginMode: "admin" };
          });
        }
        await getUserDataByUUID(user.uuid, user.token);
        return {
          status: "success",
          role: user.role,
        };
      }
    } catch (error) {
      console.log("Error occurred while logging in: ", error);
      toast.error("Invalid Credentials");
    }
  };

  const getUserDataByUUID = async (uuid, token) => {
    try {
      const response = await axios.get(backendUrl + "/api/user/user-data-id", {
        params: {
          userUUID: uuid,
          token: token,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const user = response.data;
      toast.success("Logged in successfully");

      setAppData((prevState) => {
        return {
          ...prevState,
          userProfile: user,
        };
      });
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
      console.log("User data: ", user);
      return user;
    } catch (error) {
      console.log("Error occurred while getting user data: ", error);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        getApplicationCount,
        createNewApplication,
        appData,
        setAppData,
        userLogin,
        getUserDataByUUID,
      }}
    >
      <Toaster />
      <Navbar />
      <div className="">
        {loading.status === "true" ? (
          <Loading message={loading.message} />
        ) : null}
        {children}
      </div>
    </AppContext.Provider>
  );
};
