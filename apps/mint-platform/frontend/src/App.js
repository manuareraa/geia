import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Routes, Route, useNavigate } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";

// blockchain
import { generateAccount, SignatureType } from "@unique-nft/accounts";
import { waitReady } from "@polkadot/wasm-crypto";
import { KeyringProvider } from "@unique-nft/accounts/keyring";
import { KeyringOptions } from "@polkadot/keyring/types";
import Sdk from "@unique-nft/sdk";

import Homepage from "./pages/Homepage";

import "./App.css";

function App() {
  const [appState, setAppState] = useState({
    email: "",
    user: null,
    sdk: null,
    backend: "http://localhost:4005",
    // backend: "https://geia-backend.onrender.com",
  });

  const createAccount = async () => {
    try {
      await waitReady(); // Wait for the WASM interface to initialize

      const account = await generateAccount({
        pairType: SignatureType.Sr25519,
        meta: {
          name: "my_test_account",
        },
      });

      return account;
    } catch (error) {
      console.error("Error generating account:", error);
    }
  };

  const setupBlockchainConn = async () => {
    const KROptions = {
      type: "sr25519",
    };
    const provider = new KeyringProvider(KROptions);
    await provider.init();

    const signer = provider.addSeed(
      "0xb0c1844003cd9afb577dbf250dcc3b791f1be9280d6e7a6f058e3b8169a64292"
    );

    const options = {
      baseUrl: "https://rest.unique.network/opal/v1",
      signer: signer,
    };
    const sdk = new Sdk(options);
    setAppState((prevState) => {
      return { ...prevState, sdk: sdk };
    });
    console.log("SDK: ", sdk);
  };

  const getBalance = async () => {
    const balance = await appState.sdk.balance.get({
      address: "5D2RJGWPjZUh61EYZT8mGAGHApqUwXucNeUbdQeUfnYzywvT",
    });
    console.log("Balance: ", balance);
  };

  const createNewCollection = async () => {
    try {
      const result =
        await appState.sdk.refungible.createCollection.submitWaitResult({
          address: "5D2RJGWPjZUh61EYZT8mGAGHApqUwXucNeUbdQeUfnYzywvT",
          name: "Sacred Forest T1",
          description: "Sacred Forest Description",
          tokenPrefix: "SFAP",
        });
      const { collectionId, amount } = result.parsed;
      console.log("Collection Created: ", result);
      console.log("Collection ID: ", collectionId);
      console.log("Amount: ", amount);
    } catch (error) {
      console.error("Error creating collection:", error);
    }
  };

  const createNewNFT = async () => {
    const result = await appState.sdk.refungible.createToken.submitWaitResult({
      address: "5D2RJGWPjZUh61EYZT8mGAGHApqUwXucNeUbdQeUfnYzywvT",
      collectionId: 1836,
      amount: 10000,
    });
    const { collectionId, tokenId } = result.parsed;
    console.log("NFT Created: ", result);
    console.log("Collection ID: ", collectionId);
    console.log("Token ID: ", tokenId);
  };

  const mintTokens = async (address) => {
    let response = null;
    try {
      response = await appState.sdk.refungible.transferToken.submitWaitResult({
        address: "5D2RJGWPjZUh61EYZT8mGAGHApqUwXucNeUbdQeUfnYzywvT",
        to: address,
        collectionId: 1836,
        tokenId: 1,
        amount: 1,
      });
      console.log("NFT Transferred Successfully", response);
      return { status: "success", response: response };
    } catch (error) {
      console.error("Error minting tokens:", error);
      return { status: "error", response: error };
    }
  };

  const getNFTBalance = async () => {
    console.log("Getting Balance..");
    const result = await appState.sdk.refungible.getBalance({
      // address: "5E7RZp9c7iHQSRBG7KxUbABHtWoSKTfPMZya46q3UxJMbXeA",
      address: "5D2RJGWPjZUh61EYZT8mGAGHApqUwXucNeUbdQeUfnYzywvT",
      collectionId: 1836,
      tokenId: 1,
    });

    console.log("Balance: ", result);
    setAppState((prevState) => {
      return {
        ...prevState,
        minted: 10000 - parseInt(result.amount),
        left: parseInt(result.amount),
      };
    });
  };

  const checkAndMint = async (email) => {
    setAppState((prevState) => {
      return { ...prevState, email: email };
    });

    const checkUserExists = await axios.get(
      appState.backend + "/user-by-mail",
      {
        params: {
          email: email,
        },
      }
    );

    console.log(checkUserExists.data);

    if (checkUserExists.data.status === "found") {
      const userData = checkUserExists.data.user;
      console.log("User Data: ", userData);
      setAppState((prevState) => {
        return { ...prevState, wallet: userData.wallet };
      });
      const mintResponse = await mintTokens(userData.wallet.keyfile.address);
      if (mintResponse.status === "success") {
        toast.success("NFT Minted Successfully");
        const beResponse = await axios.post(
          appState.backend + "/add-mintHistory",
          {
            email: email,
            mintHistory: mintResponse.response,
          }
        );
        console.log("BE Response: ", beResponse);
        getNFTBalance();
        return {
          status: "success",
        };
      } else {
        toast.error("Error Minting NFT");
        return {
          status: "error",
        };
      }
    } else {
      const newAcc = await createAccount();
      console.log("New Account: ", newAcc);
      const newUser = await axios.post(appState.backend + "/signup", {
        email: email,
        wallet: newAcc,
      });
      console.log("New User: ", newUser);
      setAppState((prevState) => {
        return { ...prevState, wallet: newAcc };
      });
      const mintResponse = await mintTokens(newAcc.keyfile.address);
      if (mintResponse.status === "success") {
        toast.success("NFT Minted Successfully");
        const beResponse = await axios.post(
          appState.backend + "/add-mintHistory",
          {
            email: email,
            mintHistory: mintResponse.response,
          }
        );
        console.log("BE Response: ", beResponse);
        getNFTBalance();
        return {
          status: "success",
        };
      } else {
        toast.error("Error Minting NFT");
        return {
          status: "error",
        };
      }
    }
  };

  useEffect(() => {
    setupBlockchainConn();
  }, []);

  useEffect(() => {
    console.log("App State: ", appState);
    if (appState.sdk !== null) {
      getNFTBalance();
    }
  }, [appState.sdk]);

  return (
    <>
      <Toaster />
      {/* <Navbar appState={appState} logout={logout} /> */}
      {/* <button
        className="btn"
        onClick={() => {
          // mintGeobloc("");
          // getBalance();
          // createNewCollection();
          // createNewNFT();
          // mintTokens();
          // getNFTBalance();
        }}
      >
        Check
      </button> */}
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              appState={appState}
              setAppState={setAppState}
              checkAndMint={checkAndMint}
            />
          }
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </>
  );
}

export default App;
