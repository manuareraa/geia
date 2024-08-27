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

export const useTransactionStore = create(
  immer((set) => ({
    txnId: null, // To store the transaction ID
    txnStatus: null, // To store the status of the transaction (success, failure, pending)

    setTxnId: (txnId) => {
      set({ txnId });
    },

    setTxnStatus: (txnStatus) => {
      set({ txnStatus });
    },

    // Function to commit the transaction
    commitTransaction: async (txnType, txnData) => {
      const request = () =>
        axios.post(`${backendUrl}/verifier/txn/commit`, {
          txnType,
          ...txnData,
        });

      const result = await apiRequest(
        request,
        `Processing ${txnType} transaction...`,
        `${
          txnType.charAt(0).toUpperCase() + txnType.slice(1)
        } transaction committed successfully`
      );

      console.log("result:", result, result.statusCode, result.data);

      if (result && result.status === "success" && result.data?.txnId) {
        useTransactionStore.getState().setTxnId(result.data.txnId);
        console.log("result.data.txnId:", result.data.txnId);

        // Wait for the polling to complete before returning
        const pollResult = await useTransactionStore
          .getState()
          .checkTxnStatus(result.data.txnId);
        return pollResult; // Return only after polling completes
      } else {
        return null;
      }
    },

    // Function to check the status of the transaction
    checkTxnStatus: async (txnId) => {
      const { startLoading, stopLoading } = useLoadingStore.getState();
      let loopStarted = false;
      let finalResult = null;

      const poll = async () => {
        try {
          console.log("Starting the poll...", txnId);
          let loadingToast;

          if (!loopStarted) {
            loadingToast = toast.loading(
              `Checking status of transaction ${txnId}...`
            );
            loopStarted = true;
          }

          startLoading(`Checking status of transaction ${txnId}...`);

          const response = await axios.get(
            `${backendUrl}/verifier/txn/waitforcompletion`,
            {
              params: { tId: txnId },
            }
          );

          console.log("result:", response);

          if (response.status === 200) {
            useTransactionStore.getState().setTxnStatus("success");
            finalResult = "success";
            stopLoading();
            toast.dismiss(loadingToast);
          } else if (response.status === 205) {
            useTransactionStore.getState().setTxnStatus("failure");
            finalResult = "failure";
            stopLoading();
            toast.dismiss(loadingToast);
          } else if (response.status === 206) {
            useTransactionStore.getState().setTxnStatus("duplicate");
            finalResult = "duplicate";
            stopLoading();
            toast.dismiss(loadingToast);
          } else {
            // Continue polling every 2 seconds if status is not success or failure
            console.log("Continuing the poll...");
            setTimeout(poll, 2000);
          }
        } catch (error) {
          console.error("Error while checking transaction status:", error);
          stopLoading();
          toast.dismiss();
          finalResult = "error";
        }
      };

      await poll();

      // Wait until the polling has finished and a final result is set
      while (finalResult === null) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Delay to prevent a tight loop
      }

      return finalResult; // Only return when polling is completed
    },

    // Example functions for specific transaction types
    buyTokens: async (txnData) => {
      return await useTransactionStore
        .getState()
        .commitTransaction("buy", txnData);
    },

    redeemTokens: async (txnData) => {
      return await useTransactionStore
        .getState()
        .commitTransaction("redeem", txnData);
    },

    transferTokens: async (txnData) => {
      return await useTransactionStore
        .getState()
        .commitTransaction("transfer", txnData);
    },
  }))
);

export const useSummaryStore = create(
  immer((set) => ({
    orgSummary: null,

    fetchSummary: async (address) => {
      console.log("fetching summary for address:", address);

      const request = () =>
        axios.get(`${backendUrl}/bc/token/summary`, {
          params: { address },
        });

      const result = await apiRequest(
        request,
        "Fetching wallet summary...",
        "Wallet summary fetched successfully"
      );

      console.log("result:", result);

      if (result.status === "success") {
        set({ summary: result.data });
        return result.data;
      } else {
        return null;
      }
    },
  }))
);
