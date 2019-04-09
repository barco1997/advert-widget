import React from "react";
import ReactDOM from "react-dom";
import html from "./index.html";
import App from "./components/App";

let elements = [];
let body;

export function react(params, ifOpened, buttons) {
  let temporary = document.createElement("div");
  temporary.innerHTML = html;
  body = document.getElementsByTagName("body")[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }
  ReactDOM.render(
    <React.Fragment>
      <App
        color={params.color}
        button={params.button}
        businessId={params.businessId}
        ifOpened={ifOpened}
        buttons={buttons}
      />
    </React.Fragment>,
    document.getElementById("root")
  );
}
