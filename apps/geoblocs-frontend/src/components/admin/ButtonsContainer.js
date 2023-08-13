import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonsContainer(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center justify-center w-full mt-16 space-x-10">
      <button
        className="px-10 py-4 text-xl text-white capitalize rounded-lg bg-gGreen hover:bg-gGreen/70"
        onClick={() => navigate("/admin/dashboard/stats")}
      >
        View Stats
      </button>
      <button
        className="px-10 py-4 text-xl text-white capitalize rounded-lg bg-gGreen hover:bg-gGreen/70"
        onClick={() => navigate("/admin/dashboard/applications")}
      >
        View Applications
      </button>
      <button
        className="px-10 py-4 text-xl text-white capitalize rounded-lg bg-gGreen hover:bg-gGreen/70"
        onClick={() => navigate("/admin/dashboard/projects")}
      >
        View All Projects
      </button>
    </div>
  );
}

export default ButtonsContainer;
