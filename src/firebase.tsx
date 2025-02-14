import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔥 Replace this with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDE2Wa39m50rH22FT50MQVOs-d5pdSrrTg",
  authDomain: "inivitationsite.firebaseapp.com",
  projectId: "inivitationsite",
  storageBucket: "inivitationsite.firebasestorage.com",
  messagingSenderId: "537274451373",
  appId: "1:537274451373:web:c4c3c97a04168359704d24",
  measurementId: "G-8CECQPFWJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
