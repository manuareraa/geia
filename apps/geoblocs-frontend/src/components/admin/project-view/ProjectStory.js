import React, { useState, useEffect } from "react";

import editIcon from "../../../assets/svg/edit.svg";
import fileUpload from "../../../assets/svg/file-upload.svg";

function ProjectStory(props) {
  const [projectId, setProjectId] = useState(null);
  const [storyHeading, setStoryHeading] = useState("");
  const [storyBody, setStoryBody] = useState([
    {
      type: "text",
      content: "This is a sample text block",
    }
  ]);

  useEffect(() => {
    setProjectId(props.projectId);
    // setStoryHeading(props.storyHeading);
    // setStoryBody(props.storyBody);
  }, [props]);

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Story</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-gGreen"
            onClick={() => {
              let newStoryBody = [...storyBody];
              newStoryBody.push({
                type: "text",
                content: "",
              });
              setStoryBody(newStoryBody);
            }}
          >
            Add Text Block
          </button>
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-gGreen"
            onClick={() => {
              let newStoryBody = [...storyBody];
              newStoryBody.push({
                type: "image",
                content: "",
              });
              setStoryBody(newStoryBody);
            }}
          >
            Add Image Block
          </button>
          <button
            className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg bg-red"
            onClick={() => {
              let newStoryBody = [...storyBody];
              newStoryBody.pop();
              setStoryBody(newStoryBody);
            }}
          >
            Remove last Block
          </button>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col w-full space-y-4">
        {/* heading */}
        <div className="flex flex-row items-start space-x-4">
          <img src={editIcon} alt="" className="w-8 h-8"></img>
          <textarea
            className="w-full text-5xl font-black focus:outline-none"
            placeholder="Heading"
          ></textarea>
        </div>

        {/* use a mapping function to create for every element in the story body array, render image or text input accordingly */}
        {storyBody.map((block, index) => {
          if (block.type === "text") {
            let ele = (
              <div className="flex flex-row items-start space-x-4">
                <img src={editIcon} alt="" className="w-8 h-8"></img>
                <textarea
                  className="w-full text-lg focus:outline-none"
                  placeholder="Add some text"
                ></textarea>
              </div>
            );
            return ele;
          } else if (block.type === "image") {
            let ele = (
              <div className="flex flex-row items-center pb-6 space-x-4">
                <img src={fileUpload} alt="" className="w-8 h-8"></img>
                <input
                  type="file"
                  className="w-full max-w-xs file-input file-input-sm"
                />
              </div>
            );
            return ele;
          }
        })}
      </div>
    </div>
  );
}

export default ProjectStory;
