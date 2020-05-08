import React from "react";
import ReactDOM from "react-dom";
import html from "./index.html";
import App from "./components/App";
//import Firebase, { FirebaseContext } from "./components/Firebase";

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

  /*if ("serviceWorker" in navigator) {
    firebaseServiceWorker
      .register()
      .then(function (registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function (err) {
        console.log("Service worker registration failed, error:", err);
      });
  }*/

  ReactDOM.render(
    /*<FirebaseContext.Provider value={Firebase ? new Firebase() : null}>*/
    <App
      button={params.buttonOnTop}
      businessId={params.businessId}
      buttonId={params.initialButtonId}
      ifOpened={ifOpened}
      buttons={buttons}
      eyezonGlobal={params.eyezonGlobal}
    />,
    /*</FirebaseContext.Provider>*/ document.getElementById("eyezonRoot")
  );
}

/*export function reactTest(params, ifOpened, buttons, eyezonGlobal) {
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

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register(
         "./firebase-messaging-sw.js"
      )
      .then(function(registration) {
        console.log("Registration successful, scope is:", registration.scope);
      })
      .catch(function(err) {
        console.log("Service worker registration failed, error:", err);
      });
  }

  ReactDOM.render(
    
    <Wrapper>
      <RateCall />
    </Wrapper>,
    document.getElementById("root")
  );
}*/
