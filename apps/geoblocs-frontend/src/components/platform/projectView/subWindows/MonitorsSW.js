import React, { useEffect, useState } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";

function MonitorsSW(props) {
  const [monitorCards, setMonitorCards] = useState([]);

  const renderMonitorCards = () => {
    let tempArray = [];
    setMonitorCards([]);
    props.monitorsData.forEach((monitor, index) => {
      let card = (
        <div className="flex flex-col items-center justify-center px-0 py-4 space-y-4 bg-white rounded-xl">
          <img
            src={monitor.image}
            className="w-48 mt-2 rounded-md object-fit hover:cursor-pointer"
          />
          <p
            className="underline underline-offset-2 hover:cursor-pointer"
            onClick={() => {
              window.open(monitor.link, "_blank");
            }}
          >
            {monitor.label}
          </p>
        </div>
      );
      tempArray.push(card);
      setMonitorCards(tempArray);
    });
  };

  useEffect(() => {
    console.log(props.monitorsData);
    renderMonitorCards();
  }, [props.monitorsData]);

  return (
    <>
      <div className="flex flex-col pb-16 px-60">
        <div className="flex flex-col p-8 rounded-xl bg-glGreen">
          {/* title bar */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-2xl font-bold text-center">Monitors</p>
            <img
              src={backCircle}
              className="w-12 hover:cursor-pointer"
              onClick={() => {
                props.setSubWindow("default");
              }}
            ></img>
          </div>
          <div className="divider"></div>
          {monitorCards.length > 0 ? (
            <div className="grid grid-cols-4">{monitorCards}</div>
          ) : (
            <p className="text-2xl font-bold text-center">No Monitors</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MonitorsSW;
