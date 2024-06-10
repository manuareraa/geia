import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";

function ProjectLinks(props) {
  const { updateProjectLinks } = useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setLinks(props.projectLinks || []);
    console.log("ProjectLinks props", props);
  }, [props]);

  const updateLink = (index, param, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [param]: value,
    };
    setLinks(updatedLinks);
  };

  const addNewLink = () => {
    setLinks([...links, { label: "", url: "" }]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Links</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewLink}
          >
            Add New Link
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {links.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Links</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {links.map((linkElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* link label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Link Label</p>
                      <input
                        type="text"
                        placeholder="Link Label"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={linkElement.label}
                        onChange={(e) =>
                          updateLink(index, "label", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* link url */}
                  <div className="flex flex-row items-end space-x-2">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Link URL</p>
                      <input
                        type="text"
                        placeholder="Link URL"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={linkElement.url}
                        onChange={(e) =>
                          updateLink(index, "url", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={() => removeLink(index)}
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
            console.log(links);
            const updateResult = await updateProjectLinks(projectId, links);
            if (updateResult === true) {
              toast.success("Project Links updated successfully.");
            } else {
              toast.error("Failed to update links. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectLinks;
