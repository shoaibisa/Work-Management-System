import {
  CLIENTS_LIST_REQUEST,
  CLIENTS_LIST_SUCCESS,
  CLIENTS_LIST_FAILS,
} from "../constants/client";

export const clientsListReducer = (state = { clients: [] }, action) => {
  switch (action.type) {
    case CLIENTS_LIST_REQUEST:
      return { loading: true, clients: [] };

    case CLIENTS_LIST_SUCCESS:
      return { loading: false, clients: action.payload };

    case CLIENTS_LIST_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
