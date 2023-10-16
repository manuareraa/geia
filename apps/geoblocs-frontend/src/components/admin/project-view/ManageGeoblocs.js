import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import addIcon from "../../../assets/svg/add.svg";
import editIcon from "../../../assets/svg/edit.svg";
import GeoblocsChart from "../GeoblocsChart";

function ManageGeoblocs(props) {
  const {
    createNewUniqueNetworkAcc,
    appData,
    createNewNftCollection,
    updateTokenPrice,
  } = useContext(AppContext);
  const [tokenName, setTokenName] = useState("");
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [excessAmount, setExcessAmount] = useState("");
  const [pricePerGeobloc, setPricePerGeobloc] = useState(
    appData.projectInView.geoblocsData.pricePerGeobloc
  );

  // const test = async () => {
  //   const acc = await createNewUniqueNetworkAcc("geoblocsTester1");
  //   console.log("Acc", acc);
  // };

  useEffect(() => {
    console.log("Geoblocs", appData.projectInView.geoblocsData);
  }, []);

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title of the page  */}
        <p className="text-4xl font-bold text-center">Manage Geoblocs</p>
      </div>

      {/* page divider */}
      <div className="divider"></div>

      {/* body */}
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          {/* create geoblocs */}
          <div className="grid items-center grid-cols-2 gap-x-8 w-fit">
            <button
              className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen disabled:cursor-not-allowed"
              disabled={
                appData.projectInView.geoblocsData.collectionId !== 0
                  ? true
                  : false
              }
              onClick={() => {
                if (
                  tokenName === "" ||
                  tickerSymbol === "" ||
                  description === "" ||
                  totalSupply === 0 ||
                  totalSupply === ""
                ) {
                  toast.error("Please provide all the info");
                } else {
                  console.log(
                    "Creating collection...",
                    tokenName,
                    description,
                    tickerSymbol,
                    props.projectId,
                    appData.projectInView.geoblocsData,
                    totalSupply
                  );
                  createNewNftCollection(
                    tokenName,
                    description,
                    tickerSymbol,
                    props.projectId,
                    appData.projectInView.geoblocsData,
                    totalSupply
                  );
                }
              }}
            >
              <div className="flex flex-row items-center space-x-4">
                <img src={addIcon} alt="add icon" />
                <p>Create Geoblocs</p>
              </div>
            </button>
            <div className="flex flex-col space-y-6">
              {/* name */}
              <div className="flex flex-row items-end space-x-2">
                <img src={editIcon} alt="" className="w-6 h-6"></img>
                <div className="flex flex-col space-y-">
                  <p className="text-xs font-light">Token Name</p>
                  <input
                    type="text"
                    placeholder="Token Name"
                    className="py-2 border-b-2 border-black/50 focus:outline-none disabled:cursor-not-allowed"
                    disabled={
                      appData.projectInView.geoblocsData.tokenName === ""
                        ? false
                        : true
                    }
                    value={
                      appData.projectInView.geoblocsData.tokenName === ""
                        ? tokenName
                        : appData.projectInView.geoblocsData.tokenName
                    }
                    onChange={(e) => setTokenName(e.target.value)}
                  />
                </div>
              </div>
              {/* ticker symbol */}
              <div className="flex flex-row items-end space-x-2">
                <img src={editIcon} alt="" className="w-6 h-6"></img>
                <div className="flex flex-col space-y-">
                  <p className="text-xs font-light">Ticker Symbol</p>
                  <input
                    type="text"
                    placeholder="Ticker Symbol"
                    className="py-2 border-b-2 border-black/50 focus:outline-none disabled:cursor-not-allowed"
                    disabled={
                      appData.projectInView.geoblocsData.tickerSymbol === ""
                        ? false
                        : true
                    }
                    value={
                      appData.projectInView.geoblocsData.tickerSymbol === ""
                        ? tickerSymbol
                        : appData.projectInView.geoblocsData.tickerSymbol
                    }
                    onChange={(e) => setTickerSymbol(e.target.value)}
                  />
                </div>
              </div>
              {/* description */}
              <div className="flex flex-row items-end space-x-2">
                <img src={editIcon} alt="" className="w-6 h-6"></img>
                <div className="flex flex-col space-y-">
                  <p className="text-xs font-light">Short Description</p>
                  <input
                    type="text"
                    placeholder="Short Description"
                    className="py-2 border-b-2 border-black/50 focus:outline-none disabled:cursor-not-allowed"
                    disabled={
                      appData.projectInView.geoblocsData.description === ""
                        ? false
                        : true
                    }
                    value={
                      appData.projectInView.geoblocsData.description === ""
                        ? description
                        : appData.projectInView.geoblocsData.description
                    }
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              {/* total supply */}
              <div className="flex flex-row items-end space-x-2">
                <img src={editIcon} alt="" className="w-6 h-6"></img>
                <div className="flex flex-col space-y-">
                  <p className="text-xs font-light">Total Supply</p>
                  <input
                    type="text"
                    placeholder="Total Supply"
                    className="py-2 border-b-2 border-black/50 focus:outline-none disabled:cursor-not-allowed"
                    disabled={
                      parseInt(
                        appData.projectInView.geoblocsData.totalSupply
                      ) === 0 ||
                      appData.projectInView.geoblocsData.totalSupply === ""
                        ? false
                        : true
                    }
                    value={
                      parseInt(
                        appData.projectInView.geoblocsData.totalSupply
                      ) === 0 ||
                      appData.projectInView.geoblocsData.totalSupply === ""
                        ? totalSupply
                        : appData.projectInView.geoblocsData.totalSupply
                    }
                    onChange={(e) => setTotalSupply(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* increase supply */}
          <div className="grid items-center grid-cols-2 gap-x-8 w-fit">
            <button
              className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
              //   onClick={addNewCondition}
            >
              <div className="flex flex-row items-center space-x-4">
                <img src={addIcon} alt="add icon" />
                <p>Increase Supply</p>
              </div>
            </button>
            <div className="flex flex-row items-end space-x-2">
              <img src={editIcon} alt="" className="w-6 h-6"></img>
              <div className="flex flex-col space-y-">
                <p className="text-xs font-light">Excess Geoblocs</p>
                <input
                  type="text"
                  placeholder="Excess Geoblocs"
                  className="py-2 border-b-2 border-black/50 focus:outline-none disabled:cursor-not-allowed"
                  disabled={
                    appData.projectInView.geoblocsData.collectionId === 0
                      ? true
                      : false
                  }
                  value={excessAmount}
                  onChange={(e) => setExcessAmount(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* update price */}
          <div className="grid items-center grid-cols-2 gap-x-8 w-fit">
            <button
              className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
              onClick={async () => {
                if (parseInt(pricePerGeobloc) > 0) {
                  const updateResult = await updateTokenPrice(
                    props.projectId,
                    parseInt(pricePerGeobloc)
                  );
                  if (updateResult === true) {
                    toast.success("Price updated successfully ");
                  } else {
                    toast.error("Failed to update price. Try again");
                  }
                } else {
                  toast.error("Price cannot be zero");
                }
              }}
            >
              <div className="flex flex-row items-center space-x-4">
                <p>Update Price</p>
              </div>
            </button>
            <div className="flex flex-row items-end space-x-2">
              <img src={editIcon} alt="" className="w-6 h-6"></img>
              <div className="flex flex-col space-y-">
                <p className="text-xs font-light">Price per Geobloc</p>
                <input
                  type="text"
                  placeholder="Price per Geobloc"
                  className="py-2 border-b-2 border-black/50 focus:outline-none disabled:cursor-not-allowed"
                  disabled={
                    appData.projectInView.geoblocsData.collectionId === 0
                      ? true
                      : false
                  }
                  value={pricePerGeobloc}
                  onChange={(e) => setPricePerGeobloc(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* geoblocs distribution chart */}
          <p className="pt-16 text-2xl font-bold text-center">
            Geoblocs Distribution
          </p>

          {/* geoblocs stats container */}
          <div className="grid items-center justify-center grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-x-36">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-xl font-bold">Geoblocs Purchased</p>
              <p className="text-4xl">
                {appData.projectInView.geoblocsData.purchased}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl">
              <p className="font-bold">Geoblocs Remaining</p>
              <p className="text-4xl">
                {appData.projectInView.geoblocsData.totalSupply -
                  appData.projectInView.geoblocsData.totalSupply}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl">
              <p className="font-bold">Total Supply</p>
              <p className="text-4xl">
                {appData.projectInView.geoblocsData.totalSupply}
              </p>
            </div>
          </div>

          {/* geoblocs charts container */}
          <div className="flex flex-col items-center justify-center w-full space-y-6 lg:flex-row focus:outline-none">
            <GeoblocsChart
              totalSupply={appData.projectInView.geoblocsData.totalSupply}
              purchased={appData.projectInView.geoblocsData.purchased}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageGeoblocs;
