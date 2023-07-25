import {
  PROJECT_LIST_FAILS,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_CREATED_REQUEST,
  PROJECT_CREATED_SUCCESS,
  PROJECT_CREATED_FAILS,
  PROJECT_DETAILS_FAILS,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_REQUEST,
  TASK_CREATED_REQUEST,
  TASK_CREATED_SUCCESS,
  TASK_CREATED_FAILS,
  TASK_VIEW_FAILS,
  TASK_VIEW_REQUEST,
  TASK_VIEW_SUCCESS,
} from "../constants/projectList.js";

export const projectCreatedReducer = (state = { project: [] }, action) => {
  switch (action.type) {
    case PROJECT_CREATED_REQUEST:
      return { loading: true, project: [] };

    case PROJECT_CREATED_SUCCESS:
      return { loading: false, project: action.payload };

    case PROJECT_CREATED_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const taskCreatedReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case TASK_CREATED_REQUEST:
      return { loading: true, task: [] };

    case TASK_CREATED_SUCCESS:
      return { loading: false, task: action.payload };

    case TASK_CREATED_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const projectViewReducer = (state = { project: [] }, action) => {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { loading: true, project: [] };

    case PROJECT_DETAILS_SUCCESS:
      return { loading: false, project: action.payload };

    case PROJECT_DETAILS_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

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

export const taskViewReducer = (state = { tasks: [] }, action) => {
  switch (action.type) {
    case TASK_VIEW_REQUEST:
      return { loading: true, tasks: [] };

    case TASK_VIEW_SUCCESS:
      return { loading: false, tasks: action.payload };

    case TASK_VIEW_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
