import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../actionTypes";
import axios from "axios";

export const customerLogin = (loginDetails, type) => (dispatch) => {
  axios.defaults.withCredentials = true;
  var url = "";
  if (type === "Customer") {
    url = "http://localhost:3001/yelp/login/customer";
  } else {
    url = "http://localhost:3001/yelp/login/restaurant";
  }
  console.log("URL: " + url);
  axios
    .post(url, loginDetails)
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
