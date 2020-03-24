import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import html from "./index.html";
import App from "./components/App";
//import Firebase, { FirebaseContext } from "./components/Firebase";
import { load } from "./constants";
import NotifyButton from "./components/NotifyButton";
import LeaveEmail from "./components/LeaveEmail";
//import CriticalInfo from "./components/CriticalInfo";
//import FooterLogo from "./components/FooterLogo";
//import BlurredButton from "./components/BlurredButton";
//import RateCall from "./components/RateCall";
//import * as fms from "./firebase-messaging-sw.js";

const Wrapper = styled.div`
  &&& {
    display: flex !important;
    border: 2px solid red !important;
    width: 800px !important;
    height: 900px !important;
    z-index: 3 !important;
    position: absolute !important;
    top: 50px !important;
    left: 700px !important;
    justify-content: center !important;
    align-items: center !important;
  }
`;
let elements = [];
let body;
/*<script>Mp3LameEncoderConfig = { memoryInitializerPrefixURL: "https://witheyezon.com/eyezonsite/wp3/" };</script>
    <script src="https://witheyezon.com/eyezonsite/wp3/Mp3LameEncoder.min.js"></script>
    <script src="https://witheyezon.com/eyezonsite/wp3/W3Module.js"></script>
    <script src="https://witheyezon.com/eyezonsite/wp3/schema-ebml.js"></script>
    <script src="https://witheyezon.com/eyezonsite/wp3/lib-ebml.js"></script>*/
/*load("https://witheyezon.com/eyezonsite/wp3/Mp3LameEncoder.min.js")
  .then(function() {
    console.log("Loaded Mp3LameEncoder!");
  })
  .catch(function(err) {
    console.error("Something went wrong!", err);
  });
load("https://witheyezon.com/eyezonsite/wp3/W3Module.js")
  .then(function() {
    console.log("Loaded W3Module!");
  })
  .catch(function(err) {
    console.error("Something went wrong!", err);
  });
load("https://witheyezon.com/eyezonsite/wp3/schema-ebml.js")
  .then(function() {
    console.log("Loaded schema!");
    load("https://witheyezon.com/eyezonsite/wp3/lib-ebml.js")
      .then(function() {
        console.log("Loaded lib!");
      })
      .catch(function(err) {
        console.error("Something went wrong!", err);
      });
  })
  .catch(function(err) {
    console.error("Something went wrong!", err);
  });*/

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
  }*/

  ReactDOM.render(
    /*<FirebaseContext.Provider value={new Firebase()}>*/
    /*<App
      color={params.color}
      button={params.buttonOnTop}
      businessId={params.businessId}
      buttonId={params.initialButtonId}
      ifOpened={ifOpened}
      buttons={buttons}
      eyezonGlobal={params.eyezonGlobal}
      /*firebase={Firebase ? new Firebase() : null}
    />*/
    <Wrapper>
      <NotifyButton />
    </Wrapper>,
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
