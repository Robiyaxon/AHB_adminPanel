import api from "../../utility/api";
import { getAction } from "./readAction";
import { GET_HISTORY, GET_NEWS, GET_APPLICATION, GET_PROJECT, GET_JOBS, GET_ASSESSMENT } from "./types";

export const updateAction =
  (path, actionType, id, data) => async (dispatch) => {
    try {
      const res = await api.put(`${path}/${id}/`, data);

      dispatch({
        type: actionType,
        payload: res.data,
      });
      if (path === "api/baholash") {
        dispatch(getAction("api/baholash", GET_ASSESSMENT));
      }
      if (path === "history") {
        dispatch(getAction("history", GET_HISTORY));
      }
      if (path === "api/ariza/") {
        dispatch(getAction("api/ariza/", GET_APPLICATION));
      }
      if (path === "api/ishlar") {
        dispatch(getAction("api/ishlar/", GET_JOBS));
      }
    } catch (err) {
      console.log(err);
    }
  };
