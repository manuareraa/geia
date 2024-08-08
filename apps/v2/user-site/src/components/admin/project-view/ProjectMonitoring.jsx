import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectMonitoring(props) {
  const { updateProjectMonitors, uploadFilesToS3, deleteFileFromS3 } =
    useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [monitors, setMonitors] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setMonitors(props.projectMonitors || []);
    console.log("ProjectMonitors props", props);
  }, [props]);

  const updateMonitor = (index, param, value) => {
    const updatedMonitors = [...monitors];
    updatedMonitors[index] = {
      ...updatedMonitors[index],
      [param]: value,
    };
    setMonitors(updatedMonitors);
  };

  const addNewMonitor = () => {
    setMonitors([...monitors, { label: "", link: "", image: "" }]);
  };

  const removeMonitor = (index) => {
    const updatedMonitors = monitors.filter((_, i) => i !== index);
    setMonitors(updatedMonitors);
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title */}
        <p className="text-4xl font-bold text-center">Project Monitors</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewMonitor}
          >
            Add New Monitor
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {monitors.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Monitors</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {monitors.map((monitorElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* monitor label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6" />
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Monitor Label</p>
                      <input
                        type="text"
                        placeholder="Monitor Label"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={monitorElement.label}
                        onChange={(e) =>
                          updateMonitor(index, "label", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* link */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6" />
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Link</p>
                      <input
                        type="text"
                        placeholder="Link"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={monitorElement.link}
                        onChange={(e) =>
                          updateMonitor(index, "link", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* <p className="text-center">
                    {monitorElement.link !== ""
                      ? "File already uploaded. Re-upload to replace."
                      : null}
                  </p> */}

                  {/* image */}
                  <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
                    Upload/Replace Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (event) => {
                        const tempImageArray = [];
                        tempImageArray.push(event.target.files[0]);
                        const fileUrls = await uploadFilesToS3(
                          tempImageArray,
                          projectId,
                          "monitors"
                        );
                        if (fileUrls.length > 0) {
                          toast.success("Image uploaded successfully.");
                          updateMonitor(index, "image", fileUrls[0]);
                        } else {
                          toast.error("Failed to upload image. Try again.");
                        }
                      }}
                    />
                  </label>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={async () => {
                      if (monitorElement.image !== "") {
                        const deleteResult = await deleteFileFromS3(
                          monitorElement.image
                        );
                        if (deleteResult === true) {
                          toast.success("Image deleted successfully.");
                          removeMonitor(index);
                        } else {
                          toast.error("Failed to delete image. Try again.");
                        }
                      } else {
                        removeMonitor(index);
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
            console.log(monitors);
            const updateResult = await updateProjectMonitors(
              projectId,
              monitors
            );
            if (updateResult === true) {
              toast.success("Project Monitors updated successfully.");
            } else {
              toast.error("Failed to update monitors. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectMonitoring;
