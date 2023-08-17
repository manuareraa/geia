import React, { useState, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";

import AdminLogo from "../../assets/svg/admin-logo.svg";
import rightArrow from "../../assets/svg/right-arrow.svg";
import sampleOne from "../../assets/test/sample-one.png";
import location from "../../assets/svg/location.svg";
import ButtonsContainer from "../../components/admin/ButtonsContainer";

function Applications(props) {
  const { appData, checkForAuthentication, getAllApplications, setAppData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const renderTableData = () => {
    let tableRowElements = [];
    setTableData([]);
    appData.applications.forEach((application) => {
      if (application.status === "submitted") {
        let tableRowElement = (
          <tr className="hover" key={application.applicationID}>
            <th>#{application.applicationID}</th>
            <td>{application.body.name}</td>
            <td>
              {new Date(application.createdOn).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </td>
            <td>{application.body.location}</td>
            <td>
              <button
                className="text-white capitalize btn btn-sm bg-gGreen hover:bg-gGreen/80"
                onClick={() => {
                  setAppData((prevState) => {
                    return {
                      ...prevState,
                      applicationInView: application,
                    };
                  });
                  navigate(
                    "/admin/dashboard/applications/view/" +
                      application.applicationID
                  );
                }}
              >
                View
              </button>
            </td>
          </tr>
        );
        tableRowElements.push(tableRowElement);
        setTableData(tableRowElements);
      }
    });
  };

  const authenticateAndGetData = async () => {
    await checkForAuthentication("admin");
    await getAllApplications();
  };

  useEffect(() => {
    if (appData.applications.length > 0) {
      renderTableData();
    }
  }, [appData.applications]);

  useEffect(() => {
    authenticateAndGetData();
  }, []);

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
          <p className="text-3xl font-bold text-center">Pending Applications</p>
        </div>
        <div className="mb-2 divider"></div>

        {/* table */}
        <div className="w-full overflow-x-auto">
          {tableData.length > 0 ? (
            // applications table
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Applicant Name</th>
                  <th>Applied Date</th>
                  <th>Location</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          ) : (
            <p className="flex flex-col items-center self-center w-full mt-16 text-2xl font-bold">
              No Applications
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Applications;
