import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../AppContext";
import { motion, AnimatePresence } from "framer-motion";

import sampleOne from "../../../assets/test/sample-one.png";

function SimilarProjects(props) {
  const { appData, setAppData } = useContext(AppContext);
  const [projectCards, setProjectCards] = useState([]);

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
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="h-full flex flex-col p-3 space-y-3 shadow-lg bg-gGray rounded-2xl hover:cursor-pointer w-[300px]"
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
              <img
                src={sampleOne}
                className="object-cover w-full h-48 rounded-2xl"
              ></img>
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
        <div className="grid grid-cols-4 gap-x-8">
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
