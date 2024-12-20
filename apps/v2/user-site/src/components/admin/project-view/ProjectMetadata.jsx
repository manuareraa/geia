import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { toast } from "react-hot-toast";

import editIcon from "../../../assets/svg/edit.svg";
import sampleOne from "../../../assets/test/sample-one.png";

function ProjectMetadata(props) {
  const { updateProjectMetadata, uploadFilesToS3 } = useContext(AppContext);
  const [projectId, setProjectId] = useState(null);
  const [projectMetadata, setProjectMetadata] = useState({});

  useEffect(() => {
    console.log("ProjectMetadata props", props);
    setProjectId(props.projectId);
    setProjectMetadata(props.projectMetadata);
  }, [props]);

  return (
    <div className="flex flex-col w-full space-y-4 overflow-auto">
      {/* title container */}
      <div className="flex flex-row items-center justify-between w-full">
        {/* title  */}
        <p className="text-4xl font-bold text-center">Project Metadata</p>
      </div>
      <div className="divider"></div>
      {/* body */}
      <div className="flex flex-col items-center justify-center w-full pt-8 pb-6 space-y-4">
        <div className="grid items-center justify-center grid-cols-1 gap-x-20 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Project Name */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Name</p>
              <input
                type="text"
                placeholder="Project Name"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.projectName}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      projectName: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* start date */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Start Date</p>
              <input
                type="text"
                placeholder="Start Date"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.startedFrom}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      startedFrom: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* project size */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Size</p>
              <input
                type="text"
                placeholder="Project Size"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.size}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      size: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* location */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Location</p>
              <input
                type="text"
                placeholder="Location"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.location}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      location: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* gps Coordinates */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">GPS Coordinates</p>
              <input
                type="text"
                placeholder="GPS Coordinates"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.gps}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      gps: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* ownership */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Ownership</p>
              <input
                type="text"
                placeholder="Ownership"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.ownership}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      ownership: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* project status */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Status (0-100)</p>
              <input
                type="text"
                placeholder="Project Status"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.projectStatus}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      projectStatus: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* address */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Location Address</p>
              <textarea
                type="text"
                placeholder="Location Address"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.locationAddress}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      locationAddress: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* intervention type */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Intervention Type</p>
              <input
                type="text"
                placeholder="Intervention Type"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={projectMetadata.interventionType || ""}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      interventionType: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* description */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Description</p>
              <textarea
                type="text"
                placeholder="Project Description"
                rows={10}
                cols={40}
                className="p-2 py-2 border-b-2 h-fit w-fit border-black/50 focus:outline-none"
                value={projectMetadata.description || ""}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      description: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* opensea link */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Opensea Link</p>
              <input
                type="text"
                placeholder="Opensea Link"
                className="p-2 py-2 border-b-2 h-fit w-fit border-black/50 focus:outline-none"
                value={projectMetadata.opensea || ""}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      opensea: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* token Id */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Token ID</p>
              <input
                type="number"
                placeholder="Token ID"
                className="p-2 py-2 border-b-2 h-fit w-fit border-black/50 focus:outline-none"
                value={projectMetadata.tokenId || ""}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      tokenId: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* redeem quota */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Redeem Quota</p>
              <input
                type="text"
                placeholder="Redeem Quota"
                className="p-2 py-2 border-b-2 h-fit w-fit border-black/50 focus:outline-none"
                value={projectMetadata.redeemQuota || ""}
                onChange={(e) => {
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      redeemQuota: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>

          {/* buy price */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Buy Price</p>
              <input
                type="text"
                placeholder="Buy Price"
                className="p-2 py-2 border-b-2 h-fit w-fit border-black/50 focus:outline-none"
                value={projectMetadata.buyPrice || ""}
                onChange={(e) => {
                  console.log(e.target.value);
                  setProjectMetadata((prevState) => {
                    return {
                      ...prevState,
                      buyPrice: e.target.value,
                    };
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* baseline image */}
      <div className="flex flex-row space-x-8">
        {/* cover image container */}
        <div className="flex flex-col space-y-4">
          {/* upload cover image */}
          <div className="flex flex-row col-span-3 space-x-4">
            <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
              {props.projectMetadata.coverImage?.length > 0
                ? "Replace Cover Image"
                : "Upload Cover Image"}
              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  // Handle the file upload here if needed
                  const selectedFiles = event.target.files;
                  // console.log(selectedFiles);
                  uploadFilesToS3(selectedFiles, projectId, "metadata")
                    .then((fileUrls) => {
                      // console.log(
                      //   "fileupload finished, updating gallery",
                      //   fileUrls
                      // );
                      setProjectMetadata((prevState) => {
                        return {
                          ...prevState,
                          coverImage: fileUrls,
                        };
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.error("Failed to upload image. Try again later.");
                    });
                }}
              />
            </label>
          </div>

          {/* display cover image */}
          {projectMetadata.coverImage?.length > 0 ? (
            <img
              src={projectMetadata.coverImage[0]}
              alt=""
              className="h-[200px] w-[350px] rounded-md"
            ></img>
          ) : (
            <p className="text-lg">No Cover Image Uploaded</p>
          )}
        </div>

        {/* baseline image container */}
        <div className="flex flex-col space-y-4">
          {/* upload baseline image */}
          <div className="flex flex-row col-span-3 space-x-4">
            <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
              {props.projectMetadata.baselineImage?.length > 0
                ? "Replace Baseline Image"
                : "Upload Baseline Image"}
              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  // Handle the file upload here if needed
                  const selectedFiles = event.target.files;
                  // console.log(selectedFiles);
                  uploadFilesToS3(selectedFiles, projectId, "metadata")
                    .then((fileUrls) => {
                      // console.log(
                      //   "fileupload finished, updating gallery",
                      //   fileUrls
                      // );
                      setProjectMetadata((prevState) => {
                        return {
                          ...prevState,
                          baselineImage: fileUrls,
                        };
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.error("Failed to upload image. Try again later.");
                    });
                }}
              />
            </label>
          </div>

          {/* display baseline image */}
          {/* display cover image */}
          {projectMetadata.baselineImage?.length > 0 ? (
            <img
              src={projectMetadata.baselineImage[0]}
              alt=""
              className="h-[200px] w-[350px] rounded-md"
            ></img>
          ) : (
            <p className="text-lg">No Baseline Image Uploaded</p>
          )}
        </div>
      </div>

      {/* nft image */}
      <div className="flex flex-row space-x-8">
        {/* nft image container */}
        <div className="flex flex-col space-y-4">
          {/* upload cover image */}
          <div className="flex flex-row col-span-3 space-x-4">
            <label className="p-2 px-4 text-lg text-white capitalize border-0 rounded-lg cursor-pointer btn bg-gGreen hover:bg-gGreen">
              {props.projectMetadata.nftImage?.length > 0
                ? "Replace NFT Image"
                : "Upload NFT Image"}
              <input
                type="file"
                className="hidden"
                onChange={(event) => {
                  // Handle the file upload here if needed
                  const selectedFiles = event.target.files;
                  // console.log(selectedFiles);
                  uploadFilesToS3(selectedFiles, projectId, "metadata")
                    .then((fileUrls) => {
                      // console.log(
                      //   "fileupload finished, updating gallery",
                      //   fileUrls
                      // );
                      setProjectMetadata((prevState) => {
                        return {
                          ...prevState,
                          nftImage: fileUrls,
                        };
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                      toast.error("Failed to upload image. Try again later.");
                    });
                }}
              />
            </label>
          </div>

          {/* display NFT image */}
          {projectMetadata.nftImage?.length > 0 ? (
            <img
              src={projectMetadata.nftImage[0]}
              alt=""
              className="h-[200px] w-[350px] rounded-md"
            ></img>
          ) : (
            <p className="text-lg">No NFT Image Uploaded</p>
          )}
        </div>
      </div>

      {/* save button */}
      <div className="flex flex-col w-full pt-10">
        <button
          className="self-center text-lg text-white capitalize border-2 btn w-fit border-gGreen bg-gGreen"
          onClick={async () => {
            console.log(projectMetadata);
            const updateResult = await updateProjectMetadata(
              projectId,
              projectMetadata,
            );
            if (updateResult === true) {
              toast.success("Metadata updated successfully.");
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

export default ProjectMetadata;
