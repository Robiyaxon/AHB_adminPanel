import axios from "axios";
import store from "../redux/store";
import { LOGOUT } from "../redux/actions/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://otfiv-andijon-admin.uz/',
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ` + (localStorage.getItem("token") || '2fa0d2a67200eb75c181d7cef3e5ca5e9ae73f1b'),
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: LOGOUT });
    }
    return Promise.reject(err);
  }
);

export default api;
