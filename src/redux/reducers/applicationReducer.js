import { GET_APPLICATION, CREATE_APPLICATION } from "../actions/types";

const initialState = {
  data: []
};

const applicationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_APPLICATION:
      return {
        ...state,
        data: payload
      };
      case CREATE_APPLICATION:
        return {
          ...state,
          data: payload
        }
    default:
      return state;
  }
};

export default applicationReducer;
