import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useDispatch, useSelector } from "react-redux";
import Widget from "../client/components/widget/Widget";
import { EmployeeTask } from "../../actions/employeeAction";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch();

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
  const employeeTask = useSelector((state) => state.employeeTask);
  const { loading, error, task } = employeeTask;

  useEffect(() => {
    dispatch(EmployeeTask());
  }, [dispatch]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div></div>
        <div className="widgets">
          <h1>{employeeInfo && employeeInfo.name}</h1>
          <h1>{employeeInfo && employeeInfo.userRole}</h1>

          {/* <Widget type="user" /> */}
          {/* <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" /> */}
        </div>
        {/* <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
