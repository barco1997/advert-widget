import app from "firebase/app";
import "firebase/storage";
import "firebase/messaging";
import {
  REACT_APP_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_PUBLIC_VAPID_KEY
} from "../../../../../prod_const";
const config = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.storage = app.storage();
    this.messaging = app.messaging();
    this.messaging.usePublicVapidKey(
      // Project Settings => Cloud Messaging => Web Push certificates
      REACT_APP_PUBLIC_VAPID_KEY
    );
  }
  messagingFunc() {
    const d = new Date();
    return this.messaging;
  }
  putVoice(uid, file) {
    const d = new Date();
    return this.storage
      .ref()
      .child(`${uid}/voices/${d.getMilliseconds()}.mp3`)
      .put(file, {
        contentType: "audio/mp3"
      });
  }
}

export default Firebase;