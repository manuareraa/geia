import React, { useState, useEffect } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";

function EnvironmentSW(props) {
  const [envCards, setEnvCards] = useState([]);

  function extractIframeSrc(iframeString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(iframeString, "text/html");
    const iframeElement = doc.querySelector("iframe");

    if (iframeElement) {
      return iframeElement.getAttribute("src");
    } else {
      return null;
    }
  }

  const renderEnvCards = () => {
    let tempArray = [];
    setEnvCards([]);
    props.projectEnvDatas.forEach((envData, index) => {
      console.log("link", envData.link);
      const src = extractIframeSrc(envData.link);
      let card = (
        <iframe
          width={envData.width || 800}
          height={envData.height || 800}
          frameborder="0"
          src={src}
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
    <div className="flex flex-col px-6 pb-16 lg:px-60">
      <div className="flex flex-col p-8 rounded-xl bg-glGreen">
        {/* title bar */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-bold text-center lg:text-2xl">
            Environment Data
          </p>
          <img
            src={backCircle}
            className="w-8 hover:cursor-pointer lg:w-12"
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
