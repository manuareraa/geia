import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

import editIcon from "../../assets/icons-svg/edit.svg";
import deleteIcon from "../../assets/icons-svg/delete.svg";

import {
  useProjectStore,
  formatDate,
  calculateTimeDifference,
} from "../../state-management/AppState";

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const columns = [
  { name: "PROJECT NAME", uid: "projectName" },
  { name: "CREATED ON", uid: "createdAt" },
  { name: "LOCATION", uid: "location" },
  { name: "STATUS", uid: "projectStatus" },
  { name: "ACTIONS", uid: "actions" },
];

export default function BrowseProjectsTable(props) {
  const navigate = useNavigate();
  const { projectSummaries, fetchAllProjects } = useProjectStore();

  useEffect(() => {
    if (projectSummaries.length === 0) {
      fetchAllProjects();
    }
    // }, [projectSummaries, fetchAllProjects]);
  }, []);

  const renderCell = React.useCallback(
    (project, columnKey) => {
      const cellValue = project[columnKey];

      switch (columnKey) {
        case "projectName":
          return (
            <User
              avatarProps={{ radius: "lg", src: project.metaImages?.logo }}
              description={project.projectId}
              name={cellValue}
            >
              {project.projectName}
            </User>
          );

        case "createdAt":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold">
                {formatDate(cellValue)}
              </p>
              <p className="text-sm capitalize text-bold text-default-400">
                {calculateTimeDifference(cellValue)}
              </p>
            </div>
          );
        case "location":
          return (
            <div className="flex flex-col">
              <p className="text-sm capitalize text-bold">
                {project.metadata.country}
              </p>
              <p className="text-sm capitalize text-bold text-default-400">
                {project.metadata.address}
              </p>
            </div>
          );
        case "projectStatus":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[project.projectStatus]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {/* <Tooltip content="Edit Project">
              <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                <img src={editIcon} alt="edit" />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete Project">
              <span className="text-lg cursor-pointer text-danger active:opacity-50">
                <img src={deleteIcon} alt="delete" />
              </span>
            </Tooltip> */}
              <Tooltip content="Go to Project Page">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <Button
                    size="small"
                    auto
                    onPress={() => {
                      console.log("Go to project page");
                      navigate(`/dashboard/projects/view/${project.projectId}`);
                    }}
                  >
                    View
                  </Button>
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [navigate]
  );

  return (
    <Table aria-label="Example table with custom cells" isStriped>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      {projectSummaries.length > 0 ? (
        <TableBody items={projectSummaries}>
          {(item) => (
            <TableRow key={item.projectId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={"Projects are being onboarded."}>
          {[]}
        </TableBody>
      )}
    </Table>
  );
}
