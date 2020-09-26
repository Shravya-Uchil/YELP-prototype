import axios from "axios";
import { GET_CUSTOMER, UPDATE_CUSTOMER } from "../actionTypes";

export const getCustomerDetails = () => (dispatch) => {
  console.log("get action");
  axios
    .get(
      `http://localhost:3001/yelp/profile/customer/${localStorage.getItem(
        "email_id"
      )}`
    )
    .then((response) => response.data[0])
    .then((customer) =>
      dispatch({
        type: GET_CUSTOMER,
        payload: customer,
      })
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateCustomerDetails = (customerDetails) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`http://localhost:3001/yelp/profile/customer`, customerDetails)
    .then((response) => response.data)
    .then((data) => {
      if (data === "CUSTOMER_UPDATED") {
        alert("Profile Updated Successfully!");
      }
      return dispatch({
        type: UPDATE_CUSTOMER,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
