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

export const employeeLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN_REQUEST:
      return { loading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { loading: false, employeeInfo: action.payload };
    case EMPLOYEE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const employeeRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_REGISTER_REQUEST:
      return { loading: true };
    case EMPLOYEE_REGISTER_SUCCESS:
      return { loading: false, employeeInfo: action.payload };
    case EMPLOYEE_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const employeeListReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST_REQUEST:
      return { loading: true, employees: [] };

    case EMPLOYEE_LIST_SUCCESS:
      return { loading: false, employees: action.payload };

    case EMPLOYEE_LIST_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const employeeTaskReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case EMPLOYEE_TASK_DETAILS_REQUEST:
      return { loading: true, task: [] };

    case EMPLOYEE_TASK_DETAILS_SUCCESS:
      return { loading: false, task: action.payload };

    case EMPLOYEE_TASK_DETAILS_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
