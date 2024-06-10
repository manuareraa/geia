import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";

import editIcon from "../../../assets/svg/edit.svg";
import fileUpload from "../../../assets/svg/file-upload.svg";
import { toast } from "react-hot-toast";

function ProjectStory(props) {
  const { uploadFilesToS3, deleteFileFromS3, updateProjectStory } =
    useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [storyBody, setStoryBody] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    setStoryBody(props.storyBody);
    console.log("props", props.storyBody);
  }, [props]);

  useEffect(() => {
    console.log(
      "storyBody UE",
      storyBody,
      storyBody.length,
      storyBody.length === 0
    );
  }, [storyBody]);

  const handleTextChange = (index, content) => {
    const updatedStoryBody = [...storyBody];
    updatedStoryBody[index] = { ...updatedStoryBody[index], content };
    setStoryBody(updatedStoryBody);
  };

  const handleImageChange = async (index, file) => {
    let imageArray = [];
    imageArray.push(file);
    const fileUrlArray = await uploadFilesToS3(imageArray, projectId, "story");
    if (fileUrlArray.length > 0) {
      const updatedStoryBody = [...storyBody];
      updatedStoryBody[index] = {
        ...updatedStoryBody[index],
        file: fileUrlArray[0],
      };
      setStoryBody(updatedStoryBody);
    } else {
      toast.error("Failed to upload image. Try again.");
    }
  };

  const addBlock = (type) => {
    setStoryBody([...storyBody, { type, content: "", file: null }]);
  };

  const removeLastBlock = async () => {
    if (storyBody.length > 0) {
      const updatedStoryBody = [...storyBody];
      const removedBlock = updatedStoryBody.pop();
      if (removedBlock.type === "image") {
        const deleteResult = await deleteFileFromS3(removedBlock.file);
        if (deleteResult === false) {
          toast.error("Failed to delete image. Try again.");
        } else {
          setStoryBody(updatedStoryBody);
        }
      } else {
        setStoryBody(updatedStoryBody);
      }
    }
  };

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row items-center justify-between w-full">
        <p className="text-4xl font-bold text-center">Project Story</p>
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-gGreen"
            onClick={() => addBlock("text")}
          >
            Add Text Block
          </button>
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-gGreen"
            onClick={() => addBlock("image")}
          >
            Add Image Block
          </button>
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-red"
            onClick={removeLastBlock}
          >
            Remove Last Block
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <div className="flex flex-col w-full space-y-4">
        <div className="flex flex-row items-start space-x-4">
          <img src={editIcon} alt="" className="w-8 h-8" />
          <textarea
            className="w-full text-5xl font-black focus:outline-none"
            placeholder="Heading"
            value={storyBody.length === 0 ? "" : storyBody[0]?.content}
            onChange={(e) => handleTextChange(0, e.target.value)}
          ></textarea>
        </div>

        {storyBody.map((block, index) => (
          <div key={index} className="flex flex-col space-y-4">
            {block.type === "text" && (
              <div className="flex flex-row items-start space-x-4">
                <img src={editIcon} alt="" className="w-8 h-8" />
                <textarea
                  className="w-full text-lg focus:outline-none"
                  placeholder="Add some text"
                  value={block.content}
                  onChange={(e) => handleTextChange(index, e.target.value)}
                ></textarea>
              </div>
            )}

            {block.type === "image" && (
              <div className="flex flex-row items-center pb-6 space-x-4">
                <img src={fileUpload} alt="" className="w-8 h-8" />
                {block.file !== null ? (
                  <p>File Uploaded. Re-upload if you want to replace.</p>
                ) : null}
                <input
                  type="file"
                  className="w-full max-w-xs file-input file-input-sm"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full pt-10">
        <button
          className="self-center text-lg text-white capitalize border-2 w-fit btn bg-gGreen border-gGreen"
          onClick={async () => {
            console.log(storyBody);
            const updateResult = await updateProjectStory(projectId, storyBody);
            if (updateResult === true) {
              toast.success("Story updated successfully.");
            } else {
              toast.error("Failed to update story. Try again.");
            }
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default ProjectStory;
