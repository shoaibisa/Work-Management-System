import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import Widget from "../../components/widget/Widget";
import { EmployeeTask } from "../../actions/employeeAction";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch();

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
  const role = employeeInfo.userRole;
  const employeeTask = useSelector((state) => state.employeeTask);
  const { loading, error, task } = employeeTask;
  const data = task?.datas;
  // console.log(data);
  useEffect(() => {
    dispatch(EmployeeTask());
  }, [dispatch]);
  const countBySelectedOption = {};
  var tCompleted = 0;
  data &&
    data.forEach((item) => {
      if (item.selectedOption && item.taskid) {
        const selectedOptionName = item.selectedOption.name;
        const isCompleted = item.taskid.isCompleted === true;
        if (isCompleted) {
          tCompleted++;
        }
        if (!countBySelectedOption[selectedOptionName]) {
          countBySelectedOption[selectedOptionName] = {
            total: 0,
            completed: 0,
          };
        }

        // Increment the total count for the selectedOption
        countBySelectedOption[selectedOptionName].total++;

        // If isCompleted is true, increment the completed count for the selectedOption
        if (isCompleted) {
          countBySelectedOption[selectedOptionName].completed++;
        }
      }
    });

  console.log(countBySelectedOption);

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
            {" "}
            Welcome {employeeInfo.name}
          </h1>
        </div>
        <div className="widgets ">
          <Widget type="user" datas={data && data.length} />
          <Widget type="order" datas={tCompleted && tCompleted} />
          <Widget type="earning" datas={0} />
          <Widget type="balance" datas={0} />
        </div>
      </div>
    </div>
  );
};

export default Home;
