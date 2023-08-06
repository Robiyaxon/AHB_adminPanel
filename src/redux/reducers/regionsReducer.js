import { CREATE_REGIONS, GET_REGIONS } from "./../actions/types";

const initialState = {
  data: [],
};

const regionsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REGIONS:
      return {
        ...state,
        data: payload,
      };
    case CREATE_REGIONS:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default regionsReducer;
