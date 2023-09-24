import React, { useEffect, useState } from "react";

import backCircle from "../../../../assets/svg/back-circle.svg";
import sponsorOne from "../../../../assets/test/sponsor-one.png";

function SponsorsSW(props) {
  const [sponsorCards, setSponsorCards] = useState([]);

  const renderSponsorCards = () => {
    let tempArray = [];
    setSponsorCards([]);
    props.sponsorsData.forEach((sponsor, index) => {
      let card = (
        <div className="flex flex-col items-center justify-center px-0 py-4 space-y-4 bg-white rounded-xl">
          <img
            src={sponsor.image}
            className="w-48 mt-2 rounded-md object-fit hover:cursor-pointer"
          />
          <p
            className="underline underline-offset-2 hover:cursor-pointer"
            onClick={() => {
              window.open(sponsor.link, "_blank");
            }}
          >
            {sponsor.label}
          </p>
        </div>
      );
      tempArray.push(card);
      setSponsorCards(tempArray);
    });
  };

  useEffect(() => {
    console.log(props.sponsorsData);
    renderSponsorCards();
  }, [props.sponsorsData]);

  return (
    <>
      <div className="flex flex-col px-6 pb-16 lg:px-60">
        <div className="flex flex-col p-8 rounded-xl bg-glGreen">
          {/* title bar */}
          <div className="flex flex-row items-center justify-between">
            <p className="text-lg font-bold text-center lg:text-2xl">Sponsors</p>
            <img
              src={backCircle}
              className="w-8 lg:w-12 hover:cursor-pointer"
              onClick={() => {
                props.setSubWindow("default");
              }}
            ></img>
          </div>
          <div className="divider"></div>
          {sponsorCards.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-6 lg:gap-y-0">{sponsorCards}</div>
          ) : (
            <p className="text-2xl font-bold text-center">No Sponsors</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SponsorsSW;
