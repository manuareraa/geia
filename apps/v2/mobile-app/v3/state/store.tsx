// store.js
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import axios from "axios";

const backendUrl = "https://user.api.geoblocs.com";

// Reusable API Request Function
const apiRequest = async (request) => {
  try {
    const response = await request();
    return { status: "success", data: response.data };
  } catch (error) {
    console.error(error);
    return { status: "error", message: error.message };
  }
};

export const useAuthStore = create(
  immer((set) => ({
    isAuthenticated: false,
    walletAddress: null,

    setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
    setWalletAddress: (address: string) => set({ walletAddress: address }),
  }))
);

export const useSummaryStore = create(
  immer((set) => ({
    orgSummary: [],
    projects: [],

    fetchSummary: async (address) => {
      console.log("fetching summary for address:", address);

      const request = () =>
        axios.get(`${backendUrl}/bc/token/summary`, {
          params: { address: "0x86D1c2CAFfd2e834735646778B1487cBeF48b91e" },
        });

      const result = await apiRequest(request);

      console.log("result:", result);

      if (result.status === "success") {
        set({ orgSummary: result.data });
        return result.data;
      } else {
        return null;
      }
    },

    fetchProjectsSummary: async () => {
      const request = () => axios.get(`${backendUrl}/user/projects-summary`);
      const result = await apiRequest(request);
      if (result.status === "success") {
        set({ projects: result.data.projects });
        console.log("Projects:", result.data.projects);
        return result.data.projects;
      }
    },
  }))
);

// Loading Store
export const useLoadingStore = create(
  immer((set) => ({
    isLoading: false,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
  }))
);
