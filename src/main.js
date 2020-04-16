import "./views/global/cleanslate.css";
import "./views/global/style.css";
import { react /*, reactTest*/ } from "./views/react";
import "./fonts/fonts.css";
import axios from "axios";
import { apiBaseUrl } from "./views/react/constants";
const supportedAPI = [
  "init",
  "message",
  "react",
  "reacttest",
  "install_eyezon",
]; // enlist all methods supported by API (e.g. `mw('event', 'user-login');`)

/**
    The main entry of the application
    */
function app(window) {
  // set default configurations
  let configurations = {
    someDefaultConfiguration: false,
  };

  // all methods that were called till now and stored in queue
  // needs to be called now
  let globalObject = window[window["JS-Widget"]];
  let queue = globalObject.q;
  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i][0].toLowerCase() == "init") {
        configurations = extendObject(configurations, queue[i][1]);
        console.log("JS-Widget started", configurations);
      } else apiHandler(queue[i][0], queue[i][1]);
    }
  }

  // override temporary (until the app loaded) handler
  // for widget's API calls
  globalObject = apiHandler;
  globalObject.configurations = configurations;
}

/**
    Method that handles all API calls
    */
function apiHandler(api, params) {
  if (!api) throw Error("API method required");
  api = api.toLowerCase();

  if (supportedAPI.indexOf(api) === -1)
    throw Error(`Method ${api} is not supported`);

  //console.log(`Handling API call ${api}`, params);

  switch (api) {
    // TODO: add API implementation

    case "install_eyezon":
      let buttons;
      let updatedParams = params;
      let url = new URL(window.location.href);
      let openChat = url.searchParams.get("open");
      const url2 = `${apiBaseUrl}/business/${params.businessId}/subscriptions`;
      axios
        .get(url2)
        .then(function (response) {
          console.log("Subscriptions info:", response.data);
          if (
            response.data.some(
              (subscription) => subscription.status === "ACTIVE"
            )
          ) {
            if (params.targets && params.targets.length > 0) {
              buttons = params.targets.map((target) => {
                return {
                  buttonId: target.buttonId,
                  target: document.getElementById(target.targetId),
                };
              });
            }

            if (openChat) {
              updatedParams.initialButtonId = url.searchParams.get("buttonId");
              console.log("Starting button with parameters:", updatedParams);
              react(updatedParams, true, buttons);
            } else {
              console.log("Starting button with parameters:", updatedParams);
              react(updatedParams, false, buttons);
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      break;

    case "reacttest":
      /*reactTest(params, true, buttons);*/

      break;

    default:
      console.warn(`No handler defined for ${api}`);
  }
}

function extendObject(a, b) {
  for (var key in b) if (b.hasOwnProperty(key)) a[key] = b[key];
  return a;
}

app(window);
