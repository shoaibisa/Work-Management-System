import axios from "axios";
import {
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_SUCCESS,
  CLIENTS_LIST_FAILS,
} from "../constants/client";
export const listClients = () => async (dispatch) => {
  const userData = JSON.parse(localStorage.getItem("employeeInfo"));
  const token = userData?.token;
  try {
    dispatch({ type: CLIENTS_LIST_REQUEST });
    const { data } = await axios.get(
      "http://localhost:5000/user/clients",
      {},

    //   {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    );
    console.log(data);
    dispatch({
      type: CLIENTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTS_LIST_FAILS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
