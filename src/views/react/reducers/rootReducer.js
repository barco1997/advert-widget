import { combineReducers } from "redux";
import ports from "./portsReducer";

const rootReducer = combineReducers({
  ports
});

export default rootReducer;
