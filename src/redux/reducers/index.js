import { combineReducers } from "redux";
import authReducer from "./authReducer";
import jobsReducer from './jobsReducer';
import applicationReducer from './applicationReducer';
import assessmentReducer from './assessmentReducer';

const appReducer = combineReducers({
  authReducer,
  // categoryReducer,
  // constructionReducer,
  // contactReducer,
  // historyReducer,
  // navigationReducer,
  // recentCommentReducer,
  // newsReducer,
  // serviceReducer,
  applicationReducer,
  jobsReducer,
  assessmentReducer
  // projectReducer,
  // networkReducer,
  // networkUrlReducer,
  // userCommentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
