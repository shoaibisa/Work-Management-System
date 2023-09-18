import {
  EMPLOYEE_LIST_FAILS,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_REGISTER_REQUEST,
  EMPLOYEE_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_FAIL,
  EMPLOYEE_LOGIN_REQUEST,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGOUT,
  EMPLOYEE_TASK_DETAILS_REQUEST,
  EMPLOYEE_TASK_DETAILS_SUCCESS,
  EMPLOYEE_TASK_DETAILS_FAILS,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  EMPLOYEE_DETAILS_FAILS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILS,
  SOMEDETAILS_REQUEST,
  SOMEDETAILS_SUCCESS,
  SOMEDETAILS_FAILS,
} from "../constants/employee";

import axios from "axios";
import { toast } from "react-hot-toast";

//Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("employeeInfo");
  toast.success("Logged out...");
  dispatch({
    type: EMPLOYEE_LOGOUT,
  });
};

//Register
export const register =
  (name, email, password, phone, selectedDepartment, selectedrole, profile) =>
  async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_REGISTER_REQUEST });
      const config = { headers: { "Contnet-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:5000/auth/sign-up",
        {
          name,
          email,
          password,
          phone,
          selectedDepartment,
          role: selectedrole,
          profile,
        },
        config
      );

      dispatch({
        type: EMPLOYEE_REGISTER_SUCCESS,
        payload: data,
      });

      // toast.success("Siggned up..");
    } catch (error) {
      dispatch({
        type: EMPLOYEE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  // const toastId = toast.loading('Loading...');
  try {
    dispatch({ type: EMPLOYEE_LOGIN_REQUEST });
    const config = { headers: { "Contnet-Type": "application/json" } };
    //  console.log(config);
    const { data } = await axios.post(
      "http://localhost:5000/auth/sign-in",
      { email, password },
      config
    );
    console.log(data.isError);
    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });
    if (!data.isError) {
      toast.success("Logged in");
      localStorage.setItem("employeeInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    toast.error("Login failed..");
  }
  // toast.dismiss(toastId);
};

export const listEmployee = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  try {
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/user/employees", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: EMPLOYEE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const alluser = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/user/all");
    console.log(data);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const EmployeeTask = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  try {
    dispatch({ type: EMPLOYEE_TASK_DETAILS_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/user/tasks",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({
      type: EMPLOYEE_TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_TASK_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const EmployeeTaskbyid = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  try {
    dispatch({ type: EMPLOYEE_TASK_DETAILS_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/user/gettasksbyemployeeid",
      { id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({
      type: EMPLOYEE_TASK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_TASK_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const employeeDetail = (id) => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;

  try {
    dispatch({ type: EMPLOYEE_DETAILS_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/user/getEmployeeById",
      { id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    dispatch({
      type: EMPLOYEE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const infoUSer = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const id = userData?.id;
  const token = userData?.token;
  try {
    dispatch({ type: USER_INFO_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/user/getById",
      {
        id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: USER_INFO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const someDetail = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));

  const token = userData?.token;
  try {
    dispatch({ type: SOMEDETAILS_REQUEST });
    const { data } = await axios.post(
      "http://localhost:5000/project/somemoredetails",
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(data);
    dispatch({
      type: SOMEDETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SOMEDETAILS_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
