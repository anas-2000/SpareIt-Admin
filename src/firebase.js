// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8pi4ERw9SwYqe40Wk0Mz7nXdO7IoFwp4",
    authDomain: "spareit-95633.firebaseapp.com",
    projectId: "spareit-95633",
    storageBucket: "spareit-95633.appspot.com",
    messagingSenderId: "151281330528",
    appId: "1:151281330528:web:fbee7623d218a9df449605",
    measurementId: "G-EV4RXSJXBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;