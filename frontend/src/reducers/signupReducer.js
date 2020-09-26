import { CUSTOMER_SIGNUP, RESTAURANT_SIGNUP } from "../actionTypes";

const initialState = {
  customer: {},
  restaurant: {},
};

export default function (state = initialState, action) {
  console.log("signup reducer");
  console.log(action);
  switch (action.type) {
    case CUSTOMER_SIGNUP:
      return {
        ...state,
        customer: action.payload,
      };
    case RESTAURANT_SIGNUP:
      return {
        ...state,
        restaurant: action.payload,
      };
    default:
      return state;
  }
}
