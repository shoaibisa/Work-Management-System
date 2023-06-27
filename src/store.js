import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { employeeListReducer } from "./reducers/employeeReducer";
import { projectListReducer } from "./reducers/projectListReducer";

const reducer = combineReducers({
  employeeList: employeeListReducer,
  projectList: projectListReducer,
});
const initialState = {};
const middlewares = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
