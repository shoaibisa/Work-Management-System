import {
  PROJECT_LIST_FAILS,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
} from "../constants/projectList.js";

import axios from "axios";

const API_URL =
  "https://hub.dummyapis.com/employee?noofRecords=20&idStarts=1001";
export const listProject = () => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_LIST_REQUEST });
    const { data } = await axios.get(API_URL);
    console.log(data);
    dispatch({
      type: PROJECT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
