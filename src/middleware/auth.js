import { Navigate } from "react-router-dom";

export const AuthorizedUser = ({ children }) => {
  const token = localStorage.getItem("employeeInfo");
  if (!token) {
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  return children;
};
