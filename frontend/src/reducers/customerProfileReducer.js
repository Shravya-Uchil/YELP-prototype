import { GET_CUSTOMER, UPDATE_CUSTOMER } from "../actionTypes";

const initialState = {
  customer: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    case GET_CUSTOMER:
      return {
        ...state,
        customer: action.payload,
      };
    default:
      return state;
  }
}
