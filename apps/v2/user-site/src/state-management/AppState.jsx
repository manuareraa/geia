import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";
import { immer } from "zustand/middleware/immer";

import { useSignerStatus, useAuthenticate } from "@alchemy/aa-alchemy/react";

// Environmental Variables
export const backendUrl =
  import.meta.env.REACT_APP_BACKEND_URL || "https://user.api.geoblocs.com";

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

// =======================================
// User Store
// =======================================

export const useUserStore = create(
  immer((set) => ({
    projects: [],
    allProjects: {},
    subscribeStatus: null,
    walletAddress: null,

    setWalletAddress: (walletAddress) => {
      set({ walletAddress });
    },

    fetchProjectsSummary: async () => {
      const request = () => axios.get(`${backendUrl}/user/projects-summary`);
      const result = await apiRequest(
        request,
        "Fetching project summaries...",
        "Project summaries fetched successfully"
      );
      if (result.status === "success") {
        set({ projects: result.data.projects });
      }
    },

    fetchProjectById: async (projectId) => {
      const request = () =>
        axios.get(`${backendUrl}/user/project`, { params: { projectId } });
      const result = await apiRequest(
        request,
        "Fetching project details...",
        "Project details fetched successfully"
      );
      if (result.status === "success") {
        // add project to all projects with projectId as key
        set((state) => {
          state.allProjects[projectId] = result.data.project;
        });
        return result.data.project;
      }
    },

    fetchOnChainTokenData: async (tokenId) => {
      const request = () =>
        axios.get(`${backendUrl}/bc/token/fetch-onchain-token-data`, {
          params: { tokenId },
        });
      const result = await apiRequest(
        request,
        "Fetching token details...",
        "Token details fetched successfully"
      );
      console.log("result:", result);
      if (result.status === "success") {
        return {
          totalSupply: result.data.totalSupply,
          availableSupply: result.data.balance,
        };
      }
    },

    subscribeByEmail: async (email) => {
      const request = () =>
        axios.post(`${backendUrl}/user/subscribe`, { email });
      const result = await apiRequest(
        request,
        "Subscribing...",
        "Subscribed successfully"
      );
      if (result.status === "success") {
        set({ subscribeStatus: result.data });
      }
    },
  }))
);
