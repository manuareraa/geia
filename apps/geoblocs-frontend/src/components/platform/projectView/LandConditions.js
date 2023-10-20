import React, { useState, useEffect } from "react";

function LandConditions(props) {
  const [landConditions, setLandConditions] = useState([]);

  const renderLandConditions = () => {
    let tempArray = [];
    setLandConditions(tempArray);
    props.landConditions.forEach((landCondition, index) => {
      let element = (
        <div className="flex flex-row items-center space-x-6" key={index}>
          <p className="w-[15%]">{landCondition.label}</p>
          <progress
            className="progress h-4 w-[100%]  bg-[#B2935B] text-gGreen lg:w-full"
            value={parseInt(landCondition.value)}
            max="100"
          ></progress>
          <p className="w-[15%] font-bold underline underline-offset-2">
            {landCondition.value}%
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
    <div className="items-center justify-center w-full pb-20 lg:px-80">
      <div className="items-center justify-center rounded-xl bg-[#B5BFA4] p-8 ">
        <div className="flex flex-col space-y-0">
          <p className="text-xl font-semibold underline underline-offset-2 lg:text-3xl">
            Baseline Land Conditions
          </p>
          {/* <p className="text-3xl font-semibold">Degraded Rain Forest</p> */}
        </div>

        {landConditions.length > 0 ? (
          <div className="grid grid-cols-1 py-12 gap-y-6 lg:grid-cols-2 lg:gap-x-20">
            {landConditions}
          </div>
        ) : (
          <div className="flex flex-col space-y-1">
            <p>No Land Conditions</p>
          </div>
        )}

        <div>
          <p>
            *For Baseline reports and other documents, please refer to the&nbsp;
            <span className="font-bold underline underline-offset-2">Documents</span> section above
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandConditions;
