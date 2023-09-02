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
  TASK_VIEW_REQUEST,
  TASK_VIEW_SUCCESS,
  TASK_VIEW_FAILS,
  TASK_ASSIGN_REQUEST,
  TASK_ASSIGN_SUCCESS,
  TASK_ASSIGN_FAILS,
} from "../constants/projectList.js";

import { toast } from "react-hot-toast";

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    // console.log(clientEmail);
    try {
      dispatch({ type: PROJECT_CREATED_REQUEST });
      const { data } = await axios.post(
        "http://localhost:5000/auth/createproject",
        {
          projectName,
          companyName,
          clientName,
          client: clientEmail,
          manager,
          submissionDate,
          projectPriority,
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

      toast.success("Project created..");
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

export const createTask = (formData) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  const employee = userData?.id;

  try {
    dispatch({ type: PROJECT_CREATED_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/auth/createtask",
      { formData },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch({
      type: PROJECT_CREATED_SUCCESS,
      payload: data,
    });

    toast.success("Task created..");
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
    //  console.log(data);
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

export const viewTasks = (taskId) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  try {
    dispatch({ type: TASK_VIEW_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/getTask",
      { id: taskId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(data);
    dispatch({
      type: TASK_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TASK_VIEW_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const assignTask =
  (ProjectId, taskID, type, url_id, employee) => async (dispatch) => {
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;

    try {
      dispatch({ type: TASK_ASSIGN_REQUEST });
      const { data } = await axios.post(
        "http://localhost:5000/project/assignemployee",
        {
          taskid: taskID,
          selectedOption: type,
          employee: employee,
          webtargetUrls: url_id,
          ProjectId: ProjectId,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: TASK_ASSIGN_SUCCESS,
        payload: data,
      });

      toast.success("Task assigned..");
    } catch (error) {
      dispatch({
        type: TASK_ASSIGN_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
