import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import PageOuterContainer from "../../components/reuse/PageOuterContainer";
import PageHeader from "../../components/reuse/PageHeader";

function ProjectView(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

  return (
    <PageOuterContainer>
      <PageHeader title="Project View" />
      <p>Project ID: {projectId}</p>
    </PageOuterContainer>
  );
}

export default ProjectView;
