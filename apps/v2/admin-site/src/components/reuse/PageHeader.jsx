import React from "react";

function PageHeader(props) {
  return (
    <div>
      <p className="mb-6 text-2xl manrope-900">{props.title}</p>
    </div>
  );
}

export default PageHeader;
