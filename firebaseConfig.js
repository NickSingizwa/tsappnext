import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDg883VJVoN2BGBmy8nG0RJWqXLgIYcdQA",
  authDomain: "whatsapp-clone-cc036.firebaseapp.com",
  projectId: "whatsapp-clone-cc036",
  storageBucket: "whatsapp-clone-cc036.appspot.com",
  messagingSenderId: "191255279052",
  appId: "1:191255279052:web:1ab4d065ce48b45fc65969"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  auth,
  provider
}