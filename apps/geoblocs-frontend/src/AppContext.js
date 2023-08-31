import React, { useState, useEffect, createContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

import { generateAccount, SignatureType } from "@unique-nft/accounts";
import { waitReady } from "@polkadot/wasm-crypto";
import { KeyringProvider } from "@unique-nft/accounts/keyring";
import Sdk from "@unique-nft/sdk";

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
    blockchainConnStatus: false,
    sdk: null,
    userBlockchainData: null,
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

  const userRegister = async (email, password, role) => {
    try {
      const response = await axios.post(backendUrl + "/auth/signup", {
        email,
        password,
        role,
      });

      if (response.data.status === "success") {
        toast.success("User registered successfully. Please Login.");
        navigate("/login");
      } else {
        toast.error("Error [AC100]: Error occurred while registering");
      }
    } catch (error) {
      console.log("Error occurred while registering: ", error);
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
              collectionId: 0,
              tokenName: "",
              description: "",
              tickerSymbol: "",
              tokenId: [],
            },
            sponsors: [],
            seasons: [],
            environment: [],
            story: [],
            links: [],
            documents: [],
            conditions: [],
            gallery: [],
            monitors: [],
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

  const uploadFilesToS3 = async (files, projectId, subfolder) => {
    const S3_BUCKET = process.env.REACT_APP_BUCKET;
    const REGION = process.env.REACT_APP_REGION;
    console.log("S3_BUCKET", S3_BUCKET);
    console.log("REGION", REGION);

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_ACCESS_KEY_SECRET,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    let fileUrls = [];

    if (files.length === 0) {
      toast.error("No files found. Please upload a file.");
      return fileUrls;
    }

    for (const file of files) {
      const fileExtension = file.name.split(".").pop();
      const newFileName = `${uuidv4()}.${fileExtension}`;

      const folderPath = `${projectId}/${subfolder}`;
      const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${folderPath}/${newFileName}`;
      const params = {
        Bucket: S3_BUCKET,
        Key: `${folderPath}/${newFileName}`,
        Body: file,
      };

      const upload = s3
        .putObject(params)
        .on("httpUploadProgress", (evt) => {
          console.log(
            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
          );
        })
        .promise();

      try {
        await upload;
        console.log(
          "File uploaded successfully:",
          file.name,
          "as",
          newFileName,
          "to",
          fileUrl
        );
        fileUrls.push(fileUrl);
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
      }
    }

    return fileUrls;
  };

  const getFileKeyFromUrl = (fileUrl) => {
    const bucketUrl = `https://${process.env.REACT_APP_BUCKET}.s3.${process.env.REACT_APP_REGION}.amazonaws.com/`;
    const fileKey = fileUrl.replace(bucketUrl, "");
    return fileKey;
  };

  const deleteFileFromS3 = async (fileUrl) => {
    const fileKey = getFileKeyFromUrl(fileUrl);

    const S3_BUCKET = process.env.REACT_APP_BUCKET;
    const REGION = process.env.REACT_APP_REGION;

    AWS.config.update({
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_ACCESS_KEY_SECRET,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    const params = {
      Bucket: S3_BUCKET,
      Key: fileKey,
    };

    try {
      const deletion = s3.deleteObject(params).promise();
      await deletion;
      console.log("File deleted successfully:", fileKey);
      return true;
    } catch (error) {
      console.error("Error deleting file:", fileKey, error);
      return false;
    }
  };

  const updateProjectGallery = async (projectId, gallery) => {
    // gallery is an array of image urls
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-gallery",
          {
            projectId: projectId,
            gallery: gallery,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Gallery updated successfully");
          return true;
        } else {
          toast.error("Error [AC112]: Gallery update error");
          return false;
        }
      } else {
        toast.error("Error [AC113]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating gallery: ", error);
      return false;
    }
  };

  const updateProjectStory = async (projectId, story) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-story",
          {
            projectId: projectId,
            story: story,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Story updated successfully");
          return true;
        } else {
          toast.error("Error [AC114]: Story update error");
          return false;
        }
      } else {
        toast.error("Error [AC115]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating story: ", error);
      return false;
    }
  };

  const updateProjectMetadata = async (projectId, metadata) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-metadata",
          {
            projectId: projectId,
            metadata: metadata,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Metadata updated successfully");
          const updatedProjectData = await getProjectById(projectId);
          if (updatedProjectData.status === "success") {
            setAppData((prevState) => {
              return {
                ...prevState,
                projectInView: updatedProjectData.project,
              };
            });
            return true;
          }
        } else {
          toast.error("Error [AC116]: Metadata update error");
          return false;
        }
      } else {
        toast.error("Error [AC117]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating metadata: ", error);
      return false;
    }
  };

  const updateProjectLinks = async (projectId, links) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-links",
          {
            projectId: projectId,
            links: links,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Links updated successfully");
          return true;
        } else {
          toast.error("Error [AC118]: Links update error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating links: ", error);
      return false;
    }
  };

  const updateProjectDocuments = async (projectId, documents) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-documents",
          {
            projectId: projectId,
            documents: documents,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Documents updated successfully");
          return true;
        } else {
          toast.error("Error [AC120]: Documents update error");
          return false;
        }
      } else {
        toast.error("Error [AC121]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating documents: ", error);
      return false;
    }
  };

  const updateProjectSponsors = async (projectId, sponsors) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-sponsors",
          {
            projectId: projectId,
            sponsors: sponsors,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Sponsors updated successfully");
          return true;
        } else {
          toast.error("Error [AC122]: Sponsors update error");
          return false;
        }
      } else {
        toast.error("Error [AC123]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating sponsors: ", error);
      return false;
    }
  };

  const updateProjectSeasons = async (projectId, seasons) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-seasons",
          {
            projectId: projectId,
            seasons: seasons,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Seasons updated successfully");
          return true;
        } else {
          toast.error("Error [AC122]: Seasons update error");
          return false;
        }
      } else {
        toast.error("Error [AC123]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating seasons: ", error);
      return false;
    }
  };

  const updateProjectConditions = async (projectId, conditions) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-conditions",
          {
            projectId: projectId,
            conditions: conditions,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("conditions updated successfully");
          return true;
        } else {
          toast.error("Error [AC118]: conditions update error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating conditions: ", error);
      return false;
    }
  };

  const updateProjectGeoblocsData = async (projectId, geoblocsData) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-geoblocs-data",
          {
            projectId: projectId,
            geoblocsData: geoblocsData,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("geoblocs data updated successfully");
          return true;
        } else {
          toast.error("Error [AC118]: geoblocs data update error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating geoblocs data: ", error);
      return false;
    }
  };

  const updateProjectMonitors = async (projectId, monitors) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-monitors",
          {
            projectId: projectId,
            monitors: monitors,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("Monitors updated successfully");
          return true;
        } else {
          toast.error("Error [AC122]: Monitors update error");
          return false;
        }
      } else {
        toast.error("Error [AC123]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating Monitors: ", error);
      return false;
    }
  };

  const updateProjectEnvData = async (projectId, envData) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-envData",
          {
            projectId: projectId,
            envData: envData,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("envData updated successfully");
          return true;
        } else {
          toast.error("Error [AC122]: envData update error");
          return false;
        }
      } else {
        toast.error("Error [AC123]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating envData: ", error);
      return false;
    }
  };

  const getProjectById = async (projectId) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.get(
          backendUrl + "/api/admin/get-project-by-id",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              projectId: projectId,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("project retrieved successfully");
          return response.data;
        } else {
          toast.error("Error [AC118]: project data fetch error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while fetching project data: ", error);
      return false;
    }
  };

  const addNewCollectionInDb = async (projectId, collectionData) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/add-new-nft-collection",
          {
            projectId: projectId,
            collectionData: collectionData,
            tokenData: [],
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("updated new collection successfully");
          return true;
        } else {
          toast.error("Error [AC118]: new collection creation error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log(
        "Error occurred while creating new collection in DB: ",
        error
      );
      return false;
    }
  };

  const updateProjectsArrayInState = (projectId, projectData) => {
    // find a project in the appData.projects array and update it accordingly
    const projectIndex = appData.projects.findIndex(
      (project) => project.projectId === projectId
    );
    if (projectIndex !== -1) {
      let tempArray = appData.projects;
      tempArray[projectIndex] = projectData;
      setAppData((prevState) => {
        return {
          ...prevState,
          projects: tempArray,
        };
      });
    } else {
      console.log("Project not found");
    }
    return true;
  };

  const updateCollectionInDb = async (projectId, tokenData) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-nft-collection",
          {
            projectId: projectId,
            tokenData: tokenData,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("updated  collection successfully");
          return response.data;
        } else {
          toast.error("Error [AC118]: collection update error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating collection in DB: ", error);
      return false;
    }
  };

  const updateTokenIdInProject = async (projectId, tokenId) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-token-id",
          {
            projectId: projectId,
            tokenId: tokenId,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("token id updated successfully");
          return response.data;
        } else {
          toast.error("Error [AC118]: token id update error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating token id: ", error);
      return false;
    }
  };

  const updateTokenPrice = async (projectId, price) => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== false) {
        const response = await axios.post(
          backendUrl + "/api/admin/update-token-price",
          {
            projectId: projectId,
            price: price,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.status === "success") {
          // toast.success("token price updated successfully");
          const updatedProjectData = await getProjectById(projectId);
          if (updatedProjectData.status === "success") {
            setAppData((prevState) => {
              return {
                ...prevState,
                projectInView: updatedProjectData.project,
              };
            });
            return true;
          } else {
            toast.error("Error [AC118]: project data fetch error");
            return false;
          }
        } else {
          toast.error("Error [AC118]: token price update error");
          return false;
        }
      } else {
        toast.error("Error [AC119]: Token not found");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while updating token price: ", error);
      return false;
    }
  };

  // ==============================
  // Geoblocs Management
  // ==============================

  const createNewUniqueNetworkAcc = async (name) => {
    try {
      await waitReady(); // Wait for the WASM interface to initialize

      const account = await generateAccount({
        pairType: SignatureType.Sr25519,
        meta: {
          name: name,
        },
      });

      return account;
    } catch (error) {
      console.error("Error generating account:", error);
      return false;
    }
  };

  const initiateBlockchainConnection = async (seed) => {
    try {
      const KROptions = {
        type: "sr25519",
      };
      const provider = new KeyringProvider(KROptions);
      await provider.init();

      const signer = provider.addSeed(appData.userProfile.blockchainAcc.seed);

      const options = {
        baseUrl: "https://rest.unique.network/opal/v1",
        signer: signer,
      };
      const sdk = new Sdk(options);
      setAppData((prevState) => {
        return { ...prevState, sdk: sdk, blockchainConnStatus: true };
      });
      console.log("SDK: ", sdk);
      return sdk;
    } catch (error) {
      console.error("Error initiating blockchain connection:", error);
      toast.error("Error initiating blockchain connection. Try again later.");
      setAppData((prevState) => {
        return { ...prevState, blockchainConnStatus: false };
      });
      return false;
    }
  };

  const getBalance = async (sdk) => {
    const balance = await sdk.balance.get({
      address: appData.userProfile.blockchainAcc.keyfile.address,
    });
    setAppData((prevState) => {
      return {
        ...prevState,
        userBlockchainData: {
          ...prevState.userBlockchainData,
          balance: balance,
        },
      };
    });
    console.log("Balance: ", balance);

    // ====================

    const args = {
      address: "5HW5Li9YDaG9v1yQZ83DbQWT92brzkVjBunCZpZ9zynnUaxB",
      to: "5D2RJGWPjZUh61EYZT8mGAGHApqUwXucNeUbdQeUfnYzywvT",
      collectionId: 2030,
      tokenId: 1,
      amount: 20,
    };

    // const result = await sdk.refungible.transferToken.submitWaitResult(args);

    // console.log("Tranferred: ", result.parsed);

    // const { amount } = await sdk.refungible.totalPieces({
    //   collectionId: 2030,
    //   tokenId: 1,
    // });

    // console.log("Total Pieces: ", amount);

    const getBalanceArgs = {
      address: "5HW5Li9YDaG9v1yQZ83DbQWT92brzkVjBunCZpZ9zynnUaxB",
      collectionId: 2030,
      tokenId: 1,
    };

    const { collectionId, tokenId, amount } = await sdk.refungible.getBalance(
      getBalanceArgs
    );

    console.log("Balance: ", collectionId, tokenId, amount);

    // ====================
    return balance;
  };

  const connectToBlockchainAndGetData = async () => {
    const sdk = await initiateBlockchainConnection();
    if (sdk !== false) {
      getBalance(sdk);
    }
  };

  const createNewNftCollection = async (
    name,
    description,
    tokenPrefix,
    projectId,
    geoblocsData,
    totalSupply
  ) => {
    console.log(
      "Creating new collection: ",
      name,
      description,
      tokenPrefix,
      projectId,
      geoblocsData,
      totalSupply
    );
    try {
      const result =
        await appData.sdk.refungible.createCollection.submitWaitResult({
          address: appData.userProfile.blockchainAcc.keyfile.address,
          name: name,
          description: description,
          tokenPrefix: tokenPrefix,
        });
      const { collectionId, amount } = result.parsed;
      console.log("Collection Created: ", result);
      console.log("Collection ID: ", collectionId);
      toast.success("NFT Collection created successfully");
      const addResult = await addNewCollectionInDb(projectId, result);
      if (addResult === true) {
        console.log("New Collection data updated in DB successfully");
      } else {
        console.log("Failed to update new collection data in the backend");
        return false;
      }
      geoblocsData.collectionId = collectionId;
      geoblocsData.tokenName = name;
      geoblocsData.description = description;
      geoblocsData.tickerSymbol = tokenPrefix;
      geoblocsData.totalSupply = totalSupply;
      const updateResult = await updateProjectGeoblocsData(
        projectId,
        geoblocsData
      );
      if (updateResult === true) {
        const newNftResult = await createNewNFT(
          projectId,
          collectionId,
          totalSupply
        );
        if (newNftResult === true) {
          const projectData = await getProjectById(projectId);
          if (projectData.status === "success") {
            setAppData((prevState) => {
              return {
                ...prevState,
                projectInView: projectData.project,
              };
            });
            updateProjectsArrayInState(projectId, projectData.project);
          } else {
            console.log("Failed to fetch project data from backend");
            return false;
          }
        } else {
          console.log("Failed to create new NFT");
          return false;
        }
      } else {
        console.log("Failed to update project data in the backend");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error creating collection:", error);
      toast.error("Error creating collection. Try again later.");
      return false;
    }
  };

  const createNewNFT = async (projectId, collectionId, amount) => {
    const result = await appData.sdk.refungible.createToken.submitWaitResult({
      address: appData.userProfile.blockchainAcc.keyfile.address,
      collectionId: collectionId,
      amount: amount,
    });
    const { tokenId } = result.parsed;
    console.log("NFT Created: ", result);
    console.log("Token ID: ", tokenId);
    const updateResult = await updateCollectionInDb(projectId, result);
    if (updateResult.status === "success") {
      const tokenProjectUpdateResult = await updateTokenIdInProject(
        projectId,
        tokenId
      );
      if (tokenProjectUpdateResult.status === "success") {
        return true;
      } else {
        console.log("Failed to update token data in project");
        return false;
      }
    } else {
      console.log("Error updating the collection with token data: ");
      return false;
    }
  };

  const getAllProjectsForUsers = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/user/get-all-projects"
      );
      if (response.data.status === "success") {
        setAppData((prevState) => {
          return {
            ...prevState,
            projects: response.data.projects,
          };
        });
        console.log("Successfully retrieved", response.data.projects);
        return true;
      } else {
        console.log("Failed to get all projects. Please reload.");
        return false;
      }
    } catch (error) {
      console.log("Error occurred while fetching projects: ", error);
      return false;
    }
  };

  const geoblocsDataAndUpdate = async (projectId) => {};

  useEffect(() => {
    if (appData.userProfile && appData.userProfile.blockchainAcc) {
      if (Object.keys(appData.userProfile.blockchainAcc).length > 0) {
        connectToBlockchainAndGetData();
      } else {
        toast.error("Could not fetch blockchain data");
      }
    } else {
      console.error("Could not fetch data from blockchain");
    }
    getAllProjectsForUsers();
  }, [appData.userProfile]);

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
        uploadFilesToS3,
        deleteFileFromS3,
        updateProjectGallery,
        updateProjectStory,
        updateProjectMetadata,
        updateProjectLinks,
        updateProjectDocuments,
        updateProjectSponsors,
        updateProjectSeasons,
        updateProjectConditions,
        updateTokenPrice,
        updateProjectMonitors,
        updateProjectEnvData,
        userRegister,
        // blockchain part
        createNewUniqueNetworkAcc,
        createNewNftCollection,
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
