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
} from "../constants/employee";

import axios from "axios";

const API_URL =
  "https://hub.dummyapis.com/employee?noofRecords=20&idStarts=1001";

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
      dispatch({
        type: EMPLOYEE_LOGIN_SUCCESS,
        payload: data,
      });
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
    console.log(data);
    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("employeeInfo", JSON.stringify(data));
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
