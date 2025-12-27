import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredEnv = [
    { key: "VITE_FIREBASE_API_KEY", value: firebaseConfig.apiKey },
    { key: "VITE_FIREBASE_AUTH_DOMAIN", value: firebaseConfig.authDomain },
    { key: "VITE_FIREBASE_PROJECT_ID", value: firebaseConfig.projectId },
    { key: "VITE_FIREBASE_APP_ID", value: firebaseConfig.appId },
];

const missing = requiredEnv.filter((item) => !item.value).map((item) => item.key);
if (missing.length > 0) {
    throw new Error(`Missing Firebase configuration values: ${missing.join(", ")}`);
}

export const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
