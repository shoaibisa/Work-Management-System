import {
  EMPLOYEE_LIST_FAILS,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
} from "../constants/employee";

import axios from "axios";
//import { userRows } from "../employessdata.js";
const API_URL =
  "https://hub.dummyapis.com/employee?noofRecords=20&idStarts=1001";
export const listEmployee = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_LIST_REQUEST });
    const { data } = await axios.get(API_URL);
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
