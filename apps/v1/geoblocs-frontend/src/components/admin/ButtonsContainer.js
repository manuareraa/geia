import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

function ButtonsContainer(props) {
  const { setAppData, logoutUser } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className="grid items-center justify-center grid-cols-1 px-16 mt-4 lg:grid-cols-3 md:grid-cols-2 gap-y-4 gap-x-8 md:flex-row md:mt-16 md: lg:">
      <button
        className="w-full h-full px-4 py-2 text-sm text-white capitalize rounded-lg md:w-auto md:px-10 md:py-4 md:text-xl bg-gGreen hover:bg-gGreen/70"
        onClick={() => navigate("/admin/dashboard/stats")}
      >
        View Stats
      </button>
      <button
        className="w-full h-full px-4 py-2 text-sm text-white capitalize rounded-lg md:w-auto md:px-10 md:py-4 md:text-xl bg-gGreen hover:bg-gGreen/70"
        onClick={() => navigate("/admin/dashboard/applications")}
      >
        View Applications
      </button>
      <button
        className="w-full h-full px-4 py-2 text-sm text-white capitalize rounded-lg md:w-auto md:px-10 md:py-4 md:text-xl bg-gGreen hover:bg-gGreen/70"
        onClick={() => navigate("/admin/dashboard/projects")}
      >
        View All Projects
      </button>
      <button
        className="w-full h-full px-4 py-2 text-sm text-white capitalize rounded-lg md:w-auto md:px-10 md:py-4 md:text-xl bg-gGreen hover:bg-gGreen/70"
        onClick={() => {
          navigate("/admin/create-new-project");
        }}
      >
        Create New Project
      </button>
      <button
        className="w-full h-full px-4 py-2 text-sm text-white capitalize rounded-lg md:w-auto md:px-10 md:py-4 md:text-xl bg-gGreen hover:bg-gGreen/70"
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
