import React from "react";

function PageHeader(props) {
  return (
    <div className="flex flex-row items-center justify-between mb-6">
      <p className="text-2xl manrope-900">{props.title}</p>
      {props.rightContainer ? props.rightContainer : null}
    </div>
  );
}

export default PageHeader;
