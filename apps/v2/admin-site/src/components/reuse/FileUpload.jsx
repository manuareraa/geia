import { Button } from "@nextui-org/react";
import React, { useRef, useState } from "react";

const FileUploadButton = (props) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log(file);
    console.log("Props", props);
    if (props.fileUploadCustomFunction) {
      await props.fileUploadCustomFunction(file);
      fileInputRef.current.value = "";
    } else {
      await props.fileUploadFunction(props.fileType, props.section, file);
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        size={props.variant || "md"}
        className="font-bold text-white bg-gGreen"
      >
        Upload
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        multiple={false}
        accept={
          props.section === "imageGallery" || props.section === "metaImages"
            ? "image/*"
            : "application/pdf"
        }
      />
      {/* {selectedFile && <p>Selected file: {selectedFile.name}</p>} */}
    </div>
  );
};

export default FileUploadButton;
