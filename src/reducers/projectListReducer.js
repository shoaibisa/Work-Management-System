import {
  PROJECT_LIST_FAILS,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
} from "../constants/projectList.js";

export const projectListReducer = (state = { project: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, project: [] };

    case PROJECT_LIST_SUCCESS:
      return { loading: false, project: action.payload };

    case PROJECT_LIST_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
