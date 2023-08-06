import { combineReducers } from "redux";
import authReducer from "./authReducer";
import jobsReducer from './jobsReducer';
import newsReducer from './newsReducer';
import applicationReducer from './applicationReducer';
import assessmentReducer from './assessmentReducer';
import regionsReducer from './regionsReducer';

const appReducer = combineReducers({
  authReducer,
  newsReducer,
  applicationReducer,
  jobsReducer,
  regionsReducer,
  assessmentReducer
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
