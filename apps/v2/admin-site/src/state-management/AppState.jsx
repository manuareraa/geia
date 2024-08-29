import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";
import { immer } from "zustand/middleware/immer";

// Environmental Variables
export const backendUrl =
  import.meta.env.REACT_APP_BACKEND_URL || "https://admin.api.geoblocs.com";

// Authentication State Management
export const useAuthStore = create(
  immer((set) => ({
    isAuthenticated: false,
    user: null,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
  }))
);

// Loading State Management
export const useLoadingStore = create(
  immer((set) => ({
    isLoading: false,
    message: "",
    startLoading: (message = "") => set({ isLoading: true, message }),
    stopLoading: () => set({ isLoading: false, message: "" }),
  }))
);

// Reusable Toast Notification Function
const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};

// Reusable API Request Function
const apiRequest = async (request, loadingMessage, successMessage) => {
  const { startLoading, stopLoading } = useLoadingStore.getState();
  const loadingToast = toast.loading(loadingMessage);

  try {
    startLoading(loadingMessage);
    const response = await request();
    toast.dismiss(loadingToast);
    showToast("success", successMessage);
    return { status: "success", data: response.data };
  } catch (error) {
    console.error(error);
    toast.dismiss(loadingToast);
    showToast("error", error.response?.data?.message || error.message);
    return { status: "error", message: error.message };
  } finally {
    stopLoading();
  }
};

// Admin User Login Function
export const loginAdminUser = async (email, password) => {
  return apiRequest(
    async () => {
      const response = await axios.post(`${backendUrl}/admin/user/login`, {
        emailId: email,
        password,
      });
      const user = response.data;
      if (!user.token) throw new Error("Admin approval required.");
      localStorage.setItem("authToken", user.token);
      useAuthStore.getState().setUser(user);
      return response;
    },
    "Logging in...",
    "Login successful!"
  );
};

// Generate QR Code for 2FA
export const generateQrCode = async (email) => {
  const token = localStorage.getItem("authToken");
  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/user/generate-qr`,
        { emailId: email },
        { headers: { Authorization: token } }
      );
    },
    "Generating QR code...",
    "QR code generated successfully!"
  );
};

// Verify 2FA Token
export const verifyToken = async (email, token) => {
  const authToken = localStorage.getItem("authToken");
  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/user/verify-token`,
        { emailId: email, token },
        { headers: { Authorization: authToken } }
      );
    },
    "Verifying token...",
    "Token verified successfully!"
  );
};

// Admin User Logout Function
export const logoutAdminUser = () => {
  useAuthStore.getState().setUser(null);
  localStorage.removeItem("authToken");
  showToast("success", "Logout successful!");
  return { status: "success" };
};

// Check for token in cookies and perform auto-login
export const autoLogin = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return apiRequest(
      async () => {
        const response = await axios.get(
          `${backendUrl}/admin/user/auto-login`,
          {
            headers: { Authorization: token },
          }
        );
        useAuthStore.getState().setUser(response.data.user);
        return response;
      },
      "Logging in...",
      "Auto login successful!"
    );
  } else {
    return { status: "error", message: "No token found. Please log in." };
  }
};

