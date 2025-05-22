import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3_slXHmS1UvN34uzp7acQdqUT576Oj38",
  authDomain: "recipe-6b435.firebaseapp.com",
  projectId: "recipe-6b435",
  storageBucket: "recipe-6b435.firebasestorage.app", // Updated to match the correct bucket
  messagingSenderId: "770810066460",
  appId: "1:770810066460:web:58e523827c92c95bb951d9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);