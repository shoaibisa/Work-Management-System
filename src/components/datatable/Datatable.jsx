import "./datatable.scss";
import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { userColumns } from "../../data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { listEmployee } from "../../actions/employeeAction";
import { userRows } from "../../employessdata";
import Spinner from "../spinner/spinner";

const Datatable = () => {
  // const dispatch = useDispatch();
  // const employeeList = useSelector((state) => state.employeeList);
  // const { loading, error, employees } = employeeList;
  // useEffect(() => {
  //   dispatch(listEmployee());
  // }, [dispatch]);

  // for delete
  // const handleDelete = (id) => {
  //   setData(data.filter((item) => item.id !== id));
  // };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/users/test" style={{ textDecoration: "none" }}> */}
            <div className="viewButton">View</div>
            {/* </Link> */}
            {/* <Link to="" style={{ textDecoration: "none" }}>
              <div className="approveButton">Approve</div>
            </Link>
            <Link to="" style={{ textDecoration: "none" }}>
              <div className="deleteButton">Disapprove</div>
            </Link> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">All Employee</div>
      {/* {loading ? (
        <Spinner />
      ) : error ? (
        { error }
      ) : ( */}
      <DataGrid
        className="datagrid"
        rows={userRows}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        // getRowId={(row) => row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {/* )} */}
    </div>
  );
};

export default Datatable;
