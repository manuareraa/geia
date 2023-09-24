import React, { useState, useEffect } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";
import rightArrowB from "../../../../assets/svg/right-arrow-b.svg";

function LinksSW(props) {
  const [linkCards, setLinkCards] = useState([]);

  const renderLinkCards = () => {
    let tempArray = [];
    setLinkCards([]);
    props.linksData.forEach((link, index) => {
      let card = (
        <div
          className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md"
          key={index}
        >
          <img src={rightArrowB} className="w-6 -rotate-45"></img>
          <p
            className="underline hover:cursor-pointer"
            onClick={() => {
              window.open(link.url, "_blank");
            }}
          >
            {link.label}
          </p>
        </div>
      );
      tempArray.push(card);
      setLinkCards(tempArray);
    });
  };

  useEffect(() => {
    console.log(props.linksData);
    if (props.linksData.length > 0) {
      renderLinkCards();
    }
  }, [props.linksData]);

  return (
    <div className="flex flex-col px-6 pb-16 lg:px-60">
      <div className="flex flex-col p-8 rounded-xl bg-glGreen">
        {/* title bar */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-bold text-center lg:text-2xl">Links</p>
          <img
            src={backCircle}
            className="w-8 lg:w-12 hover:cursor-pointer"
            onClick={() => {
              props.setSubWindow("default");
            }}
          ></img>
        </div>
        <div className="divider"></div>

        {linkCards.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 gap-y-6">{linkCards}</div>
        ) : (
          <p className="text-2xl font-bold text-center">No Links</p>
        )}
      </div>
    </div>
  );
}

export default LinksSW;
