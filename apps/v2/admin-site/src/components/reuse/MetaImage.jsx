import React from "react";
import { Button } from "@nextui-org/react";

function MetaImage(props) {
  const generateRandomString = (length) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // console.log(result);
    return result;
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-glGreen"
      key={props.key}
    >
      <img
        // src={props.imgUrl || "https://i.pravatar.cc/150?u=a042581f4e29026024d"}
        src={
          props.imgUrl.length > 2
            ? props.imgUrl
            : `https://robohash.org/${generateRandomString(8)}.png?set=set4`
        }
        alt="Gallery Image"
        className="object-cover h-56 rounded-lg w-72"
      />
      <div className="flex flex-row items-center justify-center w-full gap-4 mt-4">
        {props.uploadButton}
        {/* <Button
          size="sm"
          className="mt-4 font-bold text-white bg-gGreen"
          onPress={props.deleteImage}
        >
          Upload
        </Button> */}
        {props.deleteButton}
      </div>
    </div>
  );
}

export default MetaImage;
