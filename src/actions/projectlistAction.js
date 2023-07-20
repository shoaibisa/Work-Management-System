import {
  PROJECT_LIST_FAILS,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_CREATED_FAILS,
  PROJECT_CREATED_REQUEST,
  PROJECT_CREATED_SUCCESS,
  PROJECT_DETAILS_FAILS,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
} from "../constants/projectList.js";

import axios from "axios";

export const createProject =
  (
    projectName,
    companyName,
    clientName,
    clientEmail,
    manager,
    submissionDate,
    projectPriority
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PROJECT_CREATED_REQUEST });
      const { data } = await axios.post(
        "http://localhost:5000/auth/createproject",
        {
          projectName,
          companyName,
          clientName,
          clientEmail,
          manager,
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
export const createTask =
  (
    selectedOptions,
    webData,
    apiData,
    networkData,
    mobileData,
    grcData,
    project
  ) =>
  async (dispatch) => {
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    console.log(apiData);
    try {
      dispatch({ type: PROJECT_CREATED_REQUEST });
      const { data } = await axios.post(
        "http://localhost:5000/auth/createtask",
        {
          selectedOptions,
          webData,
          apiData,
          networkData,
          mobileData,
          grcData,
          project,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
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

export const viewProject = (projectId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  console.log(projectId);
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/getbyid",
      { id: projectId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data);
    dispatch({
      type: PROJECT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listProject = () => async (dispatch) => {
  //onst config = { headers: { "Contnet-Type": "application/json" } };
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  try {
    dispatch({ type: PROJECT_LIST_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/all",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
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
