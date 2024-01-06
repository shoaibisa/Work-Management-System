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
import Reportsubmit from "./pages/employee/reportsubmit/reportsubmit.jsx";
import Viewtask from "./pages/taskview/viewTask.jsx";
import DetailedViewtask from "./pages/taskview/detailedTask";
import ClientProjectlist from "./pages/client/pages/allproject";
import ClientProjectView from "./pages/client/pages/projectdetail";
import EmployeeTasksList from "./pages/employee/allTasks";
import EmployeeTaskview from "./pages/employee/Taskview";
import PDF from "./pages/employee/reportsubmit/reportView";
import TaskviewUser from "./pages/projectManager/singleTask";
import AllPDF from "./pages/employee/reportsubmit/viewAllReports";
import AllReportPDF from "./pages/projectManager/allReportbyUser";
import ClientTasklist from "./pages/client/pages/alltask";
import AllReportForClient from "./pages/client/pages/allReportClient";
import { Toaster } from "react-hot-toast";
import {
  AuthorizedUser,
  AuthorizedAdmin,
  AuthorizedPM,
  AuthorizedClient,
  AuthorizedWatchMan,
} from "./middleware/auth";
import EditReportsubmit from "./pages/employee/reportsubmit/editreport";
import ViewprojectManagerList from "./pages/watchman/projectmanagerList";
import ViewEmployeeList from "./pages/watchman/employeelist";
import ViewClientList from "./pages/watchman/clientList";
import WMProjectlist from "./pages/watchman/projectmanager/allprojectlist";
import WMEmployeeTasksList from "./pages/watchman/employee/alltask";
import WMClientProjectlist from "./pages/watchman/client/allproject";
import ForgotPassword from "./pages/RenamePassword/ForgotPassword";
import ResetPassword from "./pages/RenamePassword/ResetPassword";
import PdfView from "./pages/pdfView";
import ShowPdf from "./pages/pdf/ShowPdf";
import CreateTemplate from "./pages/client/pages/CreateTemplate.jsx";
import AllClients from "./pages/client/pages/AllClients.jsx";
import Clientdetails from "./pages/admin/Clientdetails.jsx";
import RequestedProject from "./pages/projectManager/requestedProject.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/auth/resetpassword/:userid/:token"
            element={<ResetPassword />}
          />
          <Route path="/pdf" element={<PdfView />} />
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
            {/* <Route
              path="/createproject"
              element={
                <AuthorizedPM>
                  <Createproject />
                </AuthorizedPM>
              }
            /> */}
            <Route
              path="/createproject/:mid/:rid"
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
            path="/createtemplate/:userId"
            element={
              <AuthorizedUser>
                <CreateTemplate />
              </AuthorizedUser>
            }
          />{" "}
          <Route
            path="/clientprojects/:clientId"
            element={
              <AuthorizedUser>
                <Clientdetails />
              </AuthorizedUser>
            }
          />
          <Route
            path="/clients"
            element={
              <AuthorizedUser>
                <AllClients />
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
            element={
              <AuthorizedPM>
                <Taskassign />
              </AuthorizedPM>
            }
          />
          <Route
            path="/viewproject/:projectId/viewtask/:taskID/:type/assignsingle"
            element={
              <AuthorizedPM>
                <Taskassign />
              </AuthorizedPM>
            }
          />
          <Route
            path="/reportsubmit/:taskID/:type/:webtargetUrlsId"
            element={
              <AuthorizedUser>
                <Reportsubmit />
              </AuthorizedUser>
            }
          />
          <Route
            path="/clientProject"
            element={
              <AuthorizedClient>
                <ClientProjectlist />
              </AuthorizedClient>
            }
          />
          <Route
            path="/clienttasks/:projectId"
            element={
              <AuthorizedClient>
                <ClientTasklist />
              </AuthorizedClient>
            }
          />
          <Route
            path="/allreportforclient/:taskId/:Type/:webtargetUrls"
            element={
              <AuthorizedClient>
                <AllReportForClient />
              </AuthorizedClient>
            }
          />
          <Route
            path="/allreportforclient/:taskId/:Type/"
            element={
              <AuthorizedClient>
                <AllReportForClient />
              </AuthorizedClient>
            }
          />
          <Route
            path="/clientprojectview/:projectId/:taskId"
            element={
              <AuthorizedClient>
                <ClientProjectView />
              </AuthorizedClient>
            }
          />
          <Route
            path="/alltasks"
            element={
              <AuthorizedUser>
                <EmployeeTasksList />
              </AuthorizedUser>
            }
          />
          <Route
            path="/taskview/:id/:type/:webtargetUrls"
            element={
              <AuthorizedUser>
                <EmployeeTaskview />
              </AuthorizedUser>
            }
          />
          <Route
            path="/singlereportview/:id/:type/:webtargetUrls/:userid"
            element={
              <AuthorizedUser>
                <TaskviewUser />
              </AuthorizedUser>
            }
          />
          <Route
            path="/singlereportview/:id/:type/:userid"
            element={
              <AuthorizedUser>
                <TaskviewUser />
              </AuthorizedUser>
            }
          />
          <Route
            path="/pdf/:id"
            element={
              <AuthorizedUser>
                <PDF />
              </AuthorizedUser>
            }
          />
          <Route
            path="/showpdf/:id"
            element={
              <AuthorizedUser>
                <ShowPdf />
              </AuthorizedUser>
            }
          />
          <Route
            path="/allpdf/:id"
            element={
              <AuthorizedUser>
                <AllPDF />
              </AuthorizedUser>
            }
          />
          <Route
            // path="/allreportbyuser/:id/:type/:userId/:"
            path="/allreportbyuser/:id/:type/:userid/:webtargetUrls"
            element={
              <AuthorizedUser>
                <AllReportPDF />
              </AuthorizedUser>
            }
          />
          <Route
            path="/editreport/:id"
            element={
              <AuthorizedUser>
                <EditReportsubmit />
              </AuthorizedUser>
            }
          />
          <Route
            path="/projectmanagerlist"
            element={
              <AuthorizedWatchMan>
                <ViewprojectManagerList />
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/clientlist"
            element={
              <AuthorizedWatchMan>
                <ViewClientList />{" "}
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/employeelist"
            element={
              <AuthorizedWatchMan>
                <ViewEmployeeList />
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/wmprojectlist/:id"
            element={
              <AuthorizedWatchMan>
                <WMProjectlist />
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/wmtasklist/:id"
            element={
              <AuthorizedWatchMan>
                <WMEmployeeTasksList />
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/wmtasklist/:id"
            element={
              <AuthorizedWatchMan>
                <WMEmployeeTasksList />
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/wmclient/:id"
            element={
              <AuthorizedWatchMan>
                <WMClientProjectlist />
              </AuthorizedWatchMan>
            }
          />
          <Route
            path="/requsetedProject"
            element={
              <AuthorizedPM>
                <RequestedProject />
              </AuthorizedPM>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
