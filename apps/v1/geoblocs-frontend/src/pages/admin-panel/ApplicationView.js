import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";
import BackCircle from "../../assets/svg/back-circle.svg";
import { toast } from "react-hot-toast";

function ApplicationView(props) {
  const { checkForAuthentication, appData, setAppData, sendResponseToApplicant } =
    useContext(AppContext);
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [message, setMessage] = useState("");

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

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-20 px-52">
        {/* title */}
        {Object.keys(appData.applicationInView).length > 0 ? (
          <>
            <div className="flex flex-col items-start w-full my-">
              <div className="flex flex-row items-center justify-between w-full">
                <p className="text-3xl font-bold text-center">
                  Application ID. #{applicationId}
                </p>
                <img
                  src={BackCircle}
                  className="w-10 hover:cursor-pointer"
                  onClick={() => {
                    setAppData((prevState) => {
                      return {
                        ...prevState,
                        applicationInView: {},
                      };
                    });
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
                  <p className="text-lg font-">
                    {/* {appData.applicationInView.body.name} */}--
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Applied Date</p>
                  <p className="text-lg font-">
                    {new Date(
                      appData.applicationInView.createdOn
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
                    {appData.applicationInView.body.location}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Applicant Name</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.name}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Email</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.email}
                  </p>
                </div>
                <div className="flex flex-col col-span-2 space-y-2">
                  <p className="text-xl font-bold">Ownership Status</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.ownership}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">Location Address</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.location}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xl font-bold">GPS Coordinates</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.gps}
                  </p>
                </div>
                <div className="flex flex-col col-span-2 space-y-2">
                  <p className="text-xl font-bold">Project Size</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.size} m2
                  </p>
                </div>
                <div className="flex flex-col col-span-4 space-y-2">
                  <p className="text-xl font-bold">Project Info</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.moreInfo}
                  </p>
                </div>
                <div className="flex flex-col col-span-4 space-y-2">
                  <p className="text-xl font-bold">Message</p>
                  <p className="text-lg font-">
                    {appData.applicationInView.body.message}
                  </p>
                </div>
                <div className="col-span-4">
                  <textarea
                    type="text"
                    placeholder="Message to Applicant"
                    className="textarea textarea-md bg-gGray w-[600px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex flex-row space-x-8">
                  <button
                    className="text-lg text-white capitalize rounded-md btn bg-gGreen"
                    onClick={() => {
                      if (message !== "") {
                        sendResponseToApplicant(
                          message,
                          applicationId,
                          appData.applicationInView.body.email,
                          "accepted"
                        );
                      } else {
                        toast.error("Please enter a message");
                      }
                    }}
                  >
                    Approve
                  </button>
                  <button
                    className="text-lg text-white capitalize rounded-md btn bg-red w-fit"
                    onClick={() => {
                      if (message !== "") {
                        sendResponseToApplicant(
                          message,
                          applicationId,
                          appData.applicationInView.body.email,
                          "denied"
                        );
                      } else {
                        toast.error("Please enter a message");
                      }
                    }}
                  >
                    Deny
                  </button>
                </div>
                <div className="flex flex-col col-span-4 space-y-4"></div>
              </div>
            </div>
          </>
        ) : (
          <p className="flex items-center self-center justify-center w-full ">
            Please select an application from applications window to view
          </p>
        )}
      </div>
    </div>
  );
}

export default ApplicationView;
