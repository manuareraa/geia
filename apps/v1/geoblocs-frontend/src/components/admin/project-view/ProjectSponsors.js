import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectSponsors(props) {
  const { updateProjectSponsors, uploadFilesToS3, deleteFileFromS3 } =
    useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setSponsors(props.projectSponsors || []);
    console.log("ProjectSponsors props", props);
  }, [props]);

  const updateSponsor = (index, param, value) => {
    const updatedSponsors = [...sponsors];
    updatedSponsors[index] = {
      ...updatedSponsors[index],
      [param]: value,
    };
    setSponsors(updatedSponsors);
  };

  const addNewSponsor = () => {
    setSponsors([...sponsors, { label: "", link: "", image: "" }]);
  };

  const removeSponsor = (index) => {
    const updatedSponsors = sponsors.filter((_, i) => i !== index);
    setSponsors(updatedSponsors);
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title */}
        <p className="text-4xl font-bold text-center">Project Sponsors</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewSponsor}
          >
            Add New Sponsor
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {sponsors.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Sponsors</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {sponsors.map((sponsorElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* sponsor label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6" />
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Sponsor Label</p>
                      <input
                        type="text"
                        placeholder="Sponsor Label"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={sponsorElement.label}
                        onChange={(e) =>
                          updateSponsor(index, "label", e.target.value)
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
                        value={sponsorElement.link}
                        onChange={(e) =>
                          updateSponsor(index, "link", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <p className="text-center">
                    {sponsorElement.link !== ""
                      ? "File already uploaded. Re-upload to replace."
                      : null}
                  </p>

                  {/* image */}
                  <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
                    Upload Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={async (event) => {
                        const tempImageArray = [];
                        tempImageArray.push(event.target.files[0]);
                        const fileUrls = await uploadFilesToS3(
                          tempImageArray,
                          projectId,
                          "sponsors"
                        );
                        if (fileUrls.length > 0) {
                          toast.success("Image uploaded successfully.");
                          updateSponsor(index, "image", fileUrls[0]);
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
                      if (sponsorElement.image !== "") {
                        const deleteResult = await deleteFileFromS3(
                          sponsorElement.image
                        );
                        if (deleteResult === true) {
                          toast.success("Image deleted successfully.");
                          removeSponsor(index);
                        } else {
                          toast.error("Failed to delete image. Try again.");
                        }
                      } else {
                        removeSponsor(index);
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
            console.log(sponsors);
            const updateResult = await updateProjectSponsors(
              projectId,
              sponsors
            );
            if (updateResult === true) {
              toast.success("Project Sponsors updated successfully.");
            } else {
              toast.error("Failed to update sponsors. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectSponsors;
