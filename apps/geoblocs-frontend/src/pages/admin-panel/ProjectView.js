import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";
import BackCircle from "../../assets/svg/back-circle.svg";
import StatusChart from "../../components/admin/StatusChart";
import GeoblocsChart from "../../components/admin/GeoblocsChart";
import ProjectStory from "../../components/admin/project-view/ProjectStory";
import ProjectGallery from "../../components/admin/project-view/ProjectGallery";
import ProjectMetadata from "../../components/admin/project-view/ProjectMetadata";
import ProjectLinks from "../../components/admin/project-view/ProjectLinks";
import ProjectDocuments from "../../components/admin/project-view/ProjectDocuments";
import ProjectSponsors from "../../components/admin/project-view/ProjectSponsors";
import ProjectConditions from "../../components/admin/project-view/ProjectConditions";
import ProjectEnvironment from "../../components/admin/project-view/ProjectEnvironment";
import ProjectSeasons from "../../components/admin/project-view/ProjectSeasons";
import ManageGeoblocs from "../../components/admin/project-view/ManageGeoblocs";

function ProjectView(props) {
  const {
    appData,
    setAppData,
    checkForAuthentication,
    changeProjectLiveStatus,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [liveStatus, setLiveStatus] = useState(false);
  const [subWindow, setSubWindow] = useState("");

  // useEffect(() => {
  //   console.log(projectId);
  // }, [appData.projectInView]);

  useEffect(() => {
    checkForAuthentication("admin");
  }, []);
  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-row items-center justify-between px-32 space-x-8 pt-44">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px]">Admin Panel</p>
        </div>

        {/* right - logo container */}
        <img src={AdminLogo} alt="Admin Logo" className="w-[150px]"></img>
      </div>

      {/* buttons container */}
      <ButtonsContainer />

      {/* body */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-20 px-52">
        {Object.keys(appData.projectInView).length > 0 ? (
          <>
            <div className="flex flex-col items-start w-full my-">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-3xl font-bold text-center">
                  Project ID #{projectId}
                </p>
                <img
                  src={BackCircle}
                  className="w-10 hover:cursor-pointer"
                  onClick={() => {
                    navigate("/admin/dashboard/projects");
                  }}
                />
              </div>
            </div>
            <div className="mb-6 divider"></div>

            {/* sub-body container */}
            <div className="flex flex-col items-center justify-center w-full space-y-16">
              {/* project status toggle bar */}
              <div class="flex flex-row form-control space-x-8">
                <label class="cursor-pointer label grid grid-cols-2 space-x-8">
                  <span class="label-text font-bold text-lg">
                    {appData.projectInView.status === "live" ? (
                      <p>
                        Project is{" "}
                        <span className="font-bold text-gGreen">live</span>
                      </p>
                    ) : (
                      "Project is not live"
                    )}
                  </span>
                  <input
                    type="checkbox"
                    class="toggle toggle-lg w-[87px] h-[55px] toggle-custom-color"
                    checked={
                      appData.projectInView.status === "live" ? true : false
                    }
                    onChange={async () => {
                      await changeProjectLiveStatus(
                        appData.projectInView.status === "live"
                          ? "not live"
                          : "live",
                        projectId
                      );
                      setAppData((prevState) => {
                        return {
                          ...prevState,
                          projectInView: {
                            ...prevState.projectInView,
                            status:
                              prevState.projectInView.status === "live"
                                ? "not live"
                                : "live",
                          },
                        };
                      });
                    }}
                  />
                </label>
              </div>

              {/* project metadata  */}
              <div className="grid w-full grid-cols-4 grid-rows- gap-y-12">
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Application No.</p>
                  <p className="text-lg font-">{projectId}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Project Name</p>
                  <p className="text-lg font-">
                    {appData.projectInView.metadata.projectName === ""
                      ? "--"
                      : appData.projectInView.metadata.projectName}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Started Date</p>
                  <p className="text-lg font-">
                    {appData.projectInView.metadata.startedFrom === ""
                      ? "--"
                      : new Date(
                          appData.projectInView.metadata.startedFrom
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Location</p>
                  <p className="text-lg font-">
                    {appData.projectInView.metadata.location}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Applicant Name</p>
                  <p className="text-lg font-">
                    {appData.projectInView.applicationDetails.name}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Email</p>
                  <p className="text-lg font-">
                    {appData.projectInView.applicationDetails.email}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Location Address</p>
                  <p className="text-lg font-">
                    {appData.projectInView.metadata.locationAddress === ""
                      ? "--"
                      : appData.projectInView.metadata.locationAddress}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">GPS Coordinates</p>
                  <p className="text-lg font-">
                    {appData.projectInView.metadata.gps}
                  </p>
                </div>
              </div>

              <div className="divider"></div>

              {/* geoblocs stats container */}
              <div className="flex flex-row items-center justify-center space-x-28">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-xl font-bold">Geoblocs Purchased</p>
                  <p className="text-4xl">
                    {appData.projectInView.geoblocsData.purchased}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 text-xl">
                  <p className="font-bold">Geoblocs Remaining</p>
                  <p className="text-4xl">
                    {appData.projectInView.geoblocsData.totalSupply -
                      appData.projectInView.geoblocsData.purchased}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-4 text-xl">
                  <p className="font-bold">Total Supply</p>
                  <p className="text-4xl">
                    {appData.projectInView.geoblocsData.totalSupply}
                  </p>
                </div>
              </div>

              {/* charts container */}
              <div className="flex flex-row items-center justify-center w-full space-x-2">
                {/* project status chart */}
                <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
                  <p className="text-2xl font-bold text-center">
                    Project Status
                  </p>
                  <StatusChart
                    completed={appData.projectInView.metadata.projectStatus}
                    inProgress={
                      100 - appData.projectInView.metadata.projectStatus
                    }
                  />
                </div>

                {/* geoblocs distribution chart */}
                <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
                  <p className="text-2xl font-bold text-center">
                    Geoblocs Distribution
                  </p>
                  <GeoblocsChart
                    totalSupply={appData.projectInView.geoblocsData.totalSupply}
                    purchased={appData.projectInView.geoblocsData.purchased}
                  />
                </div>
              </div>
              <div className="divider"></div>

              {/* buttons container */}
              <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("story");
                    window.my_modal_1.showModal();
                  }}
                >
                  Manage Project Story
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("gallery");
                    window.my_modal_1.showModal();
                  }}
                >
                  Manage Project Gallery
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("metadata");
                    window.my_modal_1.showModal();
                  }}
                >
                  Edit Project Metadata
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("links");
                    window.my_modal_1.showModal();
                  }}
                >
                  Update Project Links
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("documents");
                    window.my_modal_1.showModal();
                  }}
                >
                  Update Project Documents
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("sponsors");
                    window.my_modal_1.showModal();
                  }}
                >
                  Manage Sponsors
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("environment");
                    window.my_modal_1.showModal();
                  }}
                >
                  Update Environment Data
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    setSubWindow("conditions");
                    window.my_modal_1.showModal();
                  }}
                >
                  Edit Land Conditions
                </button>
                <button
                  className="px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    window.my_modal_1.showModal();
                    setSubWindow("season");
                  }}
                >
                  Edit Planting Season
                </button>
                <button
                  className="col-span-3 px-10 text-xl text-white capitalize btn bg-gGreen hover:bg-gGreen/80"
                  onClick={() => {
                    window.my_modal_1.showModal();
                    setSubWindow("geoblocs");
                  }}
                >
                  Manage Geoblocs
                </button>
              </div>
            </div>

            <dialog
              id="my_modal_1"
              className="items-start w-full py-16 overflow-auto px-28 modal bg-gGreen/20"
            >
              <div method="dialog" className="w-full p-12 bg-white rounded-3xl">
                {/* body goes here */}
                {subWindow === "story" ? (
                  <ProjectStory
                    projectId={projectId}
                    storyHeading={"storyHeading"}
                    storyBody={"storyBody"}
                  />
                ) : subWindow === "gallery" ? (
                  <ProjectGallery
                    projectId={projectId}
                    projectGallery={"projectGallery"}
                  />
                ) : subWindow === "metadata" ? (
                  <ProjectMetadata
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : subWindow === "links" ? (
                  <ProjectLinks
                    projectId={projectId}
                    projectLinks={"ProjectLinks"}
                  />
                ) : subWindow === "documents" ? (
                  <ProjectDocuments
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : subWindow === "sponsors" ? (
                  <ProjectSponsors
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : subWindow === "environment" ? (
                  <ProjectEnvironment
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : subWindow === "conditions" ? (
                  <ProjectConditions
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : subWindow === "season" ? (
                  <ProjectSeasons
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : subWindow === "geoblocs" ? (
                  <ManageGeoblocs
                    projectId={projectId}
                    projectMetadata={"projectMetadata"}
                  />
                ) : null}

                <div className="flex flex-row justify-center w-full space-x-8 modal-action">
                  {/* if there is a button in form, it will close the modal */}

                  <form method="dialog">
                    <button className="text-lg capitalize border-2 text-gGreen btn border-gGreen bg-white/0 hover:border-2 hover:border-gGreen hover:bg-white">
                      Close
                    </button>
                  </form>

                  <button className="text-lg text-white capitalize border-2 btn bg-gGreen border-gGreen">
                    Save
                  </button>
                </div>
              </div>
            </dialog>
          </>
        ) : (
          <p>Please select a project to view</p>
        )}
      </div>
    </div>
  );
}

export default ProjectView;
