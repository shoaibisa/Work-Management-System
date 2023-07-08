import {
  PROJECT_LIST_FAILS,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_CREATED_FAILS,
  PROJECT_CREATED_REQUEST,
  PROJECT_CREATED_SUCCESS,
} from "../constants/projectList.js";

import axios from "axios";

export const createProject =
  (
    projectName,
    selectedOptions,
    webData,
    apiData,
    networkData,
    mobileData,
    grcData,
    submissionDate,
    projectPriority
  ) =>
  async (dispatch) => {
    //console.log(password);
    try {
      dispatch({ type: PROJECT_CREATED_REQUEST });
      const { data } = await axios.post(
        "http://localhost:5000/auth/createproject",
        {
          projectName,
          selectedOptions,
          webData,
          apiData,
          networkData,
          mobileData,
          grcData,
          submissionDate,
          projectPriority,
        }
      );
      dispatch({
        type: PROJECT_CREATED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_CREATED_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

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
