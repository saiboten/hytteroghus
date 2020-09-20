// This import loads the firebase namespace along with all its type information.
import * as firebaseApp from "firebase/app";

console.log("verify");

// These imports load individual services into the firebase namespace.
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const googleAuthProvider = new firebaseApp.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebaseApp.auth.FacebookAuthProvider();

const config = {
  apiKey: "AIzaSyAZ6wk_TynpGULs5Ihl8knNdjpeD7ytSz0",
  authDomain: "hytteroghus-c939f.firebaseapp.com",
  databaseURL: "https://hytteroghus-c939f.firebaseio.com",
  projectId: "hytteroghus-c939f",
  storageBucket: "hytteroghus-c939f.appspot.com",
  messagingSenderId: "503755938162",
  appId: "1:503755938162:web:7b767342fba11ab1efe5eb",
  measurementId: "G-DV27B9X7TH",
};

if (!firebaseApp.apps.length) {
  firebaseApp.initializeApp(config);
}

export const firebase = firebaseApp;
