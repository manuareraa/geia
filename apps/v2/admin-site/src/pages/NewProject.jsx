import React from "react";
import { Input, Divider, Button } from "@nextui-org/react";

import PageOuterContainer from "../components/reuse/PageOuterContainer";
import PageHeader from "../components/reuse/PageHeader";

function NewProject(props) {
  const inputFields = [
    "Project Name",
    "Country",
    "Address",
    "GPS Coordinates",
    "Sponsorhsip",
    "Size",
  ];

  return (
    <PageOuterContainer>
      <PageHeader title="Create New Project" />
      {/* content */}
      <div>
        <p className="text-lg manrope-700">Metadata</p>
      </div>
      <Divider className="my-4" />
      <div className="grid items-center justify-center grid-cols-3 mt-4 manrope-400 gap-x-16 gap-y-8 w-fit">
        {inputFields.map((field, index) => (
          <div className="flex flex-col">
            <h3 className="text-default-500 text-small">{field}</h3>
            <Input
              key={index}
              type="text"
              //   label={field}
              labelPlacement="outside-left"
              placeholder={`Enter ${field}`}
              description=""
              size="lg"
            />
          </div>
        ))}
      </div>
      <div className="mt-16">
        <Button auto className="text-white bg-gGreen">
          Create Project
        </Button>
      </div>
      <div className="embed-container">
        <iframe src="https://rodtrent.substack.com/p/quantum-computing-and-generative"></iframe>
      </div>
    </PageOuterContainer>
  );
}

export default NewProject;
