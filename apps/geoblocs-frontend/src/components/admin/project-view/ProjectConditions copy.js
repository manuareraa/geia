import React, { useState, useEffect } from "react";
import editIcon from "../../../assets/svg/edit.svg";

function ProjectConditions(props) {
  const [projectId, setProjectId] = useState(null);
  const [conditions, setConditions] = useState({});

  useEffect(() => {
    setProjectId(props.projectId);
  }, [props]);

  const updateCondition = (id, param, e) => {
    setConditions((prevConditions) => ({
      ...prevConditions,
      [id]: {
        ...prevConditions[id],
        [param]: e.target.value,
      },
    }));
  };

  const addNewCondition = () => {
    let nextId =
      Object.keys(conditions).length === 0
        ? 1
        : Math.max(...Object.keys(conditions)) + 1;
    setConditions((prevConditions) => ({
      ...prevConditions,
      [nextId]: {
        id: nextId,
        label: "",
        value: "",
      },
    }));
  };

  const removeCondition = (id) => {
    setConditions((prevConditions) => {
      const updateConditions = { ...prevConditions };
      delete updateConditions[id];
      return updateConditions;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
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
        {Object.values(conditions).length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Data</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {Object.values(conditions).map((conditionElement) => {
              return (
                <div
                  key={conditionElement.id}
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
                          updateCondition(conditionElement.id, "label", e)
                        }
                      />
                    </div>
                  </div>

                  {/* link url */}
                  <div className="flex flex-row items-end space-x-2">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Value</p>
                      <input
                        type="text"
                        placeholder="Value"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={conditionElement.url}
                        onChange={(e) =>
                          updateCondition(conditionElement.id, "url", e)
                        }
                      />
                    </div>
                  </div>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={() => removeCondition(conditionElement.id)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectConditions;
