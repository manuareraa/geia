import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "axios";

// Environmental Variables
export const backendUrl =
  import.meta.env.REACT_APP_BACKEND_URL || "https://admin.api.geoblocs.com";

// Authentication State Management
export const useAuthStore = create((set) => ({
  isAuthenticated: true,
  user: null,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
}));

// Loading State Management
export const useLoadingStore = create((set) => ({
  isLoading: false,
  message: "",
  startLoading: (message = "") => set({ isLoading: true, message }),
  stopLoading: () => set({ isLoading: false, message: "" }),
}));

// Reusable Toast Notification Function
const showToast = (type, message) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};

// Admin User Login Function
export const loginAdminUser = async (email, password) => {
  console.log("Logging in with email:", email);
  const { startLoading, stopLoading } = useLoadingStore.getState();
  const { setUser } = useAuthStore.getState();

  const loadingToast = toast.loading("Logging in...");

  try {
    startLoading("Logging in...");

    console.log("Logging in with email (appstate):", email, password);

    const response = await axios.post(`${backendUrl}/admin/user/login`, {
      emailId: email,
      password: password,
    });

    const user = response.data;
    if (!user.token) {
      throw new Error("Admin approval required.");
    }

    // Save token to local storage
    localStorage.setItem("authToken", user.token);

    setUser(user);

    toast.dismiss(loadingToast);
    showToast("success", "Login successful!");

    return {
      status: "success",
      data: user,
    };
  } catch (error) {
    console.error("Error logging in:", error);
    toast.dismiss(loadingToast);
    showToast("error", "Error logging in. Please try again.");
    return {
      status: "error",
      message: error.message,
    };
  } finally {
    stopLoading();
    console.log("Login attempt completed.");
  }
};

// Generate QR Code for 2FA
export const generateQrCode = async (email) => {
  const { startLoading, stopLoading } = useLoadingStore.getState();
  const loadingToast = toast.loading("Generating QR code...");

  try {
    startLoading("Generating QR code...");

    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      `${backendUrl}/admin/user/generate-qr`,
      {
        emailId: email,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    toast.dismiss(loadingToast);
    showToast("success", "QR code generated successfully!");

    return {
      status: "success",
      data: response.data.qrCode,
    };
  } catch (error) {
    console.error("Error generating QR code:", error);
    toast.dismiss(loadingToast);
    showToast("error", "Error generating QR code. Please try again.");
    return {
      status: "error",
      message: error.message,
    };
  } finally {
    stopLoading();
  }
};

// Verify 2FA Token
export const verifyToken = async (email, token) => {
  const { startLoading, stopLoading } = useLoadingStore.getState();
  const loadingToast = toast.loading("Verifying token...");

  try {
    startLoading("Verifying token...");

    const authToken = localStorage.getItem("authToken");

    const response = await axios.post(
      `${backendUrl}/admin/user/verify-token`,
      {
        emailId: email,
        token: token,
      },
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    toast.dismiss(loadingToast);
    showToast("success", "Token verified successfully!");

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    console.error("Error verifying token:", error);
    toast.dismiss(loadingToast);
    showToast("error", "Error verifying token. Please try again.");
    return {
      status: "error",
      message: error.message,
    };
  } finally {
    stopLoading();
  }
};

// Admin User Logout Function
export const logoutAdminUser = () => {
  const { setUser } = useAuthStore.getState();
  setUser(null);
  localStorage.removeItem("authToken");
  showToast("success", "Logout successful!");
  return {
    status: "success",
  };
};

// Check for token in cookies and perform auto-login
export const autoLogin = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    const { setUser } = useAuthStore.getState();
    const { startLoading, stopLoading } = useLoadingStore.getState();
    const loadingToast = toast.loading("Logging in...");

    try {
      startLoading("Logging in...");

      const response = await axios.get(`${backendUrl}/admin/user/auto-login`, {
        headers: {
          Authorization: token,
        },
      });

      const user = response.data.user;
      setUser(user);

      toast.dismiss(loadingToast);
      showToast("success", "Auto login successful!");

      return {
        status: "success",
        data: user,
      };
    } catch (error) {
      console.error("Error during auto login:", error);
      toast.dismiss(loadingToast);
      showToast("error", "Auto login failed. Please log in again.");
      return {
        status: "error",
        message: error.message,
      };
    } finally {
      stopLoading();
    }
  } else {
    return {
      status: "error",
      message: "No token found. Please log in.",
    };
  }
};
