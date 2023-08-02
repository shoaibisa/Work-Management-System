import axios from "axios";
import {
  REPORT_CREATED_FAILS,
  REPORT_CREATED_SUCCESS,
  REPORT_CREATED_REQUEST,
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
    employee
  ) =>
  async (dispatch) => {
    console.log(pocFile);
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
    };
    try {
      dispatch({ type: REPORT_CREATED_REQUEST });
      const userData = JSON.parse(localStorage.getItem("employeeInfo"));
      const token = userData?.token;
      const formData = new FormData();

      for (const key in payload) {
        formData.append(key, payload[key]);
      }
      // Append the pocFile as a file to the FormData
      // formData.append("pocFiles", pocFile);
      // formData.append("pocFile", pocFile.data, pocFile.name);
      for (const file of pocFile) {
        formData.append("pocFiles", file);
      }
      //  console.log(formData);
      formData.forEach((value, key) => {
        console.log(key, value);
      });

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
