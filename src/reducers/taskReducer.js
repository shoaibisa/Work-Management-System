import {
  SINGLE_TASK_FAILS,
  SINGLE_TASK_SUCCESS,
  SINGLE_TASK_REQUEST,
} from "../constants/task";

export const singleTaskReducer = (state = { task: [] }, action) => {
  switch (action.type) {
    case SINGLE_TASK_REQUEST:
      return { loading: true, task: [] };

    case SINGLE_TASK_SUCCESS:
      return { loading: false, task: action.payload };

    case SINGLE_TASK_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
