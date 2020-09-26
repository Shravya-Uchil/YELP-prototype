import { CUSTOMER_LOGIN, CUSTOMER_LOGOUT } from "../actionTypes";

const initialState = {
  customer: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CUSTOMER_LOGIN:
      return {
        ...state,
        customer: action.payload,
      };
    case CUSTOMER_LOGOUT:
      return {};
    default:
      return state;
  }
}
