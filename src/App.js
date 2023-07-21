import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Employee from "./pages/list/employee";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Signup from "./pages/signup/signup";
import Error from "./pages/error/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import AllProject from "./Views/Admin/AllProject.jsx";
import Createproject from "./pages/createProject/Createproject";
import CreateTask from "./pages/createProject/createTask";
import Taskassign from "./pages/taskassign/Taskassign";
import Projectlist from "./pages/projectList/Projectlist";
import Viewproject from "./pages/viewProject/Viewproject";
import Reportsubmit from "./pages/reportsubmit/reportsubmit";
import CreateTask1 from "./pages/createProject/createTask1";

import { AuthorizedUser, AuthorizedAdmin } from "./middleware/auth";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/">
            <Route
              index
              element={
                <AuthorizedUser>
                  <Home />
                </AuthorizedUser>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthorizedUser>
                  <Single />
                </AuthorizedUser>
              }
            />
            <Route
              path="/allproject"
              element={
                <AuthorizedUser>
                  <AllProject />
                </AuthorizedUser>
              }
            />
            <Route
              path="/createproject"
              element={
                <AuthorizedUser>
                  <Createproject />
                </AuthorizedUser>
              }
            />
            <Route
              path="/viewproject/:projectId/:createtask"
              element={
                <AuthorizedUser>
                  <CreateTask />
                </AuthorizedUser>
              }
            />

            <Route path="employee">
              <Route
                index
                element={
                  <AuthorizedAdmin>
                    <Employee />
                  </AuthorizedAdmin>
                }
              />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              {/* <Route index element={<List />} /> */}
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          <Route
            path="/taskassign"
            element={
              <AuthorizedUser>
                <Taskassign />
              </AuthorizedUser>
            }
          />
          <Route path="/projectlist" element={<Projectlist />} />
          {/* <Route path="/viewproject" element={<Viewproject />} /> */}
          <Route path="/viewproject/:projectId" element={<Viewproject />} />
          <Route path="/createtask1" element={<CreateTask1 />} />
          <Route
            path="/viewproject/:projectId/createtask"
            element={<Viewproject />}
          />
          <Route path="/reportsubmit" element={<Reportsubmit />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
