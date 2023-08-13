import React, { useState, useEffect } from "react";

import editIcon from "../../../assets/svg/edit.svg";
import fileUpload from "../../../assets/svg/file-upload.svg";
import sampleOne from "../../../assets/test/sample-one.png";

function ProjectGallery(props) {
  const [projectId, setProjectId] = useState(null);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    setProjectId(props.projectId);
    // setGallery(props.gallery);
  }, [props]);

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Gallery ({gallery.length})</p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
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
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col w-full pb-6 space-y-4">
        <div className="grid items-center justify-center grid-col-5 gap-x-4">
          <div className="flex flex-col items-center justify-center p-3 space-y-2 rounded-xl bg-glGreen w-fit">
            <img src={sampleOne} alt="" className="rounded-lg"></img>
            <button className="text-white capitalize border-0 btn btn-sm bg-red hover:bg-red">
              Delete
            </button>
          </div>
        </div>

        {/* use a mapping function to create for every element in the story body array, render image or text input accordingly */}
        {/* {storyBody.map((block, index) => {
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
        })} */}
      </div>
    </div>
  );
}

export default ProjectGallery;
