import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";

import editIcon from "../../../assets/svg/edit.svg";
import fileUpload from "../../../assets/svg/file-upload.svg";
import sampleOne from "../../../assets/test/sample-one.png";
import { toast } from "react-hot-toast";

function ProjectGallery(props) {
  const { deleteFileFromS3, uploadFilesToS3, updateProjectGallery } =
    useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [imageCards, setImageCards] = useState([]);

  const renderImages = () => {
    let tempImageCards = [];
    setImageCards([]);
    gallery.forEach((image, index) => {
      let imageCard = (
        <div
          className="flex flex-col items-center justify-center p-3 space-y-2 rounded-xl bg-glGreen w-fit"
          key={index}
        >
          <img
            src={image}
            alt=""
            className="object-cover h-40 rounded-lg w-60"
          ></img>
          <button
            className="text-white capitalize border-0 btn btn-sm bg-red hover:bg-red"
            onClick={async () => {
              // console.log("deleting image", image);
              const deletResponse = await deleteFileFromS3(image);
              // console.log("deletResponse", deletResponse);
              if (deletResponse === true) {
                // console.log("deleting image from gallery", image);
                let tempGallery = gallery.filter((img) => img !== image);
                // console.log("tempGallery", tempGallery);
                setGallery(tempGallery);
                updateProjectGallery(projectId, tempGallery);
              } else {
                toast.error("Failed to delete image. Try again later.");
              }
            }}
          >
            Delete
          </button>
        </div>
      );
      tempImageCards.push(imageCard);
      setImageCards(tempImageCards);
    });
  };

  useEffect(() => {
    setProjectId(props.projectId);
    setGallery(props.projectGallery);
  }, [props]);

  useEffect(() => {
    if (props.projectGallery.length > 0) {
      renderImages();
    }
    // console.log("gallery", gallery);
  }, [gallery]);

  useEffect(() => {
    // console.log("imageCards", imageCards);
  }, [imageCards]);

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-col items-center justify-between w-full md:flex-row lg:flex-row">
        {/* title  */}
        <p className="text-lg font-bold text-center md:text-xl lg:text-4xl">
          Project Gallery ({gallery.length})
        </p>

        {/* title button containers */}
        <div className="flex flex-row space-x-4">
          <label className="p-1 px-2 text-sm text-white capitalize border-0 rounded-lg cursor-pointer lg:p-2 lg:px-4 md:px-2 lg:text-lg md:text-md btn bg-gGreen hover:bg-gGreen">
            Upload Image
            <input
              type="file"
              className="hidden"
              multiple
              onChange={(event) => {
                // Handle the file upload here if needed
                const selectedFiles = event.target.files;
                // console.log(selectedFiles);
                uploadFilesToS3(selectedFiles, projectId, "gallery")
                  .then((fileUrls) => {
                    // console.log(
                    //   "fileupload finished, updating gallery",
                    //   fileUrls
                    // );
                    let tempUrls = fileUrls;
                    tempUrls = [...gallery, ...tempUrls];
                    setGallery(tempUrls);
                    updateProjectGallery(projectId, tempUrls);
                  })
                  .catch((error) => {
                    console.log(error);
                    toast.error("Failed to upload image. Try again later.");
                  });
              }}
            />
          </label>
        </div>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col w-full pb-6 space-y-4">
        {gallery.length > 0 ? (
          <div className="grid items-center justify-center w-full grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-x-4 gap-y-8">
            {imageCards}
          </div>
        ) : (
          <p>No Images</p>
        )}
      </div>
    </div>
  );
}

export default ProjectGallery;
