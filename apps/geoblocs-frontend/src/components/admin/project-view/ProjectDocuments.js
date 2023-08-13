import React, { useState, useEffect } from "react";
import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectDocuments(props) {
  const [projectId, setProjectId] = useState(null);
  const [documents, setDocuments] = useState({});

  useEffect(() => {
    setProjectId(props.projectId);
  }, [props]);

  const updateLink = (id, param, e) => {
    setDocuments((prevDocuments) => ({
      ...prevDocuments,
      [id]: {
        ...prevDocuments[id],
        [param]: e.target.value,
      },
    }));
  };

  const addNewDocument = () => {
    let nextId =
      Object.keys(documents).length === 0
        ? 1
        : Math.max(...Object.keys(documents)) + 1;
    setDocuments((prevDocuments) => ({
      ...prevDocuments,
      [nextId]: {
        id: nextId,
        label: "",
        url: "",
      },
    }));
  };

  const removeLink = (id) => {
    setDocuments((prevDocuments) => {
      const updatedDocuments = { ...prevDocuments };
      delete updatedDocuments[id];
      return updatedDocuments;
    });
  };

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Documents</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen"
            onClick={addNewDocument}
          >
            Add New Document
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col pb-6 space-y-4">
        {Object.values(documents).length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Documents</p>
        ) : (
          <div className="grid items-center grid-cols-1 gap-y-8 w-fit">
            {Object.values(documents).map((docElement) => {
              return (
                <div
                  key={docElement.id}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* link label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6"></img>
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Document Label</p>
                      <input
                        type="text"
                        placeholder="Link Label"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={docElement.label}
                        onChange={(e) => updateLink(docElement.id, "label", e)}
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
                    onClick={() => removeLink(docElement.id)}
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

export default ProjectDocuments;
