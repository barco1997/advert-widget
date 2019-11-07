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
  window.addEventListener("scroll", () => {
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`
    );
  });

  ReactDOM.render(
    <React.Fragment>
      <App
        color={params.color}
        button={params.buttonOnTop}
        businessId={params.businessId}
        buttonId={params.initialButtonId}
        ifOpened={ifOpened}
        buttons={buttons}
      />
    </React.Fragment>,
    document.getElementById("root")
  );
}
