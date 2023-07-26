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
import Projectlist from "./pages/projectList/projectlist";
import Viewproject from "./pages/viewProject/Viewproject";
import Reportsubmit from "./pages/reportsubmit/reportsubmit.jsx";
import Viewtask from "./pages/taskview/viewTask.jsx";
import DetailedViewtask from "./pages/taskview/detailedTask";
import ClientDashboard from "./pages/client/dashboard";
import ClientProjectlist from "./pages/client/pages/allproject";
import ClientProjectView from "./pages/client/pages/projectdetail";
import {
  AuthorizedUser,
  AuthorizedAdmin,
  AuthorizedPM,
} from "./middleware/auth";
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
                <AuthorizedPM>
                  <AllProject />
                </AuthorizedPM>
              }
            />
            <Route
              path="/createproject"
              element={
                <AuthorizedPM>
                  <Createproject />
                </AuthorizedPM>
              }
            />
            <Route
              path="/viewproject/:projectId/:createtask"
              element={
                <AuthorizedPM>
                  <CreateTask />
                </AuthorizedPM>
              }
            />

            <Route path="/employee">
              <Route
                index
                element={
                  <AuthorizedAdmin>
                    <Employee />
                  </AuthorizedAdmin>
                }
              />
              <Route
                path=":userId"
                element={
                  <AuthorizedUser>
                    <Single />
                  </AuthorizedUser>
                }
              />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              {/* <Route index element={<List />} /> */}
              <Route
                path=":productId"
                element={
                  <AuthorizedUser>
                    <Single />
                  </AuthorizedUser>
                }
              />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
          <Route
            path="/taskassign"
            element={
              <AuthorizedPM>
                <Taskassign />
              </AuthorizedPM>
            }
          />
          <Route
            path="/projectlist"
            element={
              <AuthorizedPM>
                <Projectlist />
              </AuthorizedPM>
            }
          />
          <Route
            path="/viewproject/:projectId"
            element={
              <AuthorizedUser>
                <Viewproject />
              </AuthorizedUser>
            }
          />

          <Route
            path="/viewproject/:projectId/createtask"
            element={<Viewproject />}
          />
          <Route
            path="/viewproject/:projectId/viewtask/:taskID"
            element={<Viewtask />}
          />
          <Route
            path="/viewproject/:projectId/viewtask/:taskID/detailedtask/:type"
            element={<DetailedViewtask />}
          />

          <Route
            path="/viewproject/:projectId/viewtask/:taskID/assign/:type/webtargetUrlsId/:url_id"
            element={<Taskassign />}
          />
          <Route
            path="/viewproject/:projectId/viewtask/:taskID/:type/assignsingle"
            element={<Taskassign />}
          />

          {/* <Route path="/createtask" element={<CreateTask1 />} /> */}
          {/* <Route path="/reportsubmit" element={<Reportsubmit />} />
          <Route path="/viewtask" element={<Taskview />} />
          <Route path="/clentdashboard" element={<ClientDashboard />} />
          <Route path="/clientProject" element={<ClientProjectlist />} />
          <Route path="/clientprojectview" element={<ClientProjectView />} /> */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
