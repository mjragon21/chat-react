import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAIvEuji73vGJS-qSoqEfdwMNcwUCcMoB8",
  authDomain: "react-chat-c32b4.firebaseapp.com",
  projectId: "react-chat-c32b4",
  storageBucket: "react-chat-c32b4.appspot.com",
  messagingSenderId: "208861712602",
  appId: "1:208861712602:web:c5f09e6cecb2754eaf95e3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();