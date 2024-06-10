import React from "react";

import loadingAnimation from "../assets/svg/loading.svg";

function Loading(props) {
  return (
    <div className="z-[100] flex flex-col items-center justify-center h-screen bg-white">
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
