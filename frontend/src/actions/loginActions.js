import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../actionTypes";
import axios from "axios";

export const customerLogin = (loginDetails) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`http://localhost:3001/yelp/login`, loginDetails)
    .then((response) =>
      dispatch({
        type: CUSTOMER_LOGIN,
        payload: response.data,
      })
    )
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMER_LOGIN,
          payload: error.response.data,
        });
      }
    });
};

export const customerLogout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: CUSTOMER_LOGOUT });
};
