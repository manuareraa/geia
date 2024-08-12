import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useProjectStore,
  getS3UploadUrl,
  deleteS3File,
  editNameStatus,
  editMetadata,
  editMetaImages,
  editTokenData,
  editArrays,
  deleteProject,
} from "../../state-management/AppState";
import { Input, Divider, Button } from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import PageOuterContainer from "../../components/reuse/PageOuterContainer";
import PageHeader from "../../components/reuse/PageHeader";
import EditSection from "../../components/reuse/EditSection";
import GalleryImage from "../../components/reuse/GalleryImage";
import toast from "react-hot-toast";
import MetaImage from "../../components/reuse/MetaImage";
import FileUploadButton from "../../components/reuse/FileUpload";

function ProjectView(props) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { fetchProjectById, projectDetails } = useProjectStore();
  const [project, setProject] = useState(null);
  const [editable, setEditable] = useState({
    projectDetails: false,
    metadata: false,
    tokenData: false,
    substackArticles: false,
    metaImages: false,
    imageGallery: false,
    sponsors: false,
    "mainData.links": false,
    "mainData.docs": false,
    "mainData.environment": false,
    "mainData.landCondition": false,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      const existingProject = projectDetails[projectId];
      if (existingProject) {
        console.log("Existing project found");
        setProject(existingProject);
      } else {
        console.log("Existing project not found");
        const response = await fetchProjectById(projectId);
        if (response.status === "success") {
          console.log("Project fetched successfully! PV", response.data);
          setProject(response.data.project);
        }
      }
    };

    loadProject();
  }, [projectId, fetchProjectById, projectDetails]);

  useEffect(() => {
    console.log("Project UE: ", project);
  }, [project]);

  const handleCancelButton = (editableKey) => {
    // console.log(
    //   "Cancel button clicked",
    //   editableKey,
    //   editable.substackArticles,
    //   editable
    // );
    const existingProject = projectDetails[projectId];
    setEditable((prevState) => {
      return {
        ...prevState,
        [editableKey]: false,
      };
    });
    if (existingProject) {
      setProject(existingProject);
    } else {
      toast.error("Project details not found. Please refresh the page");
    }
  };

  // const handleSaveButton = async (editableKey) => {
  //   console.log("Save button clicked", editableKey, project[editableKey]);
  //   let result = null;
  //   switch (editableKey) {
  //     case "projectDetails":
  //       result = await editNameStatus(
  //         project.projectId,
  //         project.projectName,
  //         project.projectStatus
  //       );
  //       break;
  //     case "metadata":
  //       result = await editMetadata(project.projectId, project.metadata);
  //       break;
  //     case "tokenData":
  //       result = await editTokenData(project.projectId, project.tokenData);
  //       break;
  //     case "metaImages":
  //       result = await editMetaImages(project.projectId, project.metaImages);
  //       break;
  //     default:
  //       result = await editArrays(
  //         project.projectId,
  //         editableKey,
  //         project[editableKey]
  //       );
  //       break;
  //   }

  //   if (result.status === "success") {
  //     toast.success("Project details updated successfully");
  //     setEditable((prevState) => {
  //       return {
  //         ...prevState,
  //         [editableKey]: false,
  //       };
  //     });
  //   } else {
  //     toast.error("Failed to update project details");
  //   }
  // };
  const handleSaveButton = async (editableKey) => {
    console.log("Save button clicked", editableKey);
    let result = null;

    let sectionData = editableKey
      .split(".")
      .reduce((acc, key) => acc[key], project);

    console.log("sectionData for edit:", sectionData);

    switch (editableKey) {
      case "projectDetails":
        result = await editNameStatus(
          project.projectId,
          project.projectName,
          project.projectStatus
        );
        break;
      case "metadata":
        result = await editMetadata(project.projectId, project.metadata);
        break;
      case "tokenData":
        result = await editTokenData(project.projectId, project.tokenData);
        break;
      case "metaImages":
        result = await editMetaImages(project.projectId, project.metaImages);
        break;
      default:
        result = await editArrays(project.projectId, editableKey, sectionData);
        break;
    }

    if (result.status === "success") {
      toast.success("Project details updated successfully");
      setEditable((prevState) => {
        return {
          ...prevState,
          [editableKey]: false,
        };
      });
    } else {
      toast.error("Failed to update project details");
    }
  };

  const handleMetadataChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      metadata: {
        ...prevProject.metadata,
        [name]: value,
      },
    }));
  };

  const handleProjectNameChange = (e) => {
    setProject((prevProject) => ({
      ...prevProject,
      projectName: e.target.value,
    }));
  };

  const handleStatusChange = (status) => {
    setProject((prevProject) => ({
      ...prevProject,
      projectStatus: status,
    }));
  };

  const handleTokenDataChange = (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      tokenData: {
        ...prevProject.tokenData,
        [name]: value,
      },
    }));
  };

  const handleDeleteImage = async (url, index) => {
    console.log("Delete image clicked", url, index);
    const result = await deleteS3File(url);
    console.log("Delete image result: ", result);
    if (result.status === "success") {
      let tempGallery = [...project.imageGallery];
      tempGallery = tempGallery.filter((_, i) => i !== index);
      setProject((prevProject) => ({
        ...prevProject,
        imageGallery: tempGallery,
      }));
      await editArrays(projectId, "imageGallery", tempGallery);
    }
  };

  const handleSubstackChange = (index) => (e) => {
    const { value } = e.target;
    setProject((prevProject) => {
      const newArticles = [...prevProject.substackArticles];
      newArticles[index] = value;
      return {
        ...prevProject,
        substackArticles: newArticles,
      };
    });
  };

  const handleSubstackAdd = () => {
    setProject((prevProject) => ({
      ...prevProject,
      substackArticles: [...prevProject.substackArticles, ""],
    }));
  };

  const handleSubstackDelete = (index) => {
    setProject((prevProject) => ({
      ...prevProject,
      substackArticles: prevProject.substackArticles.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const deleteMetaImage = async (url, key) => {
    console.log("Delete meta image clicked", url, key);
    const result = await deleteS3File(url);
    console.log("Delete meta image result: ", result);
    if (result.status === "success") {
      let tempMetaImages = { ...project.metaImages };
      tempMetaImages[key] = "";
      setProject((prevProject) => ({
        ...prevProject,
        metaImages: {
          ...prevProject.metaImages,
          [key]: "",
        },
      }));
      await editMetaImages(projectId, tempMetaImages);
    }
  };

  const calculateReservedTokens = () => {
    // iterate over all the objects in the sponsors array and sum the tokensSponsored value
    let reservedTokens = 0;
    if (project.sponsors && project.sponsors.length > 0) {
      project.sponsors.forEach((sponsor) => {
        reservedTokens += parseInt(sponsor.tokensSponsored);
      });
    }

    console.log("Reserved tokens: ", reservedTokens);

    return reservedTokens;
  };

  const handleFileUpload = async (fileType, section, file) => {
    console.log("File upload clicked", file, section);
    if (!file) {
      toast.error("No file selected for upload");
      return;
    }

    if (section === "imageGallery" || section === "metaImages") {
      if (!file.type.includes("image")) {
        toast.error("Only image files are allowed");
        return;
      }
    }

    // size check for all files. max size 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const result = await getS3UploadUrl(
      fileType,
      file.type,
      section,
      projectId
    );

    const fileUrl = result.data.data.fileUrl;
    console.log("File URL: ", fileUrl);
    const uploadUrl = result.data.data.uploadUrl;
    console.log("Upload URL: ", uploadUrl);

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully");
        if (section === "imageGallery") {
          let tempGallery = [...project.imageGallery];
          tempGallery.push(fileUrl);
          setProject((prevProject) => ({
            ...prevProject,
            imageGallery: tempGallery,
          }));

          console.log("Temp gallery: ", tempGallery);
          await editArrays(projectId, "imageGallery", tempGallery);
        } else if (section === "metaImages") {
          let tempMetaImages = { ...project.metaImages };
          tempMetaImages[fileType] = fileUrl;
          setProject((prevProject) => ({
            ...prevProject,
            metaImages: {
              ...prevProject.metaImages,
              [fileType]: fileUrl,
            },
          }));
          await editMetaImages(projectId, tempMetaImages);
        }
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("An error occurred during file upload");
    }
  };

  const handleSponsorChange = (index) => (e) => {
    const { name, value } = e.target;
    setProject((prevProject) => {
      const newSponsors = [...prevProject.sponsors];
      newSponsors[index] = { ...newSponsors[index], [name]: value };
      return {
        ...prevProject,
        sponsors: newSponsors,
      };
    });
  };

  const handleSponsorAdd = () => {
    setProject((prevProject) => ({
      ...prevProject,
      sponsors: [
        ...prevProject.sponsors,
        {
          sponsorId: uuidv4(),
          sponsorName: "",
          tokensSponsored: 0,
          tokensClaimed: 0,
          linkToSite: "",
          logoUrl: "",
        },
      ],
    }));
  };

  const handleSponsorDelete = (index) => {
    const newSponsors = project.sponsors.filter((_, i) => i !== index);
    setProject((prevProject) => ({
      ...prevProject,
      sponsors: newSponsors,
    }));
    editArrays(projectId, "sponsors", newSponsors);
  };

  const handleSponsorLogoUpload = async (index, file) => {
    if (!file) {
      toast.error("No file selected for upload");
      return;
    }

    if (!file.type.includes("image")) {
      toast.error("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const result = await getS3UploadUrl(
      "logo",
      file.type,
      "sponsors",
      projectId
    );
    const fileUrl = result.data.data.fileUrl;
    const uploadUrl = result.data.data.uploadUrl;

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully");
        setProject((prevProject) => {
          const newSponsors = [...prevProject.sponsors];
          newSponsors[index] = { ...newSponsors[index], logoUrl: fileUrl };
          editArrays(projectId, "sponsors", newSponsors);
          return {
            ...prevProject,
            sponsors: newSponsors,
          };
        });
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("An error occurred during file upload");
    }
  };

  const handleMainDataLinksChange = (index, field, value) => {
    setProject((prevProject) => {
      const newLinks = [...prevProject.mainData.links];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          links: newLinks,
        },
      };
    });
  };

  const handleAddMainDataLink = () => {
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        links: [...prevProject.mainData.links, { label: "", link: "" }],
      },
    }));
  };

  const handleDeleteMainDataLink = (index) => {
    setProject((prevProject) => {
      const newLinks = prevProject.mainData.links.filter((_, i) => i !== index);
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          links: newLinks,
        },
      };
    });
  };

  const handleMainDataDocsChange = (index, field, value) => {
    setProject((prevProject) => {
      const newDocs = [...prevProject.mainData.docs];
      newDocs[index] = { ...newDocs[index], [field]: value };
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          docs: newDocs,
        },
      };
    });
  };

  const handleAddMainDataDoc = () => {
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        docs: [...prevProject.mainData.docs, { label: "", fileUrl: "" }],
      },
    }));
  };

  const handleDeleteMainDataDoc = (index) => {
    const newDocs = project.mainData.docs.filter((_, i) => i !== index);
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        docs: newDocs,
      },
    }));
    editArrays(projectId, "mainData.docs", newDocs);
  };

  const handleMainDataDocFileUpload = async (index, file) => {
    if (!file) {
      toast.error("No file selected for upload");
      return;
    }

    if (!file.type.includes("pdf") && !file.type.includes("image")) {
      toast.error("Only PDF and image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const result = await getS3UploadUrl(
      "document",
      file.type,
      "mainData.docs",
      projectId
    );
    const fileUrl = result.data.data.fileUrl;
    const uploadUrl = result.data.data.uploadUrl;

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully");
        setProject((prevProject) => {
          const newDocs = [...prevProject.mainData.docs];
          newDocs[index] = { ...newDocs[index], fileUrl: fileUrl };
          editArrays(projectId, "mainData.docs", newDocs);
          return {
            ...prevProject,
            mainData: {
              ...prevProject.mainData,
              docs: newDocs,
            },
          };
        });
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("An error occurred during file upload");
    }
  };

  const handleMainDataEnvironmentChange = (index, field, value) => {
    setProject((prevProject) => {
      const newEnvironment = [...prevProject.mainData.environment];
      newEnvironment[index] = { ...newEnvironment[index], [field]: value };
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          environment: newEnvironment,
        },
      };
    });
  };

  const handleAddMainDataEnvironment = () => {
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        environment: [
          ...prevProject.mainData.environment,
          { widgetLink: "", widgetId: uuidv4(), height: 0, width: 0 },
        ],
      },
    }));
  };

  const handleDeleteMainDataEnvironment = (index) => {
    const newEnvironment = project.mainData.environment.filter(
      (_, i) => i !== index
    );
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        environment: newEnvironment,
      },
    }));
    editArrays(projectId, "mainData.environment", newEnvironment);
  };

  const handleMainDataLandConditionChange = (index, field, value) => {
    setProject((prevProject) => {
      const newLandCondition = [...prevProject.mainData.landCondition];
      newLandCondition[index] = { ...newLandCondition[index], [field]: value };
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          landCondition: newLandCondition,
        },
      };
    });
  };

  const handleAddMainDataLandCondition = () => {
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        landCondition: [
          ...prevProject.mainData.landCondition,
          { parameter: "", condition: "" },
        ],
      },
    }));
  };

  const handleDeleteMainDataLandCondition = (index) => {
    const newLandCondition = project.mainData.landCondition.filter(
      (_, i) => i !== index
    );
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        landCondition: newLandCondition,
      },
    }));
    editArrays(projectId, "mainData.landCondition", newLandCondition);
  };

  const handleMainDataSeasonsChange = (index, field, value) => {
    setProject((prevProject) => {
      const newSeasons = [...prevProject.mainData.seasons];
      newSeasons[index] = { ...newSeasons[index], [field]: value };
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          seasons: newSeasons,
        },
      };
    });
  };

  const handleAddMainDataSeasons = () => {
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        seasons: [
          ...prevProject.mainData.seasons,
          { species: "", month: "", docUrl: "" },
        ],
      },
    }));
  };

  const handleDeleteMainDataSeasons = (index) => {
    const newSeasons = project.mainData.seasons.filter((_, i) => i !== index);
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        seasons: newSeasons,
      },
    }));
    editArrays(projectId, "mainData.seasons", newSeasons);
  };

  const handleMainDataSeasonFileUpload = async (index, file) => {
    if (!file) {
      toast.error("No file selected for upload");
      return;
    }

    if (!file.type.includes("pdf") && !file.type.includes("image")) {
      toast.error("Only PDF and image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const result = await getS3UploadUrl(
      "document",
      file.type,
      "mainData.seasons",
      projectId
    );
    const fileUrl = result.data.data.fileUrl;
    const uploadUrl = result.data.data.uploadUrl;

    try {
      const response = await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully");
        setProject((prevProject) => {
          const newSeasons = [...prevProject.mainData.seasons];
          newSeasons[index] = { ...newSeasons[index], docUrl: fileUrl };
          editArrays(projectId, "mainData.seasons", newSeasons);
          return {
            ...prevProject,
            mainData: {
              ...prevProject.mainData,
              seasons: newSeasons,
            },
          };
        });
      } else {
        toast.error("Failed to upload file");
      }
    } catch (error) {
      console.error("File upload error:", error);
      toast.error("An error occurred during file upload");
    }
  };

  const handleMainDataMonitorsChange = (index, field, value) => {
    setProject((prevProject) => {
      const newMonitors = [...prevProject.mainData.monitors];
      newMonitors[index] = { ...newMonitors[index], [field]: value };
      return {
        ...prevProject,
        mainData: {
          ...prevProject.mainData,
          monitors: newMonitors,
        },
      };
    });
  };

  const handleAddMainDataMonitors = () => {
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        monitors: [
          ...prevProject.mainData.monitors,
          { label: "", link: "", imageUrl: "" },
        ],
      },
    }));
  };

  const handleDeleteMainDataMonitors = (index) => {
    const newMonitors = project.mainData.monitors.filter((_, i) => i !== index);
    setProject((prevProject) => ({
      ...prevProject,
      mainData: {
        ...prevProject.mainData,
        monitors: newMonitors,
      },
    }));
    editArrays(projectId, "mainData.monitors", newMonitors);
  };

  return (
    <PageOuterContainer>
      <PageHeader
        title="Project View"
        rightContainer={
          <Button
            size="md"
            className="font-bold text-white bg-danger"
            onClick={async () => {
              await deleteProject(projectId);
              window.location.replace("/dashboard/projects");
              // navigate("/dashboard/projects");
            }}
          >
            Delete Project
          </Button>
        }
      />
      {/* content */}
      <div className="mt-4"></div>
      {project ? (
        <div className="flex flex-col items-center w-full">
          {/* project details update */}
          <EditSection
            sectionTitle="Project Details"
            editable={editable}
            setEditable={setEditable}
            editableKey="projectDetails"
            hideButtonSection={false}
            handleCancelButton={() => handleCancelButton("projectDetails")}
            handleSaveButton={() => handleSaveButton("projectDetails")}
          >
            <div className="grid grid-cols-3 gap-x-8">
              <div className="">
                <p className="text-sm capitalize manrope-400">Project Name</p>
                <Input
                  name="projectName"
                  value={project.projectName}
                  onChange={handleProjectNameChange}
                  disabled={!editable.projectDetails}
                  className="text-lg font-bold"
                />
              </div>
              <div className="flex flex-col">
                <p className="text-sm capitalize manrope-400">Project Status</p>
                <Dropdown isDisabled={!editable.projectDetails}>
                  <DropdownTrigger>
                    <Button variant="bordered" className="capitalize">
                      {project.projectStatus}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Project Status"
                    // disabledKeys={["edit", "delete"]}
                    onAction={(key) => handleStatusChange(key)}
                  >
                    <DropdownItem key="active">Active</DropdownItem>
                    <DropdownItem key="inactive">Inactive</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </EditSection>

          {/* metadata update */}
          <EditSection
            sectionTitle="Metadata"
            editable={editable}
            setEditable={setEditable}
            editableKey="metadata"
            hideButtonSection={false}
            handleCancelButton={() => handleCancelButton("metadata")}
            handleSaveButton={() => handleSaveButton("metadata")}
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {Object.keys(project.metadata).map((key, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-sm capitalize manrope-400">{key}</p>
                  <Input
                    name={key}
                    value={project.metadata[key]}
                    onChange={handleMetadataChange}
                    disabled={!editable.metadata}
                    className="text-lg font-bold"
                  />
                </div>
              ))}
            </div>
          </EditSection>

          {/* token data update */}
          <EditSection
            sectionTitle="Token Data"
            editable={editable}
            setEditable={setEditable}
            editableKey="tokenData"
            hideButtonSection={false}
            handleCancelButton={() => handleCancelButton("tokenData")}
            handleSaveButton={() => handleSaveButton("tokenData")}
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {Object.keys(project.tokenData).map((key, index) => (
                <div key={index} className="flex flex-col">
                  <p className="text-sm capitalize manrope-400">{key}</p>
                  <Input
                    name={key}
                    value={
                      key === "reserved"
                        ? calculateReservedTokens()
                        : project.tokenData[key]
                    }
                    onChange={handleTokenDataChange}
                    disabled={
                      key === "reserved" || key === "claimed"
                        ? true
                        : !editable.tokenData
                    }
                    className="text-lg font-bold"
                  />
                </div>
              ))}
            </div>
          </EditSection>

          {/* image gallery update */}
          <EditSection
            sectionTitle="Image Gallery"
            editable={editable}
            setEditable={setEditable}
            editableKey="imageGallery"
            hideButtonSection={true}
            customButton={
              <div className="flex flex-row items-center gap-2">
                <FileUploadButton
                  fileUploadFunction={handleFileUpload}
                  fileType="gallery"
                  section="imageGallery"
                />
                {/* <input
                  type="file"
                  className="w-full max-w-xs file-input file-input-bordered file-input-sm"
                  onChange={(e) => handleFileChange(e)}
                  // accept="image/png, image/jpeg, application/pdf"
                  accept="image/png, image/jpeg"
                  multiple={false}
                />
                <Button
                  size="small"
                  onClick={() => handleFileUpload("gallery", "imageGallery")}
                  className="font-bold text-white bg-gGreen"
                >
                  Upload
                </Button> */}
              </div>
            }
            handleCancelButton={() => handleCancelButton("imageGallery")}
            handleSaveButton={() => handleSaveButton("imageGallery")}
          >
            {project.imageGallery.length > 0 ? (
              <div className="grid w-full grid-cols-6 gap-x-8 gap-y-4">
                {
                  // You can map through the images array and display the images here
                  project.imageGallery.map((image, index) => (
                    <GalleryImage
                      imgUrl={image}
                      key={index}
                      deleteImage={() => handleDeleteImage(image, index)}
                    />
                  ))
                }
              </div>
            ) : (
              <p className="text-black">No images found</p>
            )}
          </EditSection>

          {/* substack articles update */}
          <EditSection
            sectionTitle="Substack Articles"
            editable={editable}
            setEditable={setEditable}
            editableKey="substackArticles"
            hideButtonSection={true}
            handleCancelButton={() => handleCancelButton("substackArticles")}
            handleSaveButton={() => handleSaveButton("substackArticles")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable.substackArticles === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("substackArticles")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => {
                        return {
                          ...prevState,
                          substackArticles: true,
                        };
                      })
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={() => handleSubstackAdd()}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Article URL
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setEditable((prevState) => {
                      return {
                        ...prevState,
                        substackArticles: false,
                      };
                    });
                    // update the substack articles array
                    // setProject((prevProject) => ({
                    //   ...prevProject,
                    //   substackArticles: project.substackArticles.filter(
                    //     (article) => article !== ""
                    //   ),
                    // }));
                    handleSaveButton("substackArticles");
                  }}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.substackArticles.length > 0 ? (
                project.substackArticles.map((article, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Article {index + 1}
                    </p>
                    <Input
                      name={`article${index}`}
                      value={article}
                      onChange={handleSubstackChange(index)}
                      disabled={!editable.substackArticles}
                      className="text-lg font-bold"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSubstackDelete(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No articles found</p>
              )}
            </div>
          </EditSection>

          {/* meta images update */}
          <EditSection
            sectionTitle="MetaImages"
            editable={editable}
            setEditable={setEditable}
            editableKey="metaImages"
            hideButtonSection={true}
            customButton={null}
            // customButtonFunction={handleFileUpload}
            handleCancelButton={() => handleCancelButton("metaImages")}
            handleSaveButton={() => handleSaveButton("metaImages")}
          >
            <div className="grid w-full grid-cols-4 gap-x-8 gap-y-4">
              {Object.keys(project.metaImages).map((key, index) => (
                <div className="flex flex-col items-center justify-center gap-y-3">
                  <p className="capitalize">{key}</p>
                  <MetaImage
                    imgUrl={project.metaImages[key]}
                    key={index}
                    uploadButton={
                      <FileUploadButton
                        fileUploadFunction={handleFileUpload}
                        fileType={key}
                        section="metaImages"
                        variant="sm"
                      />
                    }
                    deleteButton={
                      <Button
                        size="sm"
                        className="font-bold text-white bg-danger"
                        onPress={() =>
                          deleteMetaImage(project.metaImages[key], key)
                        }
                      >
                        Delete
                      </Button>
                    }
                  />
                </div>
              ))}
            </div>
          </EditSection>

          {/* sponsors update */}
          <EditSection
            sectionTitle="Sponsors"
            editable={editable}
            setEditable={setEditable}
            editableKey="sponsors"
            hideButtonSection={true}
            handleCancelButton={() => handleCancelButton("sponsors")}
            handleSaveButton={() => handleSaveButton("sponsors")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable.sponsors === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("sponsors")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => {
                        return {
                          ...prevState,
                          sponsors: true,
                        };
                      })
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={() => handleSponsorAdd()}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Sponsor
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("sponsors")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.sponsors.length > 0 ? (
                project.sponsors.map((sponsor, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Sponsor {index + 1}
                    </p>
                    <Input
                      name="sponsorName"
                      value={sponsor.sponsorName}
                      onChange={handleSponsorChange(index)}
                      disabled={!editable.sponsors}
                      className="text-lg font-bold"
                      placeholder="Sponsor Name"
                    />
                    <Input
                      name="tokensSponsored"
                      value={sponsor.tokensSponsored}
                      onChange={handleSponsorChange(index)}
                      disabled={!editable.sponsors}
                      className="text-lg font-bold"
                      placeholder="Tokens Sponsored"
                    />
                    <Input
                      name="tokensClaimed"
                      value={sponsor.tokensClaimed || 0}
                      onChange={handleSponsorChange(index)}
                      disabled={true}
                      className="text-lg font-bold"
                      placeholder="Tokens Claimed"
                    />
                    <Input
                      name="linkToSite"
                      value={sponsor.linkToSite}
                      onChange={handleSponsorChange(index)}
                      disabled={!editable.sponsors}
                      className="text-lg font-bold"
                      placeholder="Link to Site"
                    />
                    <div className="flex flex-col items-center">
                      <img
                        src={sponsor.logoUrl}
                        alt={`Sponsor ${index + 1} Logo`}
                        className="w-24 h-24"
                      />
                      <FileUploadButton
                        fileUploadCustomFunction={(file) =>
                          handleSponsorLogoUpload(index, file)
                        }
                        fileType="logo"
                        section="sponsors"
                        variant="sm"
                      />
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSponsorDelete(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No sponsors found</p>
              )}
            </div>
          </EditSection>

          {/* links */}
          <EditSection
            sectionTitle="Links"
            editable={editable}
            setEditable={setEditable}
            editableKey="mainData.links"
            hideButtonSection={true}
            handleCancelButton={() => handleCancelButton("mainData.links")}
            handleSaveButton={() => handleSaveButton("mainData.links")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable["mainData.links"] === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("mainData.links")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => ({
                        ...prevState,
                        "mainData.links": true,
                      }))
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={handleAddMainDataLink}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Link
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("mainData.links")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.mainData.links.length > 0 ? (
                project.mainData.links.map((link, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Link {index + 1}
                    </p>
                    <Input
                      name={`label${index}`}
                      value={link.label}
                      onChange={(e) =>
                        handleMainDataLinksChange(
                          index,
                          "label",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.links"]}
                      className="text-lg font-bold"
                      placeholder="Link Label"
                    />
                    <Input
                      name={`link${index}`}
                      value={link.link}
                      onChange={(e) =>
                        handleMainDataLinksChange(index, "link", e.target.value)
                      }
                      disabled={!editable["mainData.links"]}
                      className="text-lg font-bold"
                      placeholder="Link URL"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMainDataLink(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No links found</p>
              )}
            </div>
          </EditSection>

          {/* mainData.docs update */}
          <EditSection
            sectionTitle="Documents"
            editable={editable}
            setEditable={setEditable}
            editableKey="mainData.docs"
            hideButtonSection={true}
            handleCancelButton={() => handleCancelButton("mainData.docs")}
            handleSaveButton={() => handleSaveButton("mainData.docs")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable["mainData.docs"] === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("mainData.docs")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => ({
                        ...prevState,
                        "mainData.docs": true,
                      }))
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={handleAddMainDataDoc}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Document
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("mainData.docs")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.mainData.docs.length > 0 ? (
                project.mainData.docs.map((doc, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Document {index + 1}
                    </p>
                    <Input
                      name={`label${index}`}
                      value={doc.label}
                      onChange={(e) =>
                        handleMainDataDocsChange(index, "label", e.target.value)
                      }
                      disabled={!editable["mainData.docs"]}
                      className="text-lg font-bold"
                      placeholder="Document Label"
                    />
                    <div className="flex flex-row items-center gap-2">
                      <FileUploadButton
                        fileUploadCustomFunction={(file) =>
                          handleMainDataDocFileUpload(index, file)
                        }
                        fileType="document"
                        section="mainData.docs"
                        variant="sm"
                      />
                      {doc.fileUrl && (
                        <Button
                          size="sm"
                          className="font-bold text-white bg-gGreen"
                          onClick={() => window.open(doc.fileUrl, "_blank")}
                        >
                          View
                        </Button>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMainDataDoc(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No documents found</p>
              )}
            </div>
          </EditSection>

          {/* mainData.environment update */}
          <EditSection
            sectionTitle="Environment"
            editable={editable}
            setEditable={setEditable}
            editableKey="mainData.environment"
            hideButtonSection={true}
            handleCancelButton={() =>
              handleCancelButton("mainData.environment")
            }
            handleSaveButton={() => handleSaveButton("mainData.environment")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable["mainData.environment"] === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("mainData.environment")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => ({
                        ...prevState,
                        "mainData.environment": true,
                      }))
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={handleAddMainDataEnvironment}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Environment
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("mainData.environment")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.mainData.environment.length > 0 ? (
                project.mainData.environment.map((env, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Environment {index + 1}
                    </p>
                    <Input
                      name={`widgetLink${index}`}
                      value={env.widgetLink}
                      onChange={(e) =>
                        handleMainDataEnvironmentChange(
                          index,
                          "widgetLink",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.environment"]}
                      className="text-lg font-bold"
                      placeholder="Widget Link"
                    />
                    <Input
                      name={`height${index}`}
                      value={env.height}
                      onChange={(e) =>
                        handleMainDataEnvironmentChange(
                          index,
                          "height",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.environment"]}
                      className="text-lg font-bold"
                      placeholder="Height"
                    />
                    <Input
                      name={`width${index}`}
                      value={env.width}
                      onChange={(e) =>
                        handleMainDataEnvironmentChange(
                          index,
                          "width",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.environment"]}
                      className="text-lg font-bold"
                      placeholder="Width"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMainDataEnvironment(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No environments found</p>
              )}
            </div>
          </EditSection>

          {/* landConditions update */}
          <EditSection
            sectionTitle="Land Condition"
            editable={editable}
            setEditable={setEditable}
            editableKey="mainData.landCondition"
            hideButtonSection={true}
            handleCancelButton={() =>
              handleCancelButton("mainData.landCondition")
            }
            handleSaveButton={() => handleSaveButton("mainData.landCondition")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable["mainData.landCondition"] === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("mainData.landCondition")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => ({
                        ...prevState,
                        "mainData.landCondition": true,
                      }))
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={handleAddMainDataLandCondition}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Condition
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("mainData.landCondition")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.mainData.landCondition.length > 0 ? (
                project.mainData.landCondition.map((condition, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Condition {index + 1}
                    </p>
                    <Input
                      name={`parameter${index}`}
                      value={condition.parameter}
                      onChange={(e) =>
                        handleMainDataLandConditionChange(
                          index,
                          "parameter",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.landCondition"]}
                      className="text-lg font-bold"
                      placeholder="Parameter"
                    />
                    <Input
                      name={`condition${index}`}
                      value={condition.condition}
                      onChange={(e) =>
                        handleMainDataLandConditionChange(
                          index,
                          "condition",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.landCondition"]}
                      className="text-lg font-bold"
                      placeholder="Condition"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMainDataLandCondition(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No conditions found</p>
              )}
            </div>
          </EditSection>

          {/* seasons update */}
          <EditSection
            sectionTitle="Seasons"
            editable={editable}
            setEditable={setEditable}
            editableKey="mainData.seasons"
            hideButtonSection={true}
            handleCancelButton={() => handleCancelButton("mainData.seasons")}
            handleSaveButton={() => handleSaveButton("mainData.seasons")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable["mainData.seasons"] === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("mainData.seasons")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => ({
                        ...prevState,
                        "mainData.seasons": true,
                      }))
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={handleAddMainDataSeasons}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Season
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("mainData.seasons")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.mainData.seasons.length > 0 ? (
                project.mainData.seasons.map((season, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Season {index + 1}
                    </p>
                    <Input
                      name={`species${index}`}
                      value={season.species}
                      onChange={(e) =>
                        handleMainDataSeasonsChange(
                          index,
                          "species",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.seasons"]}
                      className="text-lg font-bold"
                      placeholder="Species"
                    />
                    <Input
                      name={`month${index}`}
                      value={season.month}
                      onChange={(e) =>
                        handleMainDataSeasonsChange(
                          index,
                          "month",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.seasons"]}
                      className="text-lg font-bold"
                      placeholder="Month"
                    />
                    <div className="flex flex-row items-center gap-2">
                      <FileUploadButton
                        fileUploadCustomFunction={(file) =>
                          handleMainDataSeasonFileUpload(index, file)
                        }
                        fileType="document"
                        section="mainData.seasons"
                        variant="sm"
                      />
                      {season.docUrl && (
                        <Button
                          size="sm"
                          className="font-bold text-white bg-gGreen"
                          onClick={() => window.open(season.docUrl, "_blank")}
                        >
                          View
                        </Button>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMainDataSeasons(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No seasons found</p>
              )}
            </div>
          </EditSection>

          {/* monitors update */}
          <EditSection
            sectionTitle="Monitors"
            editable={editable}
            setEditable={setEditable}
            editableKey="mainData.monitors"
            hideButtonSection={true}
            handleCancelButton={() => handleCancelButton("mainData.monitors")}
            handleSaveButton={() => handleSaveButton("mainData.monitors")}
            customButton={
              <div className="flex flex-row items-center gap-x-4">
                {editable["mainData.monitors"] === true ? (
                  <Button
                    size="small"
                    onClick={() => handleCancelButton("mainData.monitors")}
                    className="font-bold text-white bg-danger"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    size="small"
                    onClick={() =>
                      setEditable((prevState) => ({
                        ...prevState,
                        "mainData.monitors": true,
                      }))
                    }
                    className="font-bold text-white bg-gGreen"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  size="small"
                  onClick={handleAddMainDataMonitors}
                  className="font-bold text-white bg-gGreen"
                >
                  Add Monitor
                </Button>
                <Button
                  size="small"
                  onClick={() => handleSaveButton("mainData.monitors")}
                  className="font-bold text-white bg-gGreen"
                >
                  Save
                </Button>
              </div>
            }
          >
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {project.mainData.monitors.length > 0 ? (
                project.mainData.monitors.map((monitor, index) => (
                  <div key={index} className="flex flex-col gap-y-2">
                    <p className="text-sm capitalize manrope-400">
                      Monitor {index + 1}
                    </p>
                    <Input
                      name={`label${index}`}
                      value={monitor.label}
                      onChange={(e) =>
                        handleMainDataMonitorsChange(
                          index,
                          "label",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.monitors"]}
                      className="text-lg font-bold"
                      placeholder="Label"
                    />
                    <Input
                      name={`link${index}`}
                      value={monitor.link}
                      onChange={(e) =>
                        handleMainDataMonitorsChange(
                          index,
                          "link",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.monitors"]}
                      className="text-lg font-bold"
                      placeholder="Link"
                    />
                    <Input
                      name={`imageUrl${index}`}
                      value={monitor.imageUrl}
                      onChange={(e) =>
                        handleMainDataMonitorsChange(
                          index,
                          "imageUrl",
                          e.target.value
                        )
                      }
                      disabled={!editable["mainData.monitors"]}
                      className="text-lg font-bold"
                      placeholder="Image URL"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleDeleteMainDataMonitors(index)}
                      className="font-bold text-white bg-danger w-fit"
                    >
                      Delete
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-black">No monitors found</p>
              )}
            </div>
          </EditSection>
        </div>
      ) : (
        <div className="mt-40 text-black">Loading...</div>
      )}
    </PageOuterContainer>
  );
}

export default ProjectView;
