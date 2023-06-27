import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
//Data Table
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Spinner from "../../components/spinner/spinner";
import { listProject } from "../../actions/projectlistAction";

const AllProject = () => {
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projectList);

  const { loading, error, project } = projectList;
  useEffect(() => {
    dispatch(listProject());
  }, [dispatch]);

  //console.log(employees);
  // for delete
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };
  // const employee = [];
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to="" style={{ textDecoration: "none" }}>
              <div className="approveButton">Approve</div>
            </Link>
            <Link to="" style={{ textDecoration: "none" }}>
              <div className="deleteButton">Disapprove</div>
            </Link>
          </div>
        );
      },
    },
  ];

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "firstName",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.imageUrl} alt="avatar" />
            {params.row.firstName}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },

    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <div className="datatable">
          <div className="datatableTitle">
            Employee Request
            {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
          </div>
          {loading ? (
            <Spinner />
          ) : error ? (
            { error }
          ) : (
            <DataGrid
              className="datagrid"
              rows={project}
              columns={userColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProject;
