import React from "react";

import loadingAnimation from "../assets/svg/loading.svg";

function Loading(props) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img
        src={loadingAnimation}
        className="w-44 h-44"
        alt="geoblocs loading animation"
      />
      <p className="text-2xl font-bold">Please Wait</p>
      <p className="text-lg font-light">{props.message}</p>
    </div>
  );
}

export default Loading;
