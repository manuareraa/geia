import React, { useState, useEffect } from "react";
import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectSponsors(props) {
  const [projectId, setProjectId] = useState(null);
  const [sponsors, setSponsors] = useState({});

  useEffect(() => {
    setProjectId(props.projectId);
  }, [props]);

  const updateSponsor = (id, param, e) => {
    setSponsors((prevSponsors) => ({
      ...prevSponsors,
      [id]: {
        ...prevSponsors[id],
        [param]: e.target.value,
      },
    }));
  };

  const addNewSponsor = () => {
    let nextId =
      Object.keys(sponsors).length === 0
        ? 1
        : Math.max(...Object.keys(sponsors)) + 1;
    setSponsors((prevSponsors) => ({
      ...prevSponsors,
      [nextId]: {
        id: nextId,
        label: "",
        url: "",
      },
    }));
  };

  const removeSponsor = (id) => {
    setSponsors((prevSponsors) => {
      const updatedSponsors = { ...prevSponsors };
      delete updatedSponsors[id];
      return updatedSponsors;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
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
        {Object.values(sponsors).length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Sponsors</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {Object.values(sponsors).map((sponsorElement) => {
              return (
                <div
                  key={sponsorElement.id}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* link label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Sponsor Label</p>
                      <input
                        type="text"
                        placeholder="Sponsor Label"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={sponsorElement.label}
                        onChange={(e) => updateLink(sponsorElement.id, "label", e)}
                      />
                    </div>
                  </div>

                  {/* link url */}
                  <div className="flex flex-row items-end space-x-2">
                    <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
                      Upload Image
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
                    onClick={() => removeSponsor(sponsorElement.id)}
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

export default ProjectSponsors;
