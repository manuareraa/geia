import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";
import uploadIcon from "../../../assets/svg/file-upload.svg";

function ProjectDocuments(props) {
  const { updateProjectDocuments, uploadFilesToS3, deleteFileFromS3 } =
    useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setDocuments(props.projectDocuments || []);
    console.log("ProjectDocuments props", props);
  }, [props]);

  const updateDocument = (index, param, value) => {
    const updatedDocuments = [...documents];
    updatedDocuments[index] = {
      ...updatedDocuments[index],
      [param]: value,
    };
    setDocuments(updatedDocuments);
  };

  const addNewDocument = () => {
    setDocuments([...documents, { label: "", url: "" }]);
  };

  const removeDocument = async (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);

    console.log("Removed documents", updatedDocuments)

    // save function
    const updateResult = await updateProjectDocuments(
      projectId,
      updatedDocuments,
    );
    if (updateResult === true) {
      toast.success(
        "Project Documents updated successfully.",
      );
    } else {
      toast.error(
        "Failed to update documents. Try again.",
      );
    }
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
        {documents.length === 0 ? (
          <p className="text-2xl font-bold text-black/50">No Documents</p>
        ) : (
          <div className="grid items-center grid-cols-1 w-fit gap-y-8">
            {documents.map((docElement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center space-x-12"
                >
                  {/* document label */}
                  <div className="flex flex-row items-end space-x-1">
                    <img src={editIcon} alt="" className="w-6 h-6" />
                    <div className="flex flex-col space-y-">
                      <p className="text-xs font-light">Document Label</p>
                      <input
                        type="text"
                        placeholder="Document Label"
                        className="py-2 border-b-2 border-black/50 focus:outline-none"
                        value={docElement.label}
                        onChange={(e) =>
                          updateDocument(index, "label", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <p>
                    {docElement.url !== ""
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
                          "documents",
                          true,
                        );
                        if (fileUrls.length > 0) {
                          toast.success("File uploaded successfully.");
                          updateDocument(index, "url", fileUrls[0]);
                        } else {
                          toast.error("Failed to upload file. Try again.");
                        }
                      }}
                    />
                  </label>

                  {/* remove button */}
                  <button
                    className="text-white capitalize border-0 btn w-fit bg-red focus:outline-none"
                    onClick={async () => {
                      if (docElement.url !== "") {
                        const deleteResult = await deleteFileFromS3(
                          docElement.url,
                        );
                        if (deleteResult === true) {
                          toast.success("File deleted successfully.");
                          removeDocument(index);
                        } else {
                          toast.error("Failed to delete file. Try again.");
                        }
                      } else {
                        removeDocument(index);
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
          className="self-center text-lg text-white capitalize border-2 btn w-fit border-gGreen bg-gGreen"
          onClick={async () => {
            console.log(documents);
            const updateResult = await updateProjectDocuments(
              projectId,
              documents,
            );
            if (updateResult === true) {
              toast.success("Project Documents updated successfully.");
            } else {
              toast.error("Failed to update documents. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectDocuments;
