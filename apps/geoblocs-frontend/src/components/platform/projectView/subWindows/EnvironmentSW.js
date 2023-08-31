import React, { useState, useEffect } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";

function EnvironmentSW(props) {
  const [envCards, setEnvCards] = useState([]);

  const renderEnvCards = () => {
    let tempArray = [];
    setEnvCards([]);
    props.projectEnvDatas.forEach((envData, index) => {
      let card = (
        <iframe
          width={envData.width}
          height={envData.height}
          frameborder="0"
          src={envData.link}
        ></iframe>
      );
      tempArray.push(card);
      setEnvCards(tempArray);
    });
  };

  useEffect(() => {
    console.log(props.projectEnvDatas);
    if (props.projectEnvDatas.length > 0) {
      renderEnvCards();
    }
  }, [props.projectEnvDatas]);

  return (
    <div className="flex flex-col pb-16 px-60">
      <div className="flex flex-col p-8 rounded-xl bg-glGreen">
        {/* title bar */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-2xl font-bold text-center">Environment Data</p>
          <img
            src={backCircle}
            className="w-12 hover:cursor-pointer"
            onClick={() => {
              props.setSubWindow("default");
            }}
          ></img>
        </div>
        <div className="divider"></div>
        {envCards.length > 0 ? (
          <div className="flex flex-col items-center justify-center w-full my-4 space-y-6">
            {envCards}
          </div>
        ) : (
          <p className="text-2xl font-bold text-center">No Environment Data</p>
        )}
      </div>
    </div>
  );
}

export default EnvironmentSW;
