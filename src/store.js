import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeListReducer,
  employeeRegisterReducer,
  employeeLoginReducer,
  employeeTaskReducer,
  userInfoReducer,
} from "./reducers/employeeReducer";
import {
  projectListReducer,
  projectCreatedReducer,
  projectViewReducer,
  taskCreatedReducer,
  taskViewReducer,
  taskAssignReducer,
} from "./reducers/projectListReducer";
import {
  reportCreatedReducer,
  reportViewReducer,
  reportSingleViewReducer,
  reportUpdateReducer,
  reportRemarkReducer,
  reportByUserReducer,
  allReportByTaskReducer,
} from "./reducers/reportReducer";
import { singleTaskReducer } from "./reducers/taskReducer";
import { clientsListReducer } from "./reducers/clientReducer";
const employeenfoFromStroge = localStorage.getItem("employeeInfo")
  ? JSON.parse(localStorage.getItem("employeeInfo"))
  : null;

const reducer = combineReducers({
  employeeList: employeeListReducer,
  projectList: projectListReducer,
  employeeLogin: employeeLoginReducer,
  employeeregister: employeeRegisterReducer,
  projectCreated: projectCreatedReducer,
  taskCreated: taskCreatedReducer,
  reportCreated: reportCreatedReducer,
  projectView: projectViewReducer,
  tasksView: taskViewReducer,
  taskAssign: taskAssignReducer,
  employeeTask: employeeTaskReducer,
  reportView: reportViewReducer,
  singleReportView: reportSingleViewReducer,
  updateReport: reportUpdateReducer,
  remarkReport: reportRemarkReducer,
  reportByUser: reportByUserReducer,
  clientsList: clientsListReducer,
  userInfo: userInfoReducer,
  singleTask: singleTaskReducer,
  allReportByTask: allReportByTaskReducer,
});
const initialState = {
  employeeLogin: { employeeInfo: employeenfoFromStroge },
  // project: { data: [] },
};
const middlewares = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
