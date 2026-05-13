import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgl1dPSYJvbjguHjlkCbJvfVFt8GgjdCs",
  authDomain: "student-survival-ai.firebaseapp.com",
  projectId: "student-survival-ai",
  storageBucket: "student-survival-ai.firebasestorage.app",
  messagingSenderId: "103759488492",
  appId: "1:103759488492:web:ea94cf0612c3087e784cc9",
  measurementId: "G-H17THZ88NX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();