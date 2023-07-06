import { CREATE_JOBS, GET_JOBS } from "../actions/types";

const initialState = {
  data: []
};

const JobsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_JOBS:
      return {
        ...state,
        data: payload
      };
    case CREATE_JOBS:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default JobsReducer;
