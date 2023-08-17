import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import editIcon from "../../assets/svg/edit.svg";

function NewApplication(props) {
  const navigate = useNavigate();
  const { getApplicationCount, createNewApplication } = useContext(AppContext);
  const [applicationWindowState, setApplicationWindowState] = useState("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    gps: "",
    ownership: "",
    size: "",
    moreInfo: "",
    message: "",
  });

  const generateRandomID = (applicationCount) => {
    console.log("applicationCount", applicationCount);
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let prefix = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      prefix += letters[randomIndex];
    }

    const timestamp = Math.floor(Date.now() / 1000);
    const randomID = `${prefix}-${parseInt(applicationCount) + 1}-${timestamp}`;

    return randomID;
  };

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
          <p className="font- text-[80px] leading-[95px]">New Application</p>
        </div>

        {/* right - logo container */}
        <img src={AdminLogo} alt="Admin Logo" className="w-[150px]"></img>
      </div>

      {applicationWindowState === "form" ? (
        <div className="grid grid-cols-3 px-32 mb-16 space-y-12">
          {/* your name */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Your Name</p>
              <input
                type="text"
                placeholder="Your Name"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
          </div>

          {/* your email */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Your Email</p>
              <input
                type="text"
                placeholder="Your Email"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* project location address */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Location Address</p>
              <input
                type="text"
                placeholder="Project Location Address"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>

          {/* GPS Coordinates */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">GPS Coordinates (Lat/Lon)</p>
              <input
                type="text"
                placeholder="13.0933 / 80.2842"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.gps}
                onChange={(e) =>
                  setFormData({ ...formData, gps: e.target.value })
                }
              />
            </div>
          </div>

          {/* ownership */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Ownership Status</p>
              <input
                type="text"
                placeholder="Private / Community"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.ownership}
                onChange={(e) =>
                  setFormData({ ...formData, ownership: e.target.value })
                }
              />
            </div>
          </div>

          {/* Project Size in m2 */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Size in m2</p>
              <input
                type="text"
                placeholder="Project Size in m2"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
              />
            </div>
          </div>

          {/* more info */}
          <div className="flex flex-row items-end col-span-3 space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col w-[800px]">
              <p className="text-xs font-light">More Info about the Project</p>
              <textarea
                type="text"
                placeholder="More Info about the Project"
                className="w-full py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.moreInfo}
                onChange={(e) =>
                  setFormData({ ...formData, moreInfo: e.target.value })
                }
              />
            </div>
          </div>

          {/* message */}
          <div className="flex flex-row items-end col-span-3 space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y- w-[800px]">
              <p className="text-xs font-light">Your Message (Optional)</p>
              <textarea
                type="text"
                placeholder="Your Message"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>
          </div>

          <button
            className="text-lg text-white capitalize border-2 btn bg-gGreen border-gGreen"
            onClick={async () => {
              console.log("Form Data: ", formData);
              if (
                formData.name === "" ||
                formData.email === "" ||
                formData.location === "" ||
                formData.gps === "" ||
                formData.ownership === "" ||
                formData.size === "" ||
                formData.moreInfo === ""
              ) {
                toast.error("Please fill all the required fields");
              } else {
                const applicationCount = await getApplicationCount();
                const applicationID = generateRandomID(applicationCount);
                console.log(
                  "Creating Application: ",
                  applicationID,
                  applicationCount
                );
                let temporaryFormData = {};
                temporaryFormData.body = formData;
                temporaryFormData.createdOn = Date.now();
                temporaryFormData.applicationID = applicationID;
                temporaryFormData.status = "submitted";
                const newApplicationResult = await createNewApplication(
                  temporaryFormData
                );
                if (newApplicationResult === true) {
                  toast.success("Application Created Successfully");
                  setApplicationWindowState("submitted");
                } else {
                  toast.error("Application Creation Failed. Try Again");
                }
              }
            }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="px-16 py-8">
          <div className="flex flex-col items-center justify-center p-16 space-y-8 rounded-lg bg-gGreen">
            <p className="text-3xl font-bold text-center text-white">
              Application Submitted Successfully. We'll get back to you after
              reviewing. Thank you.
            </p>
            <button
              className="px-6 py-2 text-lg capitalize bg-white border-0 rounded-md btn text-gGreen"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewApplication;
