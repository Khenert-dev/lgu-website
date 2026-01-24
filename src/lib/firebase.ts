import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLzDQx79HXWa4fWwifNARFtvyfZsGW2Lo",
  authDomain: "lgu-website-5c1d9.firebaseapp.com",
  projectId: "lgu-website-5c1d9",
  storageBucket: "lgu-website-5c1d9.firebasestorage.app",
  messagingSenderId: "1065849684849",
  appId: "1:1065849684849:web:eb36de5a92c020f778ecd0",
  measurementId: "G-GGJKZBY02B"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
