import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { envs } from "./env";

const firebaseConfig = {
  apiKey: envs.VITE_FIREBASE_API_KEY,
  authDomain: envs.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envs.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envs.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envs.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envs.VITE_FIREBASE_APP_ID,
};

export const appFB = initializeApp(firebaseConfig);
export const authFB = getAuth(appFB);
export const storeFB = getFirestore(appFB);
