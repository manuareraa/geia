import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import { toast } from "react-hot-toast";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";
import editIcon from "../../assets/svg/edit.svg";

function CreateNewProject(props) {
  const { createNewProjectByAdmin } = useContext(AppContext);
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    gps: "",
    ownership: "",
    size: "",
  });

  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-row items-center justify-between px-4 pt-24 space-x-4 md:px-6 lg:px-8 md:space-x-6 lg:space-x-8 md:pt-32 lg:pt-40">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-2 md:space-y-4">
          {/* sub title */}
          <p className="text-xs font-light text-center md:text-sm lg:text-base">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="text-2xl leading-tight md:text-3xl lg:text-4xl">
            Admin Panel
          </p>
        </div>

        {/* right - logo container */}
        <img
          src={AdminLogo}
          alt="Admin Logo"
          className="w-16 md:w-24 lg:w-32"
        ></img>
      </div>

      {/* buttons container */}
      <ButtonsContainer />

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full px-4 my-8 md:my-12 lg:my-16 md:px-8 lg:px-12">
        {/* title */}
        <div className="flex flex-col items-start w-full mb-2">
          <p className="text-xl font-bold text-center md:text-2xl lg:text-3xl">
            Create New Project
          </p>
        </div>
        <div className="mb-2 divider"></div>
        <div className="grid w-full grid-cols-1 gap-4 px-4 mb-8 md:grid-cols-2 lg:grid-cols-3 md:px-8 lg:px-12 md:mb-12 lg:mb-16">
          {/* input fields */}
          {[
            "Project Name",
            "Project Location",
            "Project Location Address",
            "GPS Coordinates (Lat/Lon)",
            "Ownership Status",
            "Project Size",
          ].map((label, index) => (
            <div className="flex flex-row items-end space-x-2" key={index}>
              <img src={editIcon} alt="" className="w-6 h-6"></img>
              <div className="flex flex-col space-y-1 md:space-y-2">
                <p className="text-xs font-light md:text-sm">{label}</p>
                <input
                  type="text"
                  placeholder={`Enter ${label}`}
                  className="flex-grow py-1 border-b-2 md:py-2 border-black/50 focus:outline-none"
                  // Assuming each form field has a corresponding value and setter in the formData state object
                  value={formData[label.replace(/ /g, "").toLowerCase()]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [label.replace(/ /g, "").toLowerCase()]: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          ))}
          <button
            className="w-full text-lg text-white capitalize border-2 btn bg-gGreen border-gGreen md:w-auto"
            onClick={async () => {
              console.log("Form Data: ", formData);
              if (
                formData.projectName === "" ||
                formData.location === "" ||
                formData.gps === "" ||
                formData.ownership === "" ||
                formData.size === ""
              ) {
                toast.error("Please fill all the required fields");
              } else {
                const newProjectResult = await createNewProjectByAdmin(
                  formData
                );
                if (newProjectResult === true) {
                  toast.success("Project Created Successfully");
                  setFormData({
                    projectName: "",
                    location: "",
                    gps: "",
                    ownership: "",
                    size: "",
                  });
                } else {
                  toast.error("Project Creation Failed. Try Again");
                }
              }
            }}
          >
            Create New Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewProject;
