import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeListReducer,
  employeeRegisterReducer,
  employeeLoginReducer,
} from "./reducers/employeeReducer";
import {
  projectListReducer,
  projectCreatedReducer,
} from "./reducers/projectListReducer";

const employeenfoFromStroge = localStorage.getItem("employeeInfo")
  ? JSON.parse(localStorage.getItem("employeeInfo"))
  : null;

const reducer = combineReducers({
  employeeList: employeeListReducer,
  projectList: projectListReducer,
  employeeLogin: employeeLoginReducer,
  employeeregister: employeeRegisterReducer,
  projectCreated: projectCreatedReducer,
});
const initialState = {
  employeeLogin: { employeeInfo: employeenfoFromStroge },
};
const middlewares = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
