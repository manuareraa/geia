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
    applicationCount: 0,
    projectCount: 0,
    applicationInView: {},
    applications: [],
    projects: [],
    projectInView: {},
  });

  const backendUrl = "http://localhost:3010";

  const getApplicationCount = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/applications/count");
      const count = response.data.count;
      setAppData((prevState) => {
        return {
          ...prevState,
          applicationCount: count,
        };
      });
      return count;
    } catch (err) {
      console.log("Error occurred while getting application count: ", err);
    }
  };

  const getProjectCount = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/admin/projects/count"
      );
      const count = response.data.count;
      setAppData((prevState) => {
        return {
          ...prevState,
          projectCount: count,
        };
      });
      return count;
    } catch (err) {
      console.log("Error occurred while getting project count: ", err);
      return null;
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
        localStorage.setItem("token", user.token);
        if (user.role === "admin") {
          setAppData((prevState) => {
            return { ...prevState, loginMode: "admin" };
          });
        } else {
          setAppData((prevState) => {
            return { ...prevState, loginMode: "user" };
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
      const response = await axios.get(
        backendUrl + "/api/user/user-data-by-id",
        {
          params: {
            userUUID: uuid,
            token: token,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const user = response.data.user;
      toast.success("Logged in successfully");

      setAppData((prevState) => {
        return {
          ...prevState,
          userProfile: user,
        };
      });
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "user") {
        navigate("/dashboard");
      } else {
        toast.error("Error [AC101]: Role not found");
        navigate("/");
      }
      console.log("User data: ", user);
      return user;
    } catch (error) {
      console.log("Error occurred while getting user data: ", error);
      return false;
    }
  };

  const getUserDataByToken = async () => {
    const token = getTokenFromLocalStorage();
    try {
      const response = await axios.get(
        backendUrl + "/api/user/user-data-by-token",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const user = response.data.user;
      setAppData((prevState) => {
        return {
          ...prevState,
          userProfile: user,
        };
      });
      if (user.role === "admin") {
        setAppData((prevState) => {
          return {
            ...prevState,
            loginMode: "admin",
          };
        });
      } else if (user.role === "user") {
        setAppData((prevState) => {
          return {
            ...prevState,
            loginMode: "user",
          };
        });
      } else {
        toast.error("Error [AC104]: Couldn't get data with token");
        navigate("/");
      }
      // console.log("User data: ", user);
      return user;
    } catch (error) {
      console.log("Error occurred while getting user data: ", error);
      return false;
    }
  };

  const getTokenFromLocalStorage = () => {
    if (localStorage.getItem("token") === null) return false;
    return localStorage.getItem("token");
  };

  const getAllApplications = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.get(
          backendUrl + "/api/admin/get-all-applications",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          setAppData((prevState) => {
            return {
              ...prevState,
              applications: response.data.applications,
            };
          });
        } else {
          toast.error("Error [AC103]: Applications fetching error");
        }
      } else {
        toast.error("Error [AC102]: Token not found");
      }
    } catch (error) {
      console.log("Error occurred while getting all applications: ", error);
      return false;
    }
  };

  const checkForAuthentication = async (role) => {
    // console.log("checking for existing login...");
    if (appData.loginMode !== role) {
      // console.log("no existing login, checking for token...");
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        // console.log("token found, checking for role...");
        const userData = await getUserDataByToken();
        // console.log("user data received", userData);
        if (userData.role !== role) {
          // console.log("not expected role, redirecting to login page...");
          if (role === "admin") {
            navigate("/admin/login");
          } else if (role === "user") {
            navigate("/login");
          } else {
            navigate("/");
          }
          toast.error(
            "You are not authorized/authenticated to access this page"
          );
        }
      } else {
        // console.log("token not found, redirecting to login page...");
        if (role === "admin") {
          navigate("/admin/login");
        } else if (role === "user") {
          navigate("/login");
        } else {
          navigate("/");
        }
        toast.error("You are not authorized/authenticated to access this page");
      }
    }
  };

  const logoutUser = () => {
    if (appData.loginMode === "admin") {
      navigate("/admin/login");
    } else if (appData.loginMode === "user") {
      navigate("/login");
    } else {
      navigate("/");
    }
    localStorage.removeItem("token");
    setAppData((prevState) => {
      return {
        ...prevState,
        loginMode: null,
      };
    });
  };

  const sendResponseToApplicant = async (
    message,
    applicationID,
    applicantEmail,
    status
  ) => {
    try {
      getProjectCount();
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/send-response-to-applicant",
          {
            message,
            applicationID,
            applicantEmail,
            status,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          toast.success("Response sent successfully");
          if (status === "accepted") {
            toast.success("Creating Project. Please wait...");
            createNewProject();
          } else {
            navigate("/admin/dashboard/applications");
          }
        } else {
          toast.error(
            "Error [AC105]: Error occured while sending response to applicant"
          );
          navigate("/admin/dashboard/applications");
        }
      } else {
        toast.error("Error [AC106]: Token not found");
      }
    } catch (error) {
      console.log(
        "Error occurred while sending response to applicant: ",
        error
      );
    }
  };

  const generateRandomProjectId = (projectCount) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let prefix = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      prefix += letters[randomIndex];
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const randomID = `${prefix}-${parseInt(projectCount) + 1}-${timestamp}`;

    return randomID;
  };

  const createNewProject = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/create-new-project",
          {
            projectId: generateRandomProjectId(appData.projectCount),
            createdOn: Date.now(),
            status: "not live",
            metadata: {
              gps: appData.applicationInView.body.gps,
              size: appData.applicationInView.body.size,
              ownership: appData.applicationInView.body.ownership,
              projectName: "",
              startedFrom: "",
              location: appData.applicationInView.body.location,
              locationAddress: "",
              projectStatus: 0,
            },
            applicationDetails: {
              applicationId: appData.applicationInView.applicationID,
              name: appData.applicationInView.body.name,
              email: appData.applicationInView.body.email,
            },
            geoblocsData: {
              purchased: 0,
              totalSupply: 0,
              pricePerGeobloc: 0,
            },
            sponsors: {},
            seasons: {},
            monitoring: {},
            environment: {},
            story: {
              heading: "",
              body: [],
            },
            links: {},
            documents: {},
            conditions: {},
            gallery: {},
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          toast.success("Project created successfully");
          navigate("/admin/dashboard/applications");
        } else {
          toast.error(
            "Error [AC107]: Error occured while creating new project"
          );
          navigate("/admin/dashboard/applications");
        }
      } else {
        toast.error("Error [AC108]: Token not found");
      }
    } catch (error) {
      console.log("Error occurred while creating new project: ", error);
    }
  };

  const getAllProjects = async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.get(
          backendUrl + "/api/admin/get-all-projects",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          setAppData((prevState) => {
            return {
              ...prevState,
              projects: response.data.projects,
            };
          });
        } else {
          toast.error("Error [AC109]: Projects fetching error");
        }
      } else {
        toast.error("Error [AC110]: Token not found");
      }
    } catch (error) {
      console.log("Error occurred while getting all projects: ", error);
      return false;
    }
  };

  const changeProjectLiveStatus = async (status, projectId) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/change-live-status",
          {
            projectId: projectId,
            status: status,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          toast.success("Project status changed successfully");
          return true;
        } else {
          toast.error("Error [AC110]: Project status change error");
          return false;
        }
      } else {
        toast.error("Error [AC111]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while changing project status: ", error);
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
        getAllApplications,
        getUserDataByToken,
        getTokenFromLocalStorage,
        checkForAuthentication,
        logoutUser,
        sendResponseToApplicant,
        getAllProjects,
        changeProjectLiveStatus,
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
