import api from "../../utility/api";
import { getAction } from "./readAction";
import { GET_NEWS, GET_APPLICATION, GET_JOBS, GET_ASSESSMENT, GET_REGIONS } from "./types";

export const updateAction =
  (path, actionType, id, data) => async (dispatch) => {
console.log(data)

    try {
      const res = await api.put(`${path}/${id}/`, data);
      dispatch({
        type: actionType,
        payload: res.data,
      });
      if (path === "api/baholash") {
        dispatch(getAction("api/baholash", GET_ASSESSMENT));
      }
      if (path === "api/news") {
        dispatch(getAction("api/news/", GET_NEWS));
      }
      if (path === "api/ariza/") {
        dispatch(getAction("api/ariza/", GET_APPLICATION));
      }
      if (path === "api/ishlar") {
        dispatch(getAction("api/ishlar/", GET_JOBS));
      }
      if (path === "api/hududlar") {
        dispatch(getAction("api/hududlar/", GET_REGIONS));
      }
    } catch (err) {
      console.log(err);
    }
  };
