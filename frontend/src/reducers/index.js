import { combineReducers } from "redux";
import customerProfileReducer from "./customerProfileReducer";
import loginReducer from "./loginReducer";
import signupReducer from "./signupReducer";

export default combineReducers({
  login: loginReducer,
  customerProfile: customerProfileReducer,
  signup: signupReducer,
});
