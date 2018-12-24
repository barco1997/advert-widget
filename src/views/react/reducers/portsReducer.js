import initialState from "./initialState";
import { FETCH_PORTS, RECEIVE_PORTS } from "../actions/actionTypes";

export default function ports(state = initialState.ports, action) {
  let newState;
  switch (action.type) {
    case FETCH_PORTS:
      console.log("FETCH_PORTS Action");
      return action;
    case RECEIVE_PORTS:
      newState = action.PORTS;
      console.log("RECEIVE_PORTS Action");
      return newState;
    default:
      return state;
  }
}
