import React from "react";
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
  getKeyValue,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

// import { projects } from "./data-browse-projects/data";
const projects = [];
import editIcon from "../../assets/icons-svg/edit.svg";
import deleteIcon from "../../assets/icons-svg/delete.svg";

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const columns = [
  { name: "PROJECT NAME", uid: "projectName" },
  { name: "LOCATION", uid: "location" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export default function BrowseProjectsTable(props) {
  const navigate = useNavigate();
  const renderCell = React.useCallback((project, columnKey) => {
    const cellValue = project[columnKey];

    switch (columnKey) {
      case "projectName":
        return (
          <User
            avatarProps={{ radius: "lg", src: project.avatar }}
            description={project.id}
            name={cellValue}
          >
            {project.name}
          </User>
        );
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-sm capitalize text-bold">{project.country}</p>
            <p className="text-sm capitalize text-bold text-default-400">
              {cellValue}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[project.status]}
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
                    navigate(`/dashboard/projects/view/${project.id}`);
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
  }, []);

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
      {projects.length > 0 ? (
        <TableBody items={projects}>
          {(item) => (
            <TableRow key={item.id}>
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
