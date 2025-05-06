// firebase-config.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD5stguKLUT87z7U7bPG1LDEabTq-gljQE",
    authDomain: "censura-dev-portfolio.firebaseapp.com",
    projectId: "censura-dev-portfolio",
    storageBucket: "censura-dev-portfolio.firebasestorage.app",
    messagingSenderId: "762507167160",
    appId: "1:762507167160:web:5066f6513f6fa08826fb4d",
    measurementId: "G-17BM0PWGGL"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export db so it can be used in other scripts
export { db };
