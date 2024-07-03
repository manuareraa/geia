import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";
import { immer } from "zustand/middleware/immer";

// Environmental Variables
export const backendUrl =
  import.meta.env.REACT_APP_BACKEND_URL || "https://admin.api.geoblocs.com";

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
