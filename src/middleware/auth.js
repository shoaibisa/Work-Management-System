import { Navigate } from "react-router-dom";

export const AuthorizedAdmin = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  } else if (role !== "Admin") {
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
export const AuthorizedClient = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  } else if (role !== "Client") {
    return <Navigate to={"/"} replace={true}></Navigate>;
  }
  return children;
};
export const AuthorizedWatchMan = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  } else if (role !== "Watchman") {
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
