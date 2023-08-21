import axios from "axios";
import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILS,
  SEE_NOTIFICATION_REQUEST,
  SEE_NOTIFICATION_SUCCESS,
  SEE_NOTIFICATION_FAILS,
} from "../constants/notifiaction";
export const notifiactionAll = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  const id = userData?.id;

  try {
    dispatch({ type: NOTIFICATION_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/getnotifications",
      { employeeId: id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({
      type: NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NOTIFICATION_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const notificationSee = (notificationId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  try {
    dispatch({ type: SEE_NOTIFICATION_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/actionnotification",
      { notificationId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({
      type: SEE_NOTIFICATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEE_NOTIFICATION_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
