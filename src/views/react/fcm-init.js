import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  messagingSenderId: "666370526556"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  "BB4_49lxHTVkrlYZGBMyryw_2Ldzs4_NwehCov01aalAFJyoiwCvRIqBLEDaQEqaZzT2KeStmnS-UYGrx4ZsTVs"
);
export { messaging };
