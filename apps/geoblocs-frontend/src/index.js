import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Ethereum, Polygon, PolygonAmoyTestnet } from "@thirdweb-dev/chains";
// import { defineChain } from "thirdweb/chains";

// const amoyChain = defineChain({
//   id: 80002,
//   rpc: "https://80002.rpc.thirdweb.com",
// });

// create the client with your clientId, or secretKey if in a server environment
// const client = createThirdwebClient({
//   clientId: "xxxxxx",
//   // chain: defineChain(80002),
// });

// connect to your contract
// const contract = getContract({
//   client,
//   chain: defineChain(80002),
//   address: "0x70706EC2a6B49cEf250D3F7eE00955AE21532384"
// });

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
