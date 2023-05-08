import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArOyWtcLIrR9pMmXm7du-U9vo1PU-Zdkw",
  authDomain: "linkedin-clone-4ae2b.firebaseapp.com",
  projectId: "linkedin-clone-4ae2b",
  storageBucket: "linkedin-clone-4ae2b.appspot.com",
  messagingSenderId: "1090660714885",
  appId: "1:1090660714885:web:33713d8cd8538b75e55cec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
