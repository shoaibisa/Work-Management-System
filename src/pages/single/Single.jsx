import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { infoUSer } from "../../actions/employeeAction";
const Single = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { user } = userInfo;
  const { data } = user;
  useEffect(() => {
    dispatch(infoUSer());
  }, [dispatch]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data && data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data && data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data && data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{data && data.role}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Department:</span>
                  <span className="itemValue">{data && data.department}</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div> */}
      </div>
    </div>
  );
};

export default Single;
