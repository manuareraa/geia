import React from "react";

import addIcon from "../../../assets/svg/add.svg";
import editIcon from "../../../assets/svg/edit.svg";
import GeoblocsChart from "../GeoblocsChart";

function ManageGeoblocs(props) {
  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Manage Geoblocs</p>

        {/* title button containers */}
        {/* <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewCondition}
          >
            Add New Condition
          </button>
        </div> */}
      </div>
      <div className="divider"></div>

      {/* body */}
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          {/* create geoblocs */}
          <div className="grid items-center grid-cols-2 gap-x-8 w-fit">
            <button
              className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
              //   onClick={addNewCondition}
            >
              <div className="flex flex-row items-center space-x-4">
                <img src={addIcon} alt="add icon" />
                <p>Create Geoblocs</p>
              </div>
            </button>
            <div className="flex flex-row items-end space-x-2">
              <img src={editIcon} alt="" className="w-6 h-6"></img>
              <div className="flex flex-col space-y-">
                <p className="text-xs font-light">Total Supply</p>
                <input
                  type="text"
                  placeholder="Total Supply"
                  className="py-2 border-b-2 border-black/50 focus:outline-none"
                  //   value={linkElement.url}
                  //   onChange={(e) => updateLink(linkElement.id, "url", e)}
                />
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
                  className="py-2 border-b-2 border-black/50 focus:outline-none"
                  //   value={linkElement.url}
                  //   onChange={(e) => updateLink(linkElement.id, "url", e)}
                />
              </div>
            </div>
          </div>

          {/* update price */}
          <div className="grid items-center grid-cols-2 gap-x-8 w-fit">
            <button
              className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
              //   onClick={addNewCondition}
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
                  className="py-2 border-b-2 border-black/50 focus:outline-none"
                  //   value={linkElement.url}
                  //   onChange={(e) => updateLink(linkElement.id, "url", e)}
                />
              </div>
            </div>
          </div>

          {/* geoblocs distribution chart */}
          <p className="pt-16 text-2xl font-bold text-center">
            Geoblocs Distribution
          </p>

          {/* geoblocs stats container */}
          <div className="grid items-center justify-center grid-cols-3 gap-x-36">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-xl font-bold">Geoblocs Purchased</p>
              <p className="text-4xl">1265</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl">
              <p className="font-bold">Geoblocs Remaining</p>
              <p className="text-4xl">149,835</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl">
              <p className="font-bold">Total Supply</p>
              <p className="text-4xl">150,000</p>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full space-y-6 focus:outline-none">
            <GeoblocsChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageGeoblocs;
