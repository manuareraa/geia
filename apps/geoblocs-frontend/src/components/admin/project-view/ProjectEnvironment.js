import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";

function ProjectEnvironment(props) {
  const { updateProjectEnvData } = useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [envDatas, setEnvDatas] = useState([]);

  useEffect(() => {
    console.log("ProjectEnvironment props", props);
    setProjectId(props.projectId);
    setEnvDatas(props.projectEnvDatas || []);
  }, [props]);

  const updateEnvData = (index, param, value) => {
    const updatedEnvDatas = [...envDatas];
    updatedEnvDatas[index] = {
      ...updatedEnvDatas[index],
      [param]: value,
    };
    setEnvDatas(updatedEnvDatas);
  };

  const addNewData = () => {
    setEnvDatas([...envDatas, { link: "", height: "", width: "" }]);
  };

  const removeEnvData = (index) => {
    const updatedEnvDatas = envDatas.filter((_, i) => i !== index);
    setEnvDatas(updatedEnvDatas);
  };

  useEffect(() => {
    console.log("envDatas", envDatas);
  }, [envDatas]);

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Environment</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewData}
          >
            Add New Widget
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {envDatas.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">
            No Environment Data
          </p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {envDatas.map((dataElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* link label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Widget Link</p>
                      <input
                        type="text"
                        placeholder="Widget Link"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={dataElement.link}
                        onChange={(e) =>
                          updateEnvData(index, "link", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* height */}
                  <div className="flex flex-row items-end space-x-2">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Widget Height</p>
                      <input
                        type="text"
                        placeholder="Height"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={dataElement.height}
                        onChange={(e) =>
                          updateEnvData(index, "height", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* width */}
                  <div className="flex flex-row items-end space-x-2">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Widget Width</p>
                      <input
                        type="text"
                        placeholder="Width"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={dataElement.width}
                        onChange={(e) =>
                          updateEnvData(index, "width", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={() => removeEnvData(index)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* save button */}
      <div className="flex flex-col w-full pt-10">
        <button
          className="self-center text-lg text-white capitalize border-2 w-fit btn bg-gGreen border-gGreen"
          onClick={async () => {
            console.log(envDatas);
            const updateResult = await updateProjectEnvData(
              projectId,
              envDatas
            );
            if (updateResult === true) {
              toast.success("Project Environment Data updated successfully.");
            } else {
              toast.error("Failed to update env data. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectEnvironment;
