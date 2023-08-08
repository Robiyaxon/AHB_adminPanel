import { CREATE_BALLAR, GET_BALLAR } from "../actions/types";

const initialState = {
  data: []
};

const BallarReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BALLAR:
      return {
        ...state,
        data: payload
      };
    case CREATE_BALLAR:
      return {
        ...state,
        data: payload
      };
    default:
      return state;
  }
};

export default BallarReducer;
