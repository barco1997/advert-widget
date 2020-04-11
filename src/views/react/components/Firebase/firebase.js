import * as firebase from "firebase/app";
//import "firebase/storage";
import "firebase/messaging";
import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_PUBLIC_VAPID_KEY,
} from "../../../../../prod_const";
const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
};

const messagingConfig = {
  apiKey: "AIzaSyDvFGZrHg0TrjXCq_4PpyaySa3pMDnMSLo",
  authDomain: "eyezon-business.firebaseapp.com",
  databaseURL: "https://eyezon-business.firebaseio.com",
  projectId: "eyezon-business",
  storageBucket: "eyezon-business.appspot.com",
  messagingSenderId: "666370526556",
  appId: "1:666370526556:web:b44c054c79a8d987af8599",
  measurementId: "G-8B10VNSX7X",
};
const initializedFirebaseApp = firebase.initializeApp(messagingConfig);
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  REACT_APP_PUBLIC_VAPID_KEY
);

class Firebase {
  constructor() {
    this.messaging = messaging;
    this.getMessaging = () => {
      return this.messaging;
    };
  }

  /*putVoice(uid, file) {
    const d = new Date();
    return this.storage
      .ref()
      .child(`${uid}/voices/${d.getMilliseconds()}.mp3`)
      .put(file, {
        contentType: "audio/mp3"
      });
  }*/
}

export default Firebase;
