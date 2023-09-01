import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/employeeAction";

import {
  notifiactionAll,
  notificationSee,
} from "../../actions/notificationAction";
import { Link } from "react-router-dom";
import { useEffect } from "react";
const Navbar = () => {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotificationPopup = () => {
    setShowNotifications(!showNotifications);
  };

  const employeeLogin = useSelector((state) => state.employeeLogin);
  const { employeeInfo } = employeeLogin;

  const AllNotification = useSelector((state) => state.allNotification);
  const { notification } = AllNotification;

  const seeNotifications = useSelector((state) => state.seeNotifications);
  const { seeNotification } = seeNotifications;

  const unreadNotifications =
    notification?.data?.filter((item) => !item.isRead) || [];
  const unreadCount = unreadNotifications.length;

  useEffect(() => {
    dispatch(notifiactionAll());
  }, [dispatch]);
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  }

  const { dispatchs } = useContext(DarkModeContext);
  const markNotificationAsRead = async (notificationId) => {
    dispatch(notificationSee(notificationId));
    const matchingNotification = notification.data.find(
      (notification) => notification._id === notificationId
    );

    // Check if a matching notification was found
    if (matchingNotification) {
      // Access the notification's link and redirect to it
      window.location.href = `http://localhost:3000${matchingNotification.link}`;
    }
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatchs({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">{unreadCount}</div>
          </div> */}
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item" onClick={toggleNotificationPopup}>
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">{unreadCount}</div>
          </div>

          {showNotifications && notification && notification.data && (
            <div className="notification-popup">
              {notification.data.some(
                (notification) => !notification.isRead
              ) ? (
                notification.data.map(
                  (notification) =>
                    !notification.isRead && (
                      <button
                        key={notification._id}
                        onClick={() => markNotificationAsRead(notification._id)}
                      >
                        <div className="notification-item">
                          <NotificationsNoneOutlinedIcon className="icon" />
                          <div className="notification-text">
                            {notification.notification}
                          </div>
                          <div className="notification-time">
                            {formatDate(notification.createdAt)}
                          </div>
                        </div>
                      </button>
                    )
                )
              ) : (
                <div className="no-notifications-message">
                  No new notifications.
                </div>
              )}
            </div>
          )}

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
            {employeeInfo ? (
              <Link to="/profile" className=" ml-2">
                {employeeInfo.name}
              </Link>
            ) : (
              <Link to="/login" className=" ml-2">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
