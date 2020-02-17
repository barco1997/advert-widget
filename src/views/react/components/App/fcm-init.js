import * as firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyDvFGZrHg0TrjXCq_4PpyaySa3pMDnMSLo",
  authDomain: "eyezon-business.firebaseapp.com",
  databaseURL: "https://eyezon-business.firebaseio.com",
  projectId: "eyezon-business",
  storageBucket: "eyezon-business.appspot.com",
  messagingSenderId: "666370526556",
  appId: "1:666370526556:web:b44c054c79a8d987af8599",
  measurementId: "G-8B10VNSX7X"
});
const messaging = initializedFirebaseApp.messaging();
messaging.usePublicVapidKey(
  // Project Settings => Cloud Messaging => Web Push certificates
  "BB4_49lxHTVkrlYZGBMyryw_2Ldzs4_NwehCov01aalAFJyoiwCvRIqBLEDaQEqaZzT2KeStmnS-UYGrx4ZsTVs"
);
export { messaging };
