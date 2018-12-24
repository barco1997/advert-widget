import React from "react";
import ReactDOM from "react-dom";
import html from "./index.html";
import App from "./components/App";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
let elements = [];
let body;
const store = configureStore();
export function react(color) {
  let temporary = document.createElement("div");
  temporary.innerHTML = html;
  body = document.getElementsByTagName("body")[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }
  ReactDOM.render(
    <Provider store={store}>
      <React.Fragment>
        <App color={color} />
      </React.Fragment>
    </Provider>,
    document.getElementById("root")
  );
}
