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
  TASK_ASSIGN_REQUEST,
  TASK_ASSIGN_SUCCESS,
  TASK_ASSIGN_FAILS,
  PROJECT_MANAGER_REQUEST,
  PROJECT_MANAGER_SUCCESS,
  PROJECT_MANAGER_FAILS,
  PROJECT_LIST_BY_PM_REQUEST,
  PROJECT_LIST_BY_PM_SUCCESS,
  PROJECT_LIST_BY_PM_FAILS,
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
export const taskAssignReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case TASK_ASSIGN_REQUEST:
      return { loading: true, employees: [] };

    case TASK_ASSIGN_SUCCESS:
      return { loading: false, employees: action.payload };

    case TASK_ASSIGN_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const projectManagerList = (state = { managers: [] }, action) => {
  switch (action.type) {
    case PROJECT_MANAGER_REQUEST:
      return { loading: true, managers: [] };

    case PROJECT_MANAGER_SUCCESS:
      return { loading: false, managers: action.payload };

    case PROJECT_MANAGER_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const projectListByPM = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECT_LIST_BY_PM_REQUEST:
      return { loading: true, projects: [] };

    case PROJECT_LIST_BY_PM_SUCCESS:
      return { loading: false, projects: action.payload };

    case PROJECT_LIST_BY_PM_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
