import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { alluser } from "../../actions/employeeAction";
import Spinner from "../spinner/spinner";

const Datatable = () => {
  const dispatch = useDispatch();
  const userlist = useSelector((state) => state.userlist);
  const { loading, error, user } = userlist;
  useEffect(() => {
    dispatch(alluser());
  }, [dispatch]);
  //const data = employees.employees && employees.employees;

  const data = user.employees || [];

  return (
    <div className="datatable">
      <div className="datatableTitle">All Employees</div>
      {loading ? (
        <Spinner />
      ) : error ? (
        { error }
      ) : (
        <DataGrid
          // localeText={{
          //   toolbarDensity: "Size",
          //   toolbarDensityLabel: "Size",
          //   toolbarDensityCompact: "Small",
          //   toolbarDensityStandard: "Medium",
          //   toolbarDensityComfortable: "Large",
          // }}
          className="datagrid  w-[85vw] "
          rows={data}
          columns={userColumns}
          pageSize={9}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[9]}
        />
      )}
    </div>
  );
};

export default Datatable;
