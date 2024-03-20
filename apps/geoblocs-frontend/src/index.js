import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// override console.log statements if the REACT_APP_ENVIRONMENT variable is set to production
if (process.env.REACT_APP_ENVIRONMENT === "production") {
  console.log = () => {};
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider
        // activeChain="polygon"
        activeChain="mumbai"
        clientId="4318bd47272bd9c4cee78ce3b5bb1fe8"
      >
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
