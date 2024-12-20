import React, { useState, useEffect } from "react";

import lcImage from "../../../assets/img/landconditions.png";

function LandConditions(props) {
  const [landConditions, setLandConditions] = useState([]);

  const renderLandConditions = () => {
    let tempArray = [];
    setLandConditions(tempArray);
    props.landConditions.forEach((landCondition, index) => {
      let element = (
        <div
          className="flex w-full flex-row items-center space-x-6 border-2 border-[#737373] bg-white"
          key={index}
        >
          <div className="w-[30%] bg-[#B5BFA4] p-1 px-2">
            <p className="font-bold">{landCondition.label}</p>
          </div>
          {/* <progress
            className="progress h-4 w-[100%]  bg-[#B2935B] text-gGreen lg:w-full"
            value={parseInt(landCondition.value)}
            max="100"
          ></progress> */}
          <p className="w-full font-bold underline underline-offset-2">
            {landCondition.value}
          </p>
        </div>
      );
      tempArray.push(element);
      setLandConditions(tempArray);
    });
  };

  useEffect(() => {
    if (props.landConditions.length > 0) {
      renderLandConditions();
    }
  }, []);

  return (
    <div className="items-center justify-center w-full px-2 pb-20 lg:px-40">
      <div className="w-full items-center justify-center rounded-xl bg-[#B5BFA4] p-8">
        <div className="flex flex-row justify-between w-full">
          <div className="w-full">
            {/* heading */}
            <div className="flex flex-col w-full space-y-0">
              <p className="text-xl font-semibold underline underline-offset-2 lg:text-3xl">
                Baseline Land Conditions
              </p>
              {/* <p className="text-3xl font-semibold">Degraded Rain Forest</p> */}
            </div>

            {/* conditions */}
            {landConditions.length > 0 ? (
              <div className="flex flex-col items-center w-full lg:flex-row">
                <div className="flex flex-col w-full py-12 space-y-6 lg:py-20">
                  {landConditions}
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-1">
                <p>No Land Conditions</p>
              </div>
            )}
          </div>

          {/* baseline image */}
          <div className="flex flex-row items-center justify-between w-[90%] px-4">
            <img className="object-cover w-full h-full" src={props.coverImage || lcImage} alt="" />
          </div>
        </div>

        <div className="mt-10">
          <p>
            *For Baseline reports and other documents, please refer to the&nbsp;
            <span className="font-bold underline underline-offset-2">
              Documents
            </span>{" "}
            section above
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandConditions;
