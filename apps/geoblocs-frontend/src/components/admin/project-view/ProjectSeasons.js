import React, { useState, useEffect } from "react";
import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectSeasons(props) {
  const [projectId, setProjectId] = useState(null);
  const [seasons, setSeasons] = useState({});

  useEffect(() => {
    setProjectId(props.projectId);
  }, [props]);

  const updateSeason = (id, param, e) => {
    setSeasons((prevSeasons) => ({
      ...prevSeasons,
      [id]: {
        ...prevSeasons[id],
        [param]: e.target.value,
      },
    }));
  };

  const addNewSeason = () => {
    let nextId =
      Object.keys(seasons).length === 0
        ? 1
        : Math.max(...Object.keys(seasons)) + 1;
    setSeasons((prevSeasons) => ({
      ...prevSeasons,
      [nextId]: {
        id: nextId,
        species: "",
        season: "",
        url: "",
      },
    }));
  };

  const removeSeason = (id) => {
    setSeasons((prevSeasons) => {
      const updatedSeasons = { ...prevSeasons };
      delete updatedSeasons[id];
      return updatedSeasons;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Planting Seasons</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewSeason}
          >
            Add New Season
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {Object.values(seasons).length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Data</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {Object.values(seasons).map((seasonElement) => {
              return (
                <div
                  key={seasonElement.id}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* link label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Species</p>
                      <input
                        type="text"
                        placeholder="Species"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={seasonElement.label}
                        onChange={(e) => updateSeason(seasonElement.id, "label", e)}
                      />
                    </div>
                  </div>

                  {/* season */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Season</p>
                      <input
                        type="text"
                        placeholder="Season"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={seasonElement.label}
                        onChange={(e) => updateSeason(seasonElement.id, "label", e)}
                      />
                    </div>
                  </div>

                  {/* link url */}
                  <div className="flex flex-row items-end space-x-2">
                    <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
                      Upload Document
                      <input
                        type="file"
                        className="hidden"
                        onChange={(event) => {
                          // Handle the file upload here if needed
                          const selectedFile = event.target.files[0];
                          console.log(selectedFile);
                        }}
                      />
                    </label>
                  </div>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={() => removeSeason(seasonElement.id)}
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

export default ProjectSeasons;
