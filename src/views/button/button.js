import html from "./button.html";
import "./button.css";
import { popup } from "../message/message";

let elements = [];
let body;

export function show(text) {
  // convert plain HTML string into DOM elements
  let temporary = document.createElement("div");
  temporary.innerHTML = html;

  temporary.getElementsByClassName(
    "js-button-dialog"
  )[0].style.background = text;
  temporary.getElementsByClassName("js-button-dialog")[0].style.color =
    text === "black" ? "white" : "black";
  temporary.getElementsByClassName("js-button-dialog")[0].onclick = function() {
    popup("wow");
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
