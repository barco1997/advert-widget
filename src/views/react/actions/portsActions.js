import * as types from "./actionTypes";
import axios from "axios";
function url() {
  return "https://api.eyezon.app/ports";
}

export function receivePorts(json) {
  return { type: types.RECEIVE_PORTS, ports: json.ports };
}

export function fetchPorts() {
  return dispatch => {
    return axios.get(url()).then(response => dispatch(receivePorts(response)));
  };
}
