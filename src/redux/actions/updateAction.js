import api from "../../utility/api";
import { getAction } from "./readAction";
import { GET_HISTORY, GET_NEWS, GET_SERVICES, GET_APPLICATION, GET_PROJECT, GET_JOBS } from "./types";

export const updateAction =
  (path, actionType, id, data) => async (dispatch) => {
    try {
      const res = await api.put(`${path}/${id}/`, data);

      dispatch({
        type: actionType,
        payload: res.data,
      });
      if (path === "news") {
        dispatch(getAction("news", GET_NEWS));
      }
      if (path === "history") {
        dispatch(getAction("history", GET_HISTORY));
      }
      if (path === "ourService") {
        dispatch(getAction("ourService", GET_SERVICES));
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
