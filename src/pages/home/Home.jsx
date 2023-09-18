import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import Widget from "../../components/widget/Widget";
import { EmployeeTask } from "../../actions/employeeAction";
import { employeeDetail } from "../../actions/employeeAction";
import { useEffect } from "react";
import { someDetail } from "../../actions/employeeAction";
import { Co2Sharp } from "@mui/icons-material";
import { useState } from "react";
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
  const [treport, setTreport] = useState(null);
  useEffect(() => {
    dispatch(EmployeeTask());
    dispatch(employeeDetail(id));
    dispatch(someDetail());
    Employeereport();
    somemoredetails();
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

  const Employeereport = async () => {
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    try {
      const response = await fetch(
        `http://localhost:5000/project/getallreportsofmanager`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setTreport(data.data.length);
      return data; // Return the fetched project data
    } catch (error) {
      console.error("Error fetching project details:", error);
      return null;
    }
  };
  const somemoredetails = async () => {
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    try {
      const response = await fetch(
        `http://localhost:5000/project/somemoredetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const data = await response.json();
      setTreport(data.numberOfReport);
      return data; // Return the fetched project data
    } catch (error) {
      console.error("Error fetching project details:", error);
      return null;
    }
  };

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
              <Widget type="balance" datas={treport} />
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
              <Widget type="balance" datas={treport} />
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
