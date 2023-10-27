import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import sampleOne from "../../../assets/test/sample-one.png";

function SimilarProjects(props) {
  const { appData, setAppData } = useContext(AppContext);
  const [projectCards, setProjectCards] = useState([]);
  const navigate = useNavigate();

  const renderProjectCards = async () => {
    let tempArrayForProjectCards = [];
    setProjectCards([]);
    appData.projects.forEach((project, index) => {
      if (project.status === "live") {
        let projectCard = (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            className="w-[100%]"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="flex h-full w-full max-w-[300px] flex-col space-y-3 rounded-2xl bg-gGray p-3 shadow-lg hover:cursor-pointer lg:w-[100%]"
              onClick={() => {
                setAppData((prevState) => {
                  return {
                    ...prevState,
                    projectInView: project,
                  };
                });
                navigate("/platform/projects/view/" + project.projectId);
                window.scrollTo(0, 0);
              }}
            >
              <div className="h-48 rounded-2xl">
                <img
                  src={
                    project.metadata.coverImage
                      ? project.metadata.coverImage[0]
                      : sampleOne
                  }
                  className="object-cover w-full h-48 rounded-2xl"
                ></img>
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="px-2 text-lg font-bold">
                  {project.metadata.projectName}
                </p>
                <p className="px-2 pt-3 text-sm font-light">
                  {new Date(project.createdOn).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          </motion.div>
        );
        tempArrayForProjectCards.push(projectCard);
        setProjectCards(tempArrayForProjectCards);
      }
    });
  };

  useEffect(() => {
    if (appData.projects.length > 0) {
      renderProjectCards();
    }
  }, [appData.projects]);

  return (
    <>
      {projectCards.length > 0 ? (
        <div className="grid self-center grid-cols-1 space-y-8 w-fit lg:w-full lg:grid-cols-4 lg:gap-x-8 lg:space-y-0">
          <AnimatePresence>{projectCards}</AnimatePresence>
        </div>
      ) : (
        <div className="flex justify-center w-full ">
          <p className="p-4 px-8 text-xl font-bold rounded-lg bg-gGray">
            Projects are being onboarded. Please check back later.
          </p>
        </div>
      )}
    </>
  );
}

export default SimilarProjects;
