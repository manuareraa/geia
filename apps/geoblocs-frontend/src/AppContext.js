import React, { useState, useEffect, createContext } from "react";
import { Toaster } from "react-hot-toast";

import Loading from "./components/Loading";
import Navbar from "./components/Navbar";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState({
    status: "false",
    message: "",
  });

  const [appData, setAppData] = useState({});

  const backendUrl = "http://localhost:8000";

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
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
