// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeztKxQrwhwx6ztbm0WhcVq51kbMNEpzw",
  authDomain: "cineflix-gpt-e9834.firebaseapp.com",
  projectId: "cineflix-gpt-e9834",
  storageBucket: "cineflix-gpt-e9834.appspot.com",
  messagingSenderId: "532877917635",
  appId: "1:532877917635:web:d74922038758ec49fa9176",
  measurementId: "G-KXMTV4RTJS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();