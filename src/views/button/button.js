import html from "./button.html";
import "./button.css";
import { popup } from "../message/message";

let elements = [];
let body;
let button;

export function show(text) {
  // convert plain HTML string into DOM elements
  let temporary = document.createElement("div");
  temporary.innerHTML = html;
  button = temporary.getElementsByClassName("js-button-dialog")[0];
  temporary.getElementsByClassName(
    "js-button-dialog"
  )[0].style.background = text;
  temporary.getElementsByClassName("js-button-dialog")[0].style.color =
    text === "black" ? "white" : "black";

  temporary.getElementsByClassName("js-button-dialog")[0].onclick = function(
    event
  ) {
    event.preventDefault();
    initialTouch();
  };
  // append elements to body
  body = document.getElementsByTagName("body")[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }
  //popup("wow");
  //body.addEventListener("click", popup("wow"));
}

export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener("click", close);
}
export function initialTouch() {
  body.getElementsByClassName("js-button-text")[0].style.opacity = 1;
  body.getElementsByClassName("js-button-text")[0].style.height = "42";
  button.style.width = "278px";
  button.onclick = function() {
    popup("wow");
  };

  body.removeEventListener("click", initialTouch);
}
