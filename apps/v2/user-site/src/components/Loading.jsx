import React from "react";
import { useStore } from "zustand";
import { useLoadingStore } from "../state-management/AppState";

import loadingAnimation from "../assets/animation/loading.svg";

function Loading() {
  const { message } = useStore(useLoadingStore);
  return (
    <div className="fixed w-full z-[900]">
      <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
        <img
          src={loadingAnimation}
          // className="lgw-44 h-44"
          // make it reponsive
          className="w-20 h-20 md:w-36 md:h-36 lg:w-44 lg:h-44"
          alt="geoblocs loading animation"
        />
        <p className="font-bold text-md md:text-lg lg:text-xl">
          Please Wait
        </p>
        <p className="text-xs font-light md:text-sm lg:text-md">{message}</p>
      </div>
    </div>
  );
}

export default Loading;
