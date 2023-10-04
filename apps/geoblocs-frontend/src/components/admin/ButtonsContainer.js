import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function ButtonsContainer(props) {
  const { setAppData, logoutUser } = useContext(AppContext);
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
      <button
        className="px-10 py-4 text-xl text-white capitalize rounded-lg bg-gGreen hover:bg-gGreen/70"
        onClick={() => {
          navigate("/admin/create-new-project")
        }}
      >
        Create New Project
      </button>
      <button
        className="px-10 py-4 text-xl text-white capitalize rounded-lg bg-gGreen hover:bg-gGreen/70"
        onClick={() => {
          logoutUser();
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ButtonsContainer;
