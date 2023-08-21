import {
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_FAILS,
  SEE_NOTIFICATION_REQUEST,
  SEE_NOTIFICATION_SUCCESS,
  SEE_NOTIFICATION_FAILS,
} from "../constants/notifiaction";

export const notificationReducer = (state = { notifiaction: [] }, action) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return { loading: true, notification: [] };

    case NOTIFICATION_SUCCESS:
      return { loading: false, notification: action.payload };

    case NOTIFICATION_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const seeNotificationReducer = (
  state = { seeNotification: [] },
  action
) => {
  switch (action.type) {
    case SEE_NOTIFICATION_REQUEST:
      return { loading: true, seeNotification: [] };

    case SEE_NOTIFICATION_SUCCESS:
      return { loading: false, seeNotification: action.payload };

    case SEE_NOTIFICATION_FAILS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
