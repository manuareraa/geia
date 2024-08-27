import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore, useSummaryStore } from "../state-management/AppState";
import { useConnect, ConnectButton } from "thirdweb/react";
import { inAppWallet, hasStoredPasskey } from "thirdweb/wallets/in-app";
import { client } from "../state-management/thirdwebClient";

function Wallet(props) {
  const navigate = useNavigate();
  const [screen, setScreen] = useState("login");
  const { setWalletAddress, walletAddress } = useUserStore();
  const { fetchSummary, orgSummary } = useSummaryStore();
  const [passkeyInProcess, setPasskeyInProcess] = useState(false);
  const { connect } = useConnect();

  const [walletData, setWalletData] = useState({
    totalTokens: 0,
    tokensArray: [],
  });

  useEffect(() => {
    // check if user is logged in
    if (!walletAddress) {
      console.log("User not logged in");
      setScreen("login");
    } else if (walletAddress && walletAddress !== "") {
      console.log("User logged in");
      setScreen("wallet");
    }
  }, []);

  const fetchSummaryAndUpdate = async () => {
    try {
      //   let summary = await fetchSummary(
      //     "0xB06f963b18E1d95cf2249B8852abbE6B52c33e9F"
      //   );
      let summary = await fetchSummary(walletAddress);
      summary = summary.summary.summary;
      console.log("Summary", summary);
      let totalTokens = 0;
      for (let i = 0; i < summary.length; i++) {
        totalTokens += parseInt(summary[i].tokenBalance);
      }
      setWalletData({
        totalTokens: totalTokens,
        tokensArray: summary,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (screen === "wallet" && orgSummary === null) {
      console.log("screen is wallet but orgsummary is null");
      fetchSummaryAndUpdate();
    } else if (screen === "wallet" && orgSummary !== null) {
      console.log("Summary already fetched");
      try {
        let tempSummary = orgSummary.summary.summary;
        console.log("Summary", tempSummary);
        let totalTokens = 0;
        for (let i = 0; i < tempSummary.length; i++) {
          totalTokens += parseInt(tempSummary[i].tokenBalance);
        }
        setWalletData({
          totalTokens: totalTokens,
          tokensArray: tempSummary,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("Summary not fetched");
    }
  }, [screen]);

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
        setWalletAddress(wallet.getAccount().address);
        setScreen("wallet");
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
    // Outer container
    <div className="flex flex-col justify-center w-full">
      {/* Title container */}
      <div className="flex flex-col items-center justify-center pt-8 space-y-8">
        {/* Title */}
        <p className="text-[16px] md:text-[25px] lg:text-[40px] font-bold">
          Your Wallet
        </p>
      </div>

      <div className="divider"></div>

      {screen === "login" ? (
        <div className="flex flex-col items-center justify-center text-center gap-y-3">
          <p>Have you already created a wallet for Geoblocs using "passkey"?</p>
          {isFirefox() === true ? (
            <p className="text-red-500">
              Please note that the wallet feature is not supported on Firefox
              browser. Please use Chrome or other passkey supported browsers.
            </p>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center mt-4 gap-y-4">
                <button
                  className="flex items-center justify-center px-8 py-2 font-bold text-white rounded-lg btn-md bg-gGreen disabled:opacity-50"
                  onClick={async () => {
                    await login("new");
                    // setScreen("wallet");
                  }}
                  disabled={passkeyInProcess}
                >
                  {passkeyInProcess ? "Please wait..." : "No, I am a new user"}
                </button>
                <button
                  className="flex items-center justify-center px-8 py-2 font-bold text-white rounded-lg btn-md bg-gGreen disabled:opacity-50"
                  onClick={async () => {
                    await login("existing");
                    // setScreen("wallet");
                  }}
                  disabled={passkeyInProcess}
                >
                  {passkeyInProcess
                    ? "Please wait..."
                    : "Yes, I have a passkey"}
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* Wallet container */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg">You Own</p>
              <p className="font-bold text-7xl text-gGreen">
                {walletData.totalTokens}
              </p>
              <p className="text-lg">Geoblocs</p>
            </div>
          </div>

          {/* token distribution container */}
          <div className="flex flex-col items-center justify-center">
            <p className="pb-4 mt-8 text-lg font-bold">Your Token Portfolio</p>
            {walletData.tokensArray.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full gap-y-2">
                <p>No tokens available</p>
                <button
                  className="flex items-center justify-center px-8 py-2 font-bold text-white rounded-lg bg-gGreen btn-md"
                  onClick={() => {
                    navigate("/explore-projects");
                  }}
                >
                  Buy Tokens
                </button>
              </div>
            ) : (
              <div className="w-3/4 overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Project Name</th>
                      <th>Token Balance</th>
                      <th>Buy</th>
                      <th>View Project</th>
                      <th>NFT Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {walletData.tokensArray.map((token, index) => {
                      return (
                        <tr className="hover" key={index}>
                          <th>{index + 1}</th>
                          <td>{token.projectName}</td>
                          <td>{token.tokenBalance}</td>
                          <td>
                            <button
                              className="flex items-center justify-center h-10 px-4 py-2 text-xs font-bold text-white rounded-lg w-fit bg-gGreen btn-xs"
                              onClick={() => {
                                // open link in new tab
                                window.open(
                                  "http://geoblocs.com/project/view/" +
                                    token.projectId,
                                  "_blank"
                                );
                              }}
                            >
                              Buy
                            </button>
                          </td>
                          <td>
                            <button
                              className="flex items-center justify-center h-10 px-4 py-2 text-xs font-bold text-white rounded-lg w-fit bg-gGreen btn-xs"
                              onClick={() => {
                                // open link in new tab
                                window.open(
                                  "http://geoblocs.com/project/view/" +
                                    token.projectId,
                                  "_blank"
                                );
                              }}
                            >
                              View Project
                            </button>
                          </td>
                          <td>
                            <img
                              src={token.nft}
                              alt="project"
                              className="object-contain rounded-xl"
                              height={200}
                              width={200}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Wallet;
