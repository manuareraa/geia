import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectSeasons(props) {
  const { updateProjectSeasons, uploadFilesToS3, deleteFileFromS3 } =
    useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setSeasons(props.projectSeasons || []);
    console.log("ProjectSeasons props", props);
  }, [props]);

  const updateSeason = (index, param, value) => {
    const updatedSeasons = [...seasons];
    updatedSeasons[index] = {
      ...updatedSeasons[index],
      [param]: value,
    };
    setSeasons(updatedSeasons);
  };

  const addNewSeason = () => {
    setSeasons([...seasons, { species: "", season: "", url: "" }]);
  };

  const removeSeason = (index) => {
    const updatedSeasons = seasons.filter((_, i) => i !== index);
    setSeasons(updatedSeasons);
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title */}
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
        {seasons.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Data</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {seasons.map((seasonElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* species */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6" />
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Species</p>
                      <input
                        type="text"
                        placeholder="Species"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={seasonElement.species}
                        onChange={(e) =>
                          updateSeason(index, "species", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* season */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6" />
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Season</p>
                      <input
                        type="text"
                        placeholder="Season"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={seasonElement.season}
                        onChange={(e) =>
                          updateSeason(index, "season", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <p className="text-center">
                    {seasonElement.url !== ""
                      ? "File already uploaded. Re-upload to replace."
                      : null}
                  </p>

                  {/* upload button */}
                  <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
                    Upload Document
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (event) => {
                        const tempImageArray = [];
                        tempImageArray.push(event.target.files[0]);
                        const fileUrls = await uploadFilesToS3(
                          tempImageArray,
                          projectId,
                          "seasons"
                        );
                        if (fileUrls.length > 0) {
                          toast.success("File uploaded successfully.");
                          updateSeason(index, "url", fileUrls[0]);
                        } else {
                          toast.error("Failed to upload file. Try again.");
                        }
                      }}
                    />
                  </label>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={async () => {
                      if (seasonElement.url !== "") {
                        const deleteResult = await deleteFileFromS3(
                          seasonElement.url
                        );
                        if (deleteResult === true) {
                          toast.success("File deleted successfully.");
                          removeSeason(index);
                        } else {
                          toast.error("Failed to delete file. Try again.");
                        }
                      } else {
                        removeSeason(index);
                      }
                    }}
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
            console.log(seasons);
            const updateResult = await updateProjectSeasons(projectId, seasons);
            if (updateResult === true) {
              toast.success("Planting Seasons updated successfully.");
            } else {
              toast.error("Failed to update planting seasons. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectSeasons;
