import { Navigate } from "react-router-dom";

export const AuthorizedAdmin = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  } else if (role !== "admin") {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const AuthorizedPM = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  } else if (role !== "Project Manager") {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};

export const AuthorizedUser = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};
