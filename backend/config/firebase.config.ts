// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { get } from "http";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC04j8vTc24z29NzdcUHtBHudImFifxpz8",
  authDomain: "ar-custom-car-alloy-wheels.firebaseapp.com",
  projectId: "ar-custom-car-alloy-wheels",
  storageBucket: "ar-custom-car-alloy-wheels.firebasestorage.app",
  messagingSenderId: "66865019032",
  appId: "1:66865019032:web:986ad5f3c7c67f65c178ed",
  measurementId: "G-QN3BHGM8NT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const db = getFirestore(app)
export { app, auth,db }