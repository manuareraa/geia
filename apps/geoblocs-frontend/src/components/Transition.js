import React, { useEffect, useState } from "react";

const Transition = ({ children, trigger, isExiting }) => {
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    setIsEntering(trigger);
  }, [trigger]);

  return (
    <div
      className={`page-transition ${
        (isEntering && "fade-in") || (isExiting && "fade-out")
      }`}
    >
      {children}
    </div>
  );
};

export default Transition;
