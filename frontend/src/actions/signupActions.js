import { CUSTOMER_SIGNUP, RESTAURANT_SIGNUP } from "../actionTypes";
import axios from "axios";
import serverAddress from "../config";

export const customerSignup = (customerData) => (dispatch) => {
  console.log("signup action");
  axios.defaults.withCredentials = true;
  axios
    .post(`${serverAddress}/yelp/signup/customer`, customerData)
    .then((response) => {
      console.log(response);
      dispatch({
        type: CUSTOMER_SIGNUP,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: CUSTOMER_SIGNUP,
          payload: error.response.data,
        });
      }
    });
};

export const restaurantSignup = (restaurantData) => (dispatch) => {
  console.log("signup action");
  axios.defaults.withCredentials = true;
  axios
    .post(`${serverAddress}/yelp/signup/restaurant`, restaurantData)
    .then((response) => {
      console.log(response);
      dispatch({
        type: RESTAURANT_SIGNUP,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        return dispatch({
          type: RESTAURANT_SIGNUP,
          payload: error.response.data,
        });
      }
    });
};
