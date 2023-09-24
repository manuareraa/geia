import React, { useState, useEffect } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";
import documentIcon from "../../../../assets/svg/document.svg";

function DocumentsSW(props) {
  const [documentCards, setDocumentCards] = useState([]);

  const renderDocumentCards = () => {
    let tempArray = [];
    setDocumentCards([]);
    props.documentsData.forEach((document, index) => {
      let card = (
        <div
          className="flex flex-row items-center px-4 py-4 space-x-4 bg-white rounded-md"
          key={index}
        >
          <img src={documentIcon} className="w-6 "></img>
          <p
            className="underline hover:cursor-pointer"
            onClick={() => {
              window.open(document.url, "_blank");
            }}
          >
            {document.label}
          </p>
        </div>
      );
      tempArray.push(card);
      setDocumentCards(tempArray);
    });
  };

  useEffect(() => {
    console.log(props.documentsData);
    if (props.documentsData.length > 0) {
      renderDocumentCards();
    }
  }, [props.documentsData]);

  return (
    <div className="flex flex-col px-6 pb-16 lg:px-60">
      <div className="flex flex-col p-8 rounded-xl bg-glGreen">
        {/* title bar */}
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-bold text-center lg:text-2xl">Documents</p>
          <img
            src={backCircle}
            className="w-8 lg:w-12 hover:cursor-pointer"
            onClick={() => {
              props.setSubWindow("default");
            }}
          ></img>
        </div>
        <div className="divider"></div>

        {documentCards.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-8 gap-y-6">
            {documentCards}
          </div>
        ) : (
          <p className="text-2xl font-bold text-center">No Documents</p>
        )}
      </div>
    </div>
  );
}

export default DocumentsSW;