// Create a New Project
export const createNewProject = async (projectData) => {
  const token = localStorage.getItem("authToken");
  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/content/create`,
        projectData,
        {
          headers: { Authorization: token },
        }
      );
    },
    "Creating new project...",
    "Project created successfully!"
  );
};

// Project State Management
export const useProjectStore = create(
  immer((set, get) => ({
    projectSummaries: [],
    projectDetails: {},
    setProjectSummaries: (projects) =>
      set((state) => {
        state.projectSummaries = projects;
      }),
    setProjectDetail: (project) =>
      set((state) => {
        state.projectDetails[project.projectId] = project;
      }),
    fetchAllProjects: async () => {
      const token = localStorage.getItem("authToken");
      return apiRequest(
        async () => {
          const response = await axios.get(
            `${backendUrl}/admin/content/project-summary`,
            {
              headers: { Authorization: token },
            }
          );
          console.log("response", response.data.projects);
          set((state) => {
            state.projectSummaries = response.data.projects;
          });
          return response;
        },
        "Fetching projects...",
        "Projects fetched successfully!"
      );
    },
    fetchProjectById: async (projectId) => {
      const token = localStorage.getItem("authToken");
      const existingProject = get().projectDetails[projectId];

      if (existingProject) {
        return {
          status: "success",
          data: existingProject,
        };
      }

      return apiRequest(
        async () => {
          const response = await axios.get(
            `${backendUrl}/admin/content/project?projectId=${projectId}`,
            {
              headers: { Authorization: token },
            }
          );
          set((state) => {
            state.projectDetails[projectId] = response.data.project;
          });
          return response;
        },
        "Fetching project...",
        "Project fetched successfully!"
      );
    },
  }))
);

export const getS3UploadUrl = async (fileType, contentType, section, id) => {
  const token = localStorage.getItem("authToken");
  const payload = {
    fileType: fileType,
    contentType: contentType,
    section: section,
    id: id,
  };

  return apiRequest(
    async () => {
      return await axios.post(`${backendUrl}/admin/files/upload`, payload, {
        headers: { Authorization: token },
      });
    },
    "Fetching S3 upload URL...",
    "S3 upload URL fetched successfully!"
  );
};

export const deleteS3File = async (fileUrl) => {
  const token = localStorage.getItem("authToken");

  if (!fileUrl) {
    toast.error("No file URL provided");
    return;
  }

  try {
    const response = await axios.delete(`${backendUrl}/admin/files/delete`, {
      headers: { Authorization: token },
      params: { fileUrl },
    });

    if (response.status === 200) {
      toast.success("File deleted successfully");
      return {
        status: "success",
        data: response.data,
      };
    } else {
      throw new Error("Failed to delete file");
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    toast.error("An error occurred while deleting the file");
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const editNameStatus = async (projectId, projectName, projectStatus) => {
  const token = localStorage.getItem("authToken");

  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/content/edit-namestat`,
        { projectId, projectName, projectStatus },
        {
          headers: { Authorization: token },
        }
      );
    },
    "Editing project name and status...",
    "Project name and status edited successfully!"
  );
};

export const editMetadata = async (projectId, metadata) => {
  const token = localStorage.getItem("authToken");

  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/content/edit-metadata`,
        { projectId, ...metadata },
        {
          headers: { Authorization: token },
        }
      );
    },
    "Editing project metadata...",
    "Project metadata edited successfully!"
  );
};

export const editMetaImages = async (projectId, metaImages) => {
  const token = localStorage.getItem("authToken");

  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/content/edit-metaImages`,
        { projectId, ...metaImages },
        {
          headers: { Authorization: token },
        }
      );
    },
    "Editing meta images...",
    "Meta images edited successfully!"
  );
};

export const editTokenData = async (projectId, tokenData) => {
  const token = localStorage.getItem("authToken");

  const buyPrice = tokenData.buyPrice;
  const tokenId = tokenData.tokenId;

  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/content/edit-tokenData`,
        { projectId, buyPrice, tokenId },
        {
          headers: { Authorization: token },
        }
      );
    },
    "Editing token data...",
    "Token data edited successfully!"
  );
};

// export const editArrays = async (projectId, section, sectionData) => {
//   console.log("sectionData", sectionData);
//   const token = localStorage.getItem("authToken");

//   return apiRequest(
//     async () => {
//       return await axios.post(
//         `${backendUrl}/admin/content/edit-arrays`,
//         { projectId, section, [section]: sectionData },
//         {
//           headers: { Authorization: token },
//         }
//       );
//     },
//     "Editing arrays...",
//     "Arrays edited successfully!"
//   );
// };

export const editArrays = async (projectId, section, sectionData) => {
  console.log("sectionData", sectionData);
  const token = localStorage.getItem("authToken");

  return apiRequest(
    async () => {
      return await axios.post(
        `${backendUrl}/admin/content/edit-arrays`,
        { projectId, section, [section.split(".").pop()]: sectionData },
        {
          headers: { Authorization: token },
        }
      );
    },
    "Editing arrays...",
    "Arrays edited successfully!"
  );
};

export const deleteProject = async (projectId) => {
  const token = localStorage.getItem("authToken");

  return apiRequest(
    async () => {
      return await axios.delete(`${backendUrl}/admin/content/delete-project`, {
        headers: { Authorization: token },
        params: { projectId },
      });
    },
    "Deleting project...",
    "Project deleted successfully!"
  );
};

// =======================================
// utils
// =======================================

export const formatDate = (isoString) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two-digit minutes

  return `${day} ${month}, ${year} ${hours}:${minutes}`;
};

export const calculateTimeDifference = (isoDate) => {
  const now = new Date();
  const past = new Date(isoDate);
  const differenceInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(differenceInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} old`;
    }
  }
  return "just now";
};
