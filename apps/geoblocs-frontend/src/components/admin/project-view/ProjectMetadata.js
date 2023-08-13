import React, { useState, useEffect } from "react";

import editIcon from "../../../assets/svg/edit.svg";
import sampleOne from "../../../assets/test/sample-one.png";

function ProjectMetadata(props) {
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    setProjectId(props.projectId);
  }, [props]);

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Metadata</p>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col items-center justify-center w-full pb-6 space-y-4">
        <div className="grid items-center justify-center grid-cols-4 gap-x-28 gap-y-8">
          {/* Project Name */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Name</p>
              <input
                type="text"
                placeholder="Project Name"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>

          {/* start date */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Start Date</p>
              <input
                type="text"
                placeholder="Start Date"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>

          {/* project size */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Size</p>
              <input
                type="text"
                placeholder="Project Size"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>

          {/* location */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Location</p>
              <input
                type="text"
                placeholder="Location"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>

          {/* gps Coordinates */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">GPS Coordinates</p>
              <input
                type="text"
                placeholder="GPS Coordinates"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>

          {/* ownership */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Ownership</p>
              <input
                type="text"
                placeholder="Ownership"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>

          {/* address */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Location Address</p>
              <textarea
                type="text"
                placeholder="Location Address"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectMetadata;
