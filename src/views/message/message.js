import html from "./message.html";
import "./message.css";

let elements = [];
let body;

export function popup(text) {
  // convert plain HTML string into DOM elements

  let popupWindow = document.createElement("div");
  popupWindow.innerHTML = html;
  //popupWindow.getElementsByClassName("js-widget-dialog")[0].textContent = text;

  // append elements to body
  body = document.getElementsByTagName("body")[0];
  popupWindow
    .getElementsByClassName("js-widget-overlay")[0]
    .addEventListener("click", close);
  while (popupWindow.children.length > 0) {
    elements.push(popupWindow.children[0]);

    body.appendChild(popupWindow.children[0]);
  }
}

export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
}
