/* eslint-disable jsx-a11y/anchor-is-valid */
import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/employeeAction";
import { Task } from "@mui/icons-material";
const Sidebar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const { dispatchs } = useContext(DarkModeContext);
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const role = userData?.userRole;
  const isAdmin = role === "admin";
  const isPM = role === "Project Manager";
  const isEmployee = role === "Employee";

  return (
    <div className="sidebar  ">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">PMS</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>

          {isAdmin && (
            <>
              <p className="title">Employee</p>
              <Link to="/employee" style={{ textDecoration: "none" }}>
                <li>
                  <PersonOutlineIcon className="icon" />
                  <span>Employee Request</span>
                </li>
              </Link>
            </>
          )}
          {isPM && (
            <>
              <p className="title bg-transparent">Project</p>
              <li className="dropdown">
                <Menu
                  as="div"
                  className="relative display:inline  bg-transparent  text-left"
                >
                  <div>
                    <Menu.Button className="flex max-w-[150px] bg-transparent justify-around border-none outline-none w-full justify-center gap-x-1.5 rounded-md   text-sm font-semibold text-gray-900   ">
                      <PersonOutlineIcon className="icon" />
                      <span>Project</span>
                      <span>
                        <ChevronDownIcon
                          className="-mr-1 ml-10 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className=" menu-item bg-transparent relative  right-0 z-10  origin-top-right divide-y divide-gray-100 rounded-md  ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Link
                              to="/createproject"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Create Project
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            // eslint-disable-next-line jsx-a11y/anchor-is-valid
                            <Link
                              to="/projectlist"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Project List
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </>
          )}
          {isEmployee && (
            <>
              <p className="title">Tasks</p>
              <Link to="/alltasks" style={{ textDecoration: "none" }}>
                <li>
                  <Task className="icon" />
                  <span>Tasks</span>
                </li>
              </Link>
            </>
          )}

          {/* <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li> */}
          {/* <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p> */}
          {/* <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li> */}
          {/* <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          {/* <p className="title">SERVICE</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <li>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </Link>
          </li>
          <li onClick={logoutHandler}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatchs({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatchs({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
