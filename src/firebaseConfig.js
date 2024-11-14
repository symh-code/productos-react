import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDY8AtuRiqZSVT2R57XxpPMqOgSUjNKigM",
  authDomain: "crud-webdevelopment.firebaseapp.com",
  projectId: "crud-webdevelopment",
  storageBucket: "crud-webdevelopment.firebasestorage.app",
  messagingSenderId: "857546157670",
  appId: "1:857546157670:web:e7baa67810d3c51b2207a7",
  measurementId: "G-YB8DZ4YQYJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)


