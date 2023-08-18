import "./widget.scss";
import React, { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Line } from "recharts";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { singleTaskView } from "../../../../actions/task";
import { infoUSer } from "../../../../actions/employeeAction";

const Widget = ({ type }) => {
  let data;
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.userInfo);
  const { loading, error, user } = projectList;
  //temporary
  //const amount = user.data.clientProject.size();
  //console.log(user.data.clientProjects.length());
  //const amount = 1;
  if (user && user.data && user.data.clientProjects) {
    var amount = user.data.clientProjects.length;
    console.log(amount);
  } else {
    console.log("clientProjects data not available");
  }
  useEffect(() => {
    dispatch(infoUSer());
  }, [dispatch]);

  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "Project",
        isMoney: false,
        link: "See all Project",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "Report",
        isMoney: false,
        link: "View all Report",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "",
        //isMoney: true,
        link: "",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <Link to="/clientProject">
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div> */}
        {/* {data.icon} */}
      </div>
    </div>
  );
};

export default Widget;
