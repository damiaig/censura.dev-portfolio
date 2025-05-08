// firebase-config.js

// Import Firebase modules
// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
export const db = getFirestore(app);
export const auth = getAuth(app);

// Export db so it can be used in other scripts
 
