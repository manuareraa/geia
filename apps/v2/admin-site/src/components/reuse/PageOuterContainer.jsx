import React from "react";

function PageOuterContainer(props) {
  return (
    <div className="flex flex-col w-full h-full p-8 bcheckk">
      {props.children}
    </div>
  );
}

export default PageOuterContainer;
