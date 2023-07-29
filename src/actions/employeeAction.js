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
} from "../constants/employee";

import axios from "axios";

//Logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("employeeInfo");
  dispatch({
    type: EMPLOYEE_LOGOUT,
  });
};

//Register
export const register =
  (name, email, password, phone, selectedDepartment) => async (dispatch) => {
    try {
      dispatch({ type: EMPLOYEE_REGISTER_REQUEST });
      const config = { headers: { "Contnet-Type": "application/json" } };
      const { data } = await axios.post(
        "http://localhost:5000/auth/sign-up",
        { name, email, password, phone, selectedDepartment },
        config
      );

      dispatch({
        type: EMPLOYEE_REGISTER_SUCCESS,
        payload: data,
      });
      // dispatch({
      //   type: EMPLOYEE_LOGIN_SUCCESS,
      //   payload: data,
      // });
      //localStorage.setItem("employeeInfo", JSON.stringify(data));
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
  }
};
export const listEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:5000/auth/allemployees");
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
