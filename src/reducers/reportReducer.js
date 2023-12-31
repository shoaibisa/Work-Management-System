import {
  REPORT_CREATED_FAILS,
  REPORT_CREATED_SUCCESS,
  REPORT_CREATED_REQUEST,
  REPORT_VIEW_REQUEST,
  REPORT_VIEW_SUCCESS,
  REPORT_VIEW_FAILS,
  REPORT_SINGLEVIEW_REQUEST,
  REPORT_SINGLEVIEW_SUCCESS,
  REPORT_SINGLEVIEW_FAILS,
  REPORT_UPDATE_REQUEST,
  REPORT_UPDATE_SUCCESS,
  REPORT_UPDATE_FAILS,
  REPORT_REMARK_REQUEST,
  REPORT_REMARK_SUCCESS,
  REPORT_REMARK_FAILS,
  REPORT_VIEWBYUSER_REQUEST,
  REPORT_VIEWBYUSER_SUCCESS,
  REPORT_VIEWBYUSER_FAILS,
  ALLREPORT_VIEW_REQUEST,
  ALLREPORT_VIEW_SUCCESS,
  ALLREPORT_VIEW_FAILS,
  REPORT_CREATEDFORWEB_FAILS,
  REPORT_CREATEDFORWEB_SUCCESS,
  REPORT_CREATEDFORWEB_REQUEST,
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

export const reportCreatedForWebReducer = (
  state = { Webreport: [] },
  action
) => {
  switch (action.type) {
    case REPORT_CREATEDFORWEB_REQUEST:
      return { loading: true, Webreport: [] };

    case REPORT_CREATEDFORWEB_SUCCESS:
      return { loading: false, Webreport: action.payload };

    case REPORT_CREATEDFORWEB_FAILS:
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

export const reportSingleViewReducer = (state = { report: [] }, action) => {
  switch (action.type) {
    case REPORT_SINGLEVIEW_REQUEST:
      return { loading: true, report: [] };

    case REPORT_SINGLEVIEW_SUCCESS:
      return { loading: false, report: action.payload };

    case REPORT_SINGLEVIEW_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const reportUpdateReducer = (state = { updateReports: [] }, action) => {
  switch (action.type) {
    case REPORT_UPDATE_REQUEST:
      return { loading: true, updateReports: [] };

    case REPORT_UPDATE_SUCCESS:
      return { loading: false, updateReports: action.payload };

    case REPORT_UPDATE_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const reportRemarkReducer = (state = { remark: [] }, action) => {
  switch (action.type) {
    case REPORT_REMARK_REQUEST:
      return { loading: true, remark: [] };

    case REPORT_REMARK_SUCCESS:
      return { loading: false, remark: action.payload };

    case REPORT_REMARK_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const reportByUserReducer = (state = { singleReport: [] }, action) => {
  switch (action.type) {
    case REPORT_VIEWBYUSER_REQUEST:
      return { loading: true, singleReport: [] };

    case REPORT_VIEWBYUSER_SUCCESS:
      return { loading: false, singleReport: action.payload };

    case REPORT_VIEWBYUSER_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const allReportByTaskReducer = (state = { allReport: [] }, action) => {
  switch (action.type) {
    case ALLREPORT_VIEW_REQUEST:
      return { loading: true, allReport: [] };

    case ALLREPORT_VIEW_SUCCESS:
      return { loading: false, allReport: action.payload };

    case ALLREPORT_VIEW_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
