import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import Widget from "../../components/widget/Widget";
import { EmployeeTask } from "../../actions/employeeAction";
import { employeeDetail } from "../../actions/employeeAction";
import { useEffect } from "react";
import { someDetail } from "../../actions/employeeAction";
const Home = () => {
  const dispatch = useDispatch();
  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
  const role = employeeInfo.userRole;
  const id = employeeInfo.id;
  const employeeTask = useSelector((state) => state.employeeTask);
  const { loading, error, task } = employeeTask;
  const data = task?.datas;
  const employeeDetails = useSelector((state) => state.employeeDetails);
  const { details } = employeeDetails;
  const employee = details?.employee;
  const tproject =
    employee && employee.managerProjects && employee.managerProjects.length;
  var tcompletedproject = 0;
  const someDetails = useSelector((state) => state.someDetails);
  const { some } = someDetails;
  employee &&
    employee.managerProjects.map((project, index) => {
      if (project.isCompleted === true) {
        tcompletedproject++;
      }
    });

  useEffect(() => {
    dispatch(EmployeeTask());
    dispatch(employeeDetail(id));
    dispatch(someDetail());
  }, [dispatch]);
  var tCompleted = 0;
  data &&
    data.forEach((item) => {
      if (item.tasks.selectedOption) {
        const selectedOptionName = item.tasks.selectedOption.name;
        let isCompleted = false; // Default value

        if (selectedOptionName === "web") {
          isCompleted = item.tasks.taskid.webData.isCompleted;
          if (isCompleted) {
            tCompleted++;
          }
        } else if (selectedOptionName === "network") {
          isCompleted = item.tasks.taskid.networkData.isCompleted;
          if (isCompleted) {
            tCompleted++;
          }
        } else if (selectedOptionName === "api") {
          isCompleted = item.tasks.taskid.apiData.isCompleted;
          if (isCompleted) {
            tCompleted++;
          }
        } else if (selectedOptionName === "mobile") {
          isCompleted = item.tasks.taskid.mobileData;
          if (isCompleted) {
            tCompleted++;
          }
        } else if (selectedOptionName === "grc") {
          isCompleted = item.tasks.taskid.grcData.isCompleted;
          if (isCompleted) {
            tCompleted++;
          }
        }
      }
    });

  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const isAdmin = role === "Admin";
  const isPM = role === "Project Manager";
  const isEmployee = role === "Employee";
  const isClient = role === "Client";
  const isWatchman = role === "Watchman";

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            Welcome {employeeInfo.name}
          </h1>
        </div>
        <div className="widgets ">
          {isPM && (
            <>
              <Widget
                type="user"
                title="All Project"
                datas={tproject && tproject}
              />
              <Widget
                type="order"
                title="Completed Project"
                datas={tcompletedproject && tcompletedproject}
              />
            </>
          )}
          {isEmployee && (
            <>
              <Widget
                type="user"
                title="All Task"
                datas={data && data.length}
              />
              <Widget
                type="order"
                title="Completed Task"
                datas={tCompleted && tCompleted}
              />
            </>
          )}
          {isAdmin && (
            <>
              <Widget
                type="user"
                title="All Project"
                datas={some && some.numberOfProjects}
              />
              <Widget
                type="order"
                title="Completed Project"
                datas={some && some.numberOfCompletedProjects}
              />
              <Widget type="balance" datas={some && some.numberOfReport} />
            </>
          )}
          {isWatchman && (
            <>
              <Widget
                type="user"
                title="All Project"
                datas={some && some.numberOfProjects}
              />
              <Widget
                type="order"
                title="Completed Project"
                datas={some && some.numberOfCompletedProjects}
              />
              <Widget type="balance" datas={some && some.numberOfReport} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
