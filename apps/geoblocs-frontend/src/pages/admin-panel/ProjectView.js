import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [liveStatus, setLiveStatus] = useState(false);
  const [subWindow, setSubWindow] = useState("");

  useEffect(() => {
    console.log(projectId);
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
        {/* title bar */}
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
                {liveStatus === true ? (
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
                checked={liveStatus}
                onChange={() => {
                  setLiveStatus(!liveStatus);
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
              <p className="text-lg font-">Phillipines Rain Forest</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">Applied Date</p>
              <p className="text-lg font-">12 June, 2023</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">Location</p>
              <p className="text-lg font-">Phillipines</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">Applicant Name</p>
              <p className="text-lg font-">Thomas Richardson</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">Email</p>
              <p className="text-lg font-">thomas@gmail.com</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">Location Address</p>
              <p className="text-lg font-">
                Address Line 1, <br></br>Phillipines
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">GPS Coordinates</p>
              <p className="text-lg font-">Thomas Richardson</p>
            </div>
          </div>

          <div className="divider"></div>

          {/* geoblocs stats container */}
          <div className="flex flex-row items-center justify-center space-x-28">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-xl font-bold">Geoblocs Purchased</p>
              <p className="text-4xl">1265</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl">
              <p className="font-bold">Geoblocs Remaining</p>
              <p className="text-4xl">149,835</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-xl">
              <p className="font-bold">Total Supply</p>
              <p className="text-4xl">150,000</p>
            </div>
          </div>

          {/* charts container */}
          <div className="flex flex-row items-center justify-center w-full space-x-2">
            {/* project status chart */}
            <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
              <p className="text-2xl font-bold text-center">Project Status</p>
              <StatusChart />
            </div>

            {/* geoblocs distribution chart */}
            <div className="flex flex-col items-center justify-center w-full space-y-6 focus:outline-none">
              <p className="text-2xl font-bold text-center">
                Geoblocs Distribution
              </p>
              <GeoblocsChart />
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
      </div>
    </div>
  );
}

export default ProjectView;
