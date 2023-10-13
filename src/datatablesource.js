import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function RoleCellRenderer(props) {
  var { value, api, id, field } = props;
  const [editing, setEditing] = useState(false);
  const [selectedRole, setSelectedRole] = useState(value);

  const handleRoleClick = () => {
    setEditing(true);
  };

  const handleRoleChange = (event) => {
    const newRole = event.target.value;
    setSelectedRole(newRole);
    updateRole(id, newRole);
    setEditing(false);
    api.setCellValue(id, field, newRole);
  };

  return (
    <div onClick={handleRoleClick}>
      {editing ? (
        <Select
          className="p-2 bg-yellow-400 text-white  rounded-md "
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <MenuItem value="Employee">Employee</MenuItem>
          <MenuItem value="Project Manager">Project Manager</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Select>
      ) : (
        <span className="role  p-2 bg-yellow-400 text-white  rounded-md ">
          {value}
          <svg
            class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-hfutr2-MuiSvgIcon-root-MuiSelect-icon"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="ArrowDropDownIcon"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </span>
      )}
    </div>
  );
}

const updateRole = (id, role) => {
  fetch(`http://localhost:5000/user/role`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role: role, id: id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Status updated successfully:", data);
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
};

const updateStatus = (id, newStatus) => {
  fetch(`http://localhost:5000/user/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus, id: id }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Status updated successfully:", data);
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
};

function StatusCellRenderer(props) {
  const { value, api, id, field } = props;
  const [status, setStatus] = useState(value);

  const handleStatusToggle = () => {
    const newStatus = !status;
    setStatus(newStatus);
    console.log(newStatus);
    updateStatus(id, newStatus);
    api.setCellValue(id, field, newStatus);
  };

  const buttonColor = status ? "rgb(56, 219, 81)" : "crimson";
  return (
    <div style={{ padding: "5px" }}>
      <button
        className="statusBtn"
        onClick={handleStatusToggle}
        style={{
          backgroundColor: buttonColor,
          color: "white",
          border: "none",
          padding: "5px 10px",
        }}
      >
        {status ? "Active" : "Deactivate"}
      </button>
    </div>
  );
}
export const userColumns = [
  { field: "userId", headerName: "Employee Id", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },

  {
    field: "phone",
    headerName: "phone",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 120,
  },

  // {
  //   field: "role",
  //   headerName: "Role",
  //   width: 200,
  //   renderCell: RoleCellRenderer,
  // },
  {
    field: "role",
    headerName: "Role",
    width: 200,
    // renderCell: RoleCellRenderer,
  },
  {
    field: "isVerified",
    headerName: "Email Verified",
    width: 200,
    renderCell: (params) => {
      const isVerified = params.value;
      return isVerified ? "Yes" : "No";
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: StatusCellRenderer,
  },
];
