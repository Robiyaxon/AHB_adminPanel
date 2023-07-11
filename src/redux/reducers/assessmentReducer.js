import { CREATE_ASSESSMENT, GET_ASSESSMENT } from "../actions/types";

const initialState = {
  data: []
};

const AssessmentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ASSESSMENT:
      return {
        ...state,
        data: payload
      };
    case CREATE_ASSESSMENT:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default AssessmentReducer;
