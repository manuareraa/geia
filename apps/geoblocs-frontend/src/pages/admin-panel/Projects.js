import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import location from "../../assets/svg/location.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";

function AllProjects(props) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center w-full">
      {/* title container */}
      <div className="flex flex-row items-center justify-between px-32 space-x-8 pt-44">
        {/* left - title sub-container */}
        <div className="flex flex-col items-start space-y-4">
          {/* sub title */}
          <p className="font-light text-center">
            Empowering Communities, Restoring Ecosystems
          </p>
          {/* main title */}
          <p className="font- text-[80px] leading-[95px]">Admin Panel</p>
        </div>

        {/* right - logo container */}
        <img src={AdminLogo} alt="Admin Logo" className="w-[150px]"></img>
      </div>

      {/* buttons container */}
      <ButtonsContainer />

      {/* project stories container */}
      <div className="flex flex-col items-center justify-center w-full my-24 mt-20 px-52">
        {/* title */}
        <div className="flex flex-col items-start w-full my-">
          <p className="text-3xl font-bold text-center">All Projects</p>
        </div>
        <div className="mb-2 divider"></div>
        {/* table */}
        <div className="w-full overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Project ID</th>
                <th>Project Name</th>
                <th>Created Date</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <th>#CDU-156-885</th>
                <td>Cy Ganderton</td>
                <td>12th June 2023</td>
                <td>Ireland</td>
                <td>
                  <button
                    className="text-white capitalize btn btn-sm bg-gGreen hover:bg-gGreen/80"
                    onClick={() => {
                      navigate("/admin/dashboard/projects/view/CDU-156-885");
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllProjects;
