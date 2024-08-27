import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { useConnect, ConnectButton } from "thirdweb/react";
import { inAppWallet, hasStoredPasskey } from "thirdweb/wallets/in-app";
import { client } from "../state-management/thirdwebClient";

function MobileVerification(props) {
  const [passkeyInProcess, setPasskeyInProcess] = useState(false);
  const { connect } = useConnect();
  const [walletAddress, setWalletAddress] = useState("");

  const login = async (userStatus) => {
    try {
      setPasskeyInProcess(true);
      await connect(async () => {
        const wallet = inAppWallet();
        const hasPasskey = await hasStoredPasskey(client);
        await wallet.connect({
          client,
          strategy: "passkey",
          // type: hasPasskey ? "sign-in" : "sign-up",
          type: userStatus === "new" ? "sign-up" : "sign-in",
        });
        console.log("Wallet", wallet);
        console.log("Account", wallet.getAccount());
        const address = wallet.getAccount().address;
        // setWalletAddress(wallet.getAccount().address);
        // Construct the deep link URL with the token
        const deepLinkUrl = `geoblocs://?address=${encodeURIComponent(
          address
        )}`;

        // Redirect to the mobile app using the deep link
        window.location.href = deepLinkUrl;
        return wallet;
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setPasskeyInProcess(false);
    }
  };

  const isFirefox = () => {
    return navigator.userAgent.toLowerCase().includes("firefox");
    // return false;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      {isFirefox() ? (
        <div>
          <h1>Sorry, this feature is not supported on Firefox.</h1>
          <h2>Please use Chrome or Brave browser to continue.</h2>
        </div>
      ) : (
        <>
          <p className="px-8 mb-8 text-xl font-bold text-center">
            Have you already created a wallet for Geoblocs using "passkey"?
          </p>
          <div className="flex flex-col items-center justify-center gap-y-4">
            <Button
              className="px-16 py-6 text-lg font-bold text-white bg-gGreen disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gGreen/50"
              onClick={() => login("new")}
              loading={passkeyInProcess}
              disabled={passkeyInProcess}
            >
              {passkeyInProcess ? "Please wait..." : "No, I am a new user"}
            </Button>
            <Button
              className="px-16 py-6 text-lg font-bold text-white bg-gGreen disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gGreen/50"
              onClick={() => login("existing")}
              loading={passkeyInProcess}
              disabled={passkeyInProcess}
            >
              {passkeyInProcess ? "Please wait..." : "Yes, I have a passkey"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default MobileVerification;
