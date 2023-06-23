import {
  EMPLOYEE_LIST_FAILS,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_REQUEST,
} from "../constants/employee";
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
