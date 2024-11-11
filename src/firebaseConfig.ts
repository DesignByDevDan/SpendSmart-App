// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJnExEK8_YUz2O354rtCqV9z-OY-jtyGY",
  authDomain: "spendsmart-47691.firebaseapp.com",
  projectId: "spendsmart-47691",
  storageBucket: "spendsmart-47691.firebasestorage.app",
  messagingSenderId: "679211921561",
  appId: "1:679211921561:web:732700132cf81d58140808",
  measurementId: "G-1DD9RQ4FJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Export Firestore instance
