import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };
    if (path === newSortColumn.path) {
      newSortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    let icon = faSortDown;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") icon = faSortUp;
    return <FontAwesomeIcon icon={icon} />;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.label || column.key}
            onClick={() => raiseSort(column.path)}
            className="clickable"
          >
            {column.label}
            <span> </span>
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
