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
  const employeeTask = useSelector((state) => state.employeeTask);
  const { loading, error, task } = employeeTask;
  const tasks = task?.tasks;
  // console.log();

  useEffect(() => {
    dispatch(EmployeeTask());
  }, [dispatch]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div></div>
        <h1>{employeeInfo && employeeInfo.name}</h1>
        <h1>{employeeInfo && employeeInfo.userRole}</h1>
        <div className="widgets ">
          <Widget type="user" datas={tasks && tasks.length} />
          <Widget type="order" datas={0} />
          <Widget type="earning" datas={0} />
          <Widget type="balance" datas={0} />
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
