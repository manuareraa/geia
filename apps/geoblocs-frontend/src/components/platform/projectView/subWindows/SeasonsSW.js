import React, { useEffect, useState } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";
import sponsorOne from "../../../../assets/test/sponsor-one.png";

function SeasonsSW(props) {
  const [seasonCards, setSeasonCards] = useState([]);

  const openPdfInNewTab = async (pdfUrl) => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  const renderSeasonCards = () => {
    let tempArray = [];
    setSeasonCards([]);
    props.seasonData.forEach((item, index) => {
      let card = (
        <tr className="hover" key={index}>
          <th>{item.species}</th>
          <td>{item.season}</td>
          <td>
            <button
              className="text-white capitalize btn btn-sm bg-gGreen hover:bg-gGreen/80"
              onClick={() => {
                openPdfInNewTab(item.url);
              }}
            >
              View
            </button>
          </td>
        </tr>
      );
      tempArray.push(card);
      setSeasonCards(tempArray);
    });
  };

  useEffect(() => {
    if (props.seasonData.length > 0) {
      console.log(props.seasonData);
      renderSeasonCards();
    }
  }, [props.seasonData]);

  return (
    <>
      <div className="flex flex-col px-6 pb-16 lg:px-60">
        <div className="flex flex-col p-8 rounded-xl bg-glGreen">
          {/* title bar */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold text-center lg:text-2xl">Planting Seasons</p>
            <img
              src={backCircle}
              className="w-8 lg:w-12 hover:cursor-pointer"
              onClick={() => {
                props.setSubWindow("default");
              }}
            ></img>
          </div>
          <div className="divider"></div>
          {seasonCards.length > 0 ? (
            <div className="w-full overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Species</th>
                    <th>Season</th>
                    <th>Document</th>
                  </tr>
                </thead>
                <tbody>{seasonCards}</tbody>
              </table>
            </div>
          ) : (
            <p className="text-center">Seasons data available</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SeasonsSW;
