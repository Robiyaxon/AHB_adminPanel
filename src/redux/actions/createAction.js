// import api from "../../utility/api";

import api from "../../utility/api";

export const createAction =
  (path, actionType, data) => async (dispatch) => {
    // try {
      const res = await api.post(path, data);
      
      dispatch({
        type: actionType,
        payload: res.data,
      });
    // } catch (err) {
      // console.log(err);
    // }
  };