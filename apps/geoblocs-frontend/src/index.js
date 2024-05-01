import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, PolygonAmoyTestnet } from "@thirdweb-dev/chains";

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
        activeChain={PolygonAmoyTestnet}
        clientId={process.env.TWCID}
      >
        <App />
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
