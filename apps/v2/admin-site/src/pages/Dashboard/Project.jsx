import React from "react";
import PageHeader from "../../components/reuse/PageHeader";
import BrowseProjectsTable from "../../components/others/BrowseProjectsTable";
import PageOuterContainer from "../../components/reuse/PageOuterContainer";

function Project(props) {
  return (
    <PageOuterContainer>
      {/* header */}
      <PageHeader title="Browse Projects" />
      {/* content */}
      <BrowseProjectsTable />
    </PageOuterContainer>
  );
}

export default Project;
