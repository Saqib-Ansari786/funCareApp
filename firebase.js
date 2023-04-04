// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDoHa2vDE5gm347voD-UytmQk5WT6QeX80",
  authDomain: "funcareapp.firebaseapp.com",
  projectId: "funcareapp",
  storageBucket: "funcareapp.appspot.com",
  messagingSenderId: "1077731977889",
  appId: "1:1077731977889:web:c16d387b6e063e1a831ee0",
  measurementId: "G-EB20LV2RQR",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
