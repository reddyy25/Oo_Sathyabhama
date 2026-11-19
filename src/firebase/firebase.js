import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
const app = initializeApp(firebaseConfigured ? config : { apiKey:'demo-placeholder', authDomain:'demo-placeholder.firebaseapp.com', projectId:'demo-placeholder', storageBucket:'demo-placeholder.appspot.com', appId:'demo-placeholder' });
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
