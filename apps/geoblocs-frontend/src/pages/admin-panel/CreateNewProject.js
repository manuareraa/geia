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
          <p className="text-3xl font-bold text-center">Create New Project</p>
        </div>
        <div className="mb-2 divider"></div>
        <div className="grid w-full grid-cols-3 px-32 mb-16 space-y-12">
          {/* project name */}
          <div className="flex flex-row items-end space-x-2">
            <img src={editIcon} alt="" className="w-6 h-6"></img>
            <div className="flex flex-col space-y-">
              <p className="text-xs font-light">Project Name</p>
              <input
                type="text"
                placeholder="Project Name"
                className="py-2 border-b-2 border-black/50 focus:outline-none"
                value={formData.projectName}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
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
          <div className="flex flex-row items-end col-span-2 space-x-2">
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

          <button
            className="text-lg text-white capitalize border-2 btn bg-gGreen border-gGreen"
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
                const newProjectResult = await createNewProjectByAdmin(formData);
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
