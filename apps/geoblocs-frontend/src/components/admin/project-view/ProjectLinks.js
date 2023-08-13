import React, { useState, useEffect } from "react";
import editIcon from "../../../assets/svg/edit.svg";

function ProjectLinks(props) {
  const [projectId, setProjectId] = useState(null);
  const [links, setLinks] = useState({});

  useEffect(() => {
    setProjectId(props.projectId);
  }, [props]);

  const updateLink = (id, param, e) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      [id]: {
        ...prevLinks[id],
        [param]: e.target.value,
      },
    }));
  };

  const addNewLink = () => {
    let nextId =
      Object.keys(links).length === 0 ? 1 : Math.max(...Object.keys(links)) + 1;
    setLinks((prevLinks) => ({
      ...prevLinks,
      [nextId]: {
        id: nextId,
        label: "",
        url: "",
      },
    }));
  };

  const removeLink = (id) => {
    setLinks((prevLinks) => {
      const updatedLinks = { ...prevLinks };
      delete updatedLinks[id];
      return updatedLinks;
    });
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
        {Object.values(links).length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Links</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {Object.values(links).map((linkElement) => {
              return (
                <div key={linkElement.id} className="flex flex-row items-center space-x-12">
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
                        onChange={(e) => updateLink(linkElement.id, "label", e)}
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
                        onChange={(e) => updateLink(linkElement.id, "url", e)}
                      />
                    </div>
                  </div>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 w-fit btn bg-red focus:outline-none"
                    onClick={() => removeLink(linkElement.id)}
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

export default ProjectLinks;
