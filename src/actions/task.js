import axios from "axios";
import {
  SINGLE_TASK_FAILS,
  SINGLE_TASK_SUCCESS,
  SINGLE_TASK_REQUEST,
} from "../constants/task";

export const singleTaskView = (projectId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  try {
    dispatch({ type: SINGLE_TASK_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/gettaskbyproject",
      { project: projectId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({
      type: SINGLE_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_TASK_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
