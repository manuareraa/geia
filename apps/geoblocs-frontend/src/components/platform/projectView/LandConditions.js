import React, { useState, useEffect } from "react";

function LandConditions(props) {
  const [landConditions, setLandConditions] = useState([]);

  const renderLandConditions = () => {
    let tempArray = [];
    setLandConditions(tempArray);
    props.landConditions.forEach((landCondition, index) => {
      let element = (
        <div className="flex flex-col space-y-1" key={index}>
          <p>{landCondition.label}</p>
          <progress
            className="bg-white w-[550px] progress text-gGreen"
            value={parseInt(landCondition.value)}
            max="100"
          ></progress>
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
    <div className="items-center justify-center w-full pb-20 px-80">
      <div className="items-center justify-center p-8 rounded-xl bg-glGreen ">
        <div className="flex flex-col space-y-0">
          <p className="text-3xl font-semibold">Baseline Land Conditions</p>
          {/* <p className="text-3xl font-semibold">Degraded Rain Forest</p> */}
        </div>

        {landConditions.length > 0 ? (
          <div className="grid grid-cols-2 py-6 gap-y-6">
            {landConditions}
          </div>
        ) : (
          <div className="flex flex-col space-y-1">
            <p>No Land Conditions</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandConditions;
