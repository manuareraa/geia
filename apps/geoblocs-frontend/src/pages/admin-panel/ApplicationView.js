import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";
import BackCircle from "../../assets/svg/back-circle.svg";

function ApplicationView(props) {
  const navigate = useNavigate();
  const { applicationId } = useParams();

  useEffect(() => {
    console.log(applicationId);
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

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-20 px-52">
        {/* title */}
        <div className="flex flex-col items-start w-full my-">
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-3xl font-bold text-center">
              Application ID. #{applicationId}
            </p>
            <img
              src={BackCircle}
              className="w-10 hover:cursor-pointer"
              onClick={() => {
                navigate("/admin/dashboard/applications");
              }}
            />
          </div>
        </div>
        <div className="mb-6 divider"></div>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="grid w-full grid-cols-4 grid-rows- gap-y-12">
            <div className="flex flex-col space-y-2">
              <p className="text-xl font-bold">Application No.</p>
              <p className="text-lg font-">{applicationId}</p>
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
            <div className="flex flex-col col-span-2 space-y-2">
              <p className="text-xl font-bold">Ownership Status</p>
              <p className="text-lg font-">Private</p>
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
            <div className="flex flex-col col-span-2 space-y-2">
              <p className="text-xl font-bold">Project Size</p>
              <p className="text-lg font-">thomas@gmail.com</p>
            </div>
            <div className="flex flex-col col-span-4 space-y-2">
              <p className="text-xl font-bold">Project Details</p>
              <p className="text-lg font-">
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
              </p>
            </div>
            <div className="flex flex-col col-span-4 space-y-2">
              <p className="text-xl font-bold">Project Details</p>
              <p className="text-lg font-">
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
                This is some more info about the project. This is some more info
                about the project. This is some more info about the project.
              </p>
            </div>
            <div className="col-span-4">
              <button className="text-lg text-white capitalize rounded-md btn bg-gGreen">
                Approve
              </button>
            </div>
            <div className="flex flex-col col-span-4 space-y-4">
              <textarea
                type="text"
                placeholder="Reason for Rejection"
                className="textarea textarea-md bg-gGray w-[600px]"
              ></textarea>
              <button className="text-lg text-white capitalize rounded-md btn bg-red w-fit">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationView;
