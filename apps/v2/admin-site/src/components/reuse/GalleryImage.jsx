import React from "react";
import { Button } from "@nextui-org/react";

function GalleryImage(props) {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-glGreen"
      key={props.key}
    >
      <img
        src={props.imgUrl || "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
        alt="Gallery Image"
        className="object-cover rounded-lg w-52 h-52"
      />
      <Button
        size="sm"
        className="mt-4 font-bold text-white bg-danger"
        onPress={props.deleteImage}
      >
        Delete
      </Button>
    </div>
  );
}

export default GalleryImage;
