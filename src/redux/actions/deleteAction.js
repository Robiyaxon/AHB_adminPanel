import api from "../../utility/api";
import { getAction } from "./readAction";
import { GET_APPLICATION } from "./types";

export const deleteAction = (path, actionType, id) => async (dispatch) => {
  try {
    const res = await api.delete(`${path}/${id}`);
    dispatch({
      type: actionType,
      payload: res.data,
    });
    if (path === "api/ariza/") {
      dispatch(getAction("api/ariza/", GET_APPLICATION));
    }
  } catch (err) {
    console.log(err);
  }
};
