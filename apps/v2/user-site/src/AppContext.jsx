import React, { useState, useEffect, createContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    status: "false",
    message: "",
  });

  const [appData, setAppData] = useState({});

  const backendUrl = import.meta.env.REACT_APP_BACKEND_URL;
  // const backendUrl = "http://localhost:3010";
//   const contractAddress = import.meta.env.REACT_APP_CONTRACT_ADDRESS;

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        appData,
        setAppData,
      }}
    >
      <Toaster />
      {children}
    </AppContext.Provider>
  );
};
