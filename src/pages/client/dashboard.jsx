import Sidebar from "./components/sidebar/sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../home/home.scss";
import Widget from "./components/widget/Widget";
import { useDispatch, useSelector } from "react-redux";

const ClientDashboard = () => {
  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;
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
            Weclcome ClientName
          </h1>
        </div>
        <div className="widgets w-2/5">
          <Widget type="user" />
          <Widget type="order" />
          {/* <Widget type="earning" />
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

export default ClientDashboard;
