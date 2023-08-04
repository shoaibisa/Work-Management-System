import {
  REPORT_CREATED_FAILS,
  REPORT_CREATED_SUCCESS,
  REPORT_CREATED_REQUEST,
  REPORT_VIEW_REQUEST,
  REPORT_VIEW_SUCCESS,
  REPORT_VIEW_FAILS,
} from "../constants/reportsubmit";

export const reportCreatedReducer = (state = { report: [] }, action) => {
  switch (action.type) {
    case REPORT_CREATED_REQUEST:
      return { loading: true, report: [] };

    case REPORT_CREATED_SUCCESS:
      return { loading: false, report: action.payload };

    case REPORT_CREATED_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const reportViewReducer = (state = { report: [] }, action) => {
  switch (action.type) {
    case REPORT_VIEW_REQUEST:
      return { loading: true, report: [] };

    case REPORT_VIEW_SUCCESS:
      return { loading: false, report: action.payload };

    case REPORT_VIEW_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
