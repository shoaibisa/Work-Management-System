import axios from "axios";
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
  ALLREPORT_VIEW_FAILS,
  ALLREPORT_VIEW_REQUEST,
  ALLREPORT_VIEW_SUCCESS,
} from "../constants/reportsubmit";

export const reportCreate =
  (
    vulnerability,
    risk,
    attributingFactor,
    affectedUrl,
    observation,
    cwe,
    impact,
    mitigation,
    pocFile,
    brief,
    employee,
    taskID,
    type,
    webtargetUrlsId,
    files
  ) =>
  async (dispatch) => {
    console.log(files);
    const payload = {
      vulnerability,
      risk,
      attributingFactor,
      affectedUrl,
      observation,
      cwe,
      impact,
      mitigation,
      brief,
      employee,
      taskID,
      type,
      webtargetUrlsId,
      files,
    };
    try {
      dispatch({ type: REPORT_CREATED_REQUEST });
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;
      const formData = new FormData();

      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      for (const file of pocFile) {
        formData.append("pocFiles", file);
      }
      for (const file of files) {
        formData.append("files", file);
      }

      const { data } = await axios.post(
        "http://localhost:5000/project/createReport",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: REPORT_CREATED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPORT_CREATED_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const viewReport = (id, type, webtargetUrls) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_VIEW_REQUEST });
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    // console.log(id, type, webtargetUrls);
    const { data } = await axios.post(
      "http://localhost:5000/project/reportsbyuser",
      {
        taskId: id,
        type: type,
        webtargetUrls: webtargetUrls,
      },

      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    // console.log(data);
    dispatch({
      type: REPORT_VIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_VIEW_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const SingleViewReport = (id) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_SINGLEVIEW_REQUEST });
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    //console.log(id);
    const { data } = await axios.post(
      "http://localhost:5000/project/getreport",
      {
        id,
      },

      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    //  console.log(data);
    dispatch({
      type: REPORT_SINGLEVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_SINGLEVIEW_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportUpdate =
  (
    vulnerability,
    risk,
    attributingFactor,
    affectedUrl,
    observation,
    cwe,
    impact,
    mitigation,
    pocFile,
    brief,
    employee,
    taskID,
    type,
    webtargetUrlsId,
    id
  ) =>
  async (dispatch) => {
    //console.log(id);
    const payload = {
      vulnerability,
      risk,
      attributingFactor,
      affectedUrl,
      observation,
      cwe,
      impact,
      mitigation,
      brief,
      employee,
      taskID,
      type,
      webtargetUrlsId,
      id,
    };
    try {
      dispatch({ type: REPORT_UPDATE_REQUEST });
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;
      const formData = new FormData();

      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      for (const file of pocFile) {
        formData.append("pocFiles", file);
      }
      // console.log(payload.id);
      //  console.log(formData.get("id"));
      const { data } = await axios.post(
        "http://localhost:5000/project/editreport",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch({
        type: REPORT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPORT_UPDATE_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const remarksReport = (id, remarks) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_REMARK_REQUEST });
    const userData = JSON.parse(localStorage.getItem("employeeInfo"));
    const token = userData?.token;
    const { data } = await axios.post(
      "http://localhost:5000/project/addremark",
      {
        id,
        remark: remarks,
      },

      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: REPORT_REMARK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPORT_REMARK_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportsByUser =
  (id, type, webtargetUrls, userid) => async (dispatch) => {
    try {
      dispatch({ type: REPORT_VIEWBYUSER_REQUEST });
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;

      const { data } = await axios.post(
        "http://localhost:5000/project/getreportsbyuserid",
        {
          userId: userid,
          taskId: id,
          type,
          webtargetUrls,
        },

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //console.log("dgdfg", data);
      dispatch({
        type: REPORT_VIEWBYUSER_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: REPORT_VIEWBYUSER_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const allReportsByTask =
  (taskId, Type, webtargetUrls) => async (dispatch) => {
    try {
      dispatch({ type: ALLREPORT_VIEW_REQUEST });
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;

      const { data } = await axios.post(
        "http://localhost:5000/project/getreportsbytaskid",
        {
          taskId,
          type: Type,
          webtargetUrls,
        },

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      dispatch({
        type: ALLREPORT_VIEW_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: ALLREPORT_VIEW_FAILS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
