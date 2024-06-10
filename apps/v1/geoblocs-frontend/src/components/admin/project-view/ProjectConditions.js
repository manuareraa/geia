import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";
import editIcon from "../../../assets/svg/edit.svg";

function ProjectConditions(props) {
  const { updateProjectConditions } = useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setConditions(props.projectConditions || []);
    console.log("ProjectConditions props", props);
  }, [props]);

  const updateCondition = (index, param, value) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = {
      ...updatedConditions[index],
      [param]: value,
    };
    setConditions(updatedConditions);
  };

  const addNewCondition = () => {
    setConditions([...conditions, { label: "", value: "" }]);
  };

  const removeCondition = (index) => {
    const updatedConditions = conditions.filter((_, i) => i !== index);
    setConditions(updatedConditions);
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title */}
        <p className="text-4xl font-bold text-center">
          Project Land Conditions
        </p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewCondition}
          >
            Add New Condition
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {conditions.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Data</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {conditions.map((conditionElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* link label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Condition</p>
                      <input
                        type="text"
                        placeholder="Condition"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={conditionElement.label}
                        onChange={(e) =>
                          updateCondition(index, "label", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* value */}
                  <div className="flex flex-row items-end space-x-2">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Value</p>
                      <input
                        type="text"
                        placeholder="Value"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={conditionElement.value}
                        onChange={(e) =>
                          updateCondition(index, "value", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={() => removeCondition(index)}
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
            console.log(conditions);
            const updateResult = await updateProjectConditions(
              projectId,
              conditions
            );
            if (updateResult === true) {
              toast.success("Project Conditions updated successfully.");
            } else {
              toast.error("Failed to update conditions. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectConditions;
