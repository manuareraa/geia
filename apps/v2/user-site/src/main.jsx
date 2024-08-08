import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";

import { ThirdwebProvider } from "thirdweb/react";

// override console.log statements if the REACT_APP_ENVIRONMENT variable is set to production
if (import.meta.env.REACT_APP_ENVIRONMENT === "production") {
  console.log = () => {};
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NextUIProvider className="h-full">
        <ThirdwebProvider>
          <App />
        </ThirdwebProvider>
      </NextUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);
