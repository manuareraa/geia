import React, { useState } from "react";
import { Input, Divider, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import PageOuterContainer from "../components/reuse/PageOuterContainer";
import PageHeader from "../components/reuse/PageHeader";

import {
  createNewProject,
  useProjectStore
} from "../state-management/AppState";

function NewProject(props) {
  const navigate = useNavigate();
  const { fetchAllProjects } = useProjectStore();
  const [projectData, setProjectData] = useState({
    projectName: "",
    country: "",
    address: "",
    gpsCoordinates: "",
    ownership: "",
    areaSize: "",
  });

  const inputFields = [
    { label: "Project Name", key: "projectName" },
    { label: "Country", key: "country" },
    { label: "Address", key: "address" },
    { label: "GPS Coordinates", key: "gpsCoordinates" },
    { label: "Ownership", key: "ownership" },
    { label: "Area Size", key: "areaSize" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ownership") {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value.toLowerCase(),
      }));
    } else {
      setProjectData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("projectData", projectData);
    const response = await createNewProject(projectData);
    if (response.status === "success") {
      console.log("Project created successfully!");
      await fetchAllProjects();
      navigate("/dashboard/projects");
    }
  };

  return (
    <PageOuterContainer>
      <PageHeader title="Create New Project" />
      {/* content */}
      <div>
        <p className="text-lg manrope-700">Metadata</p>
      </div>
      <Divider className="my-4" />
      <div className="h-full">
        <div className="grid items-center justify-center grid-cols-3 mt-4 manrope-400 gap-x-16 gap-y-8 w-fit">
          {inputFields.map((field, index) => (
            <div className="flex flex-col" key={index}>
              <h3 className="text-default-500 text-small">{field.label}</h3>
              <Input
                type="text"
                labelPlacement="outside-left"
                placeholder={`Enter ${field.label}`}
                description={
                  field.label === "GPS Coordinates"
                    ? "Ex: 12.3456, 78.9101"
                    : field.label === "Ownership"
                    ? "Ex: Public, Private, or Public-Private"
                    : field.label === "Area Size"
                    ? "Ex: [size] [unit] - 1000 sq. ft. / 1 ha"
                    : ""
                }
                size="lg"
                name={field.key}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
        <div className="mt-16">
          <Button auto className="text-white bg-gGreen" onPress={handleSubmit}>
            Create Project
          </Button>
        </div>
      </div>
    </PageOuterContainer>
  );
}

export default NewProject;
