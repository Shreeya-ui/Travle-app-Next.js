import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Ensure signInWithPopup is imported

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEuc2RXF17amOTmgu0izLOlVzFSrsz5rc",
  authDomain: "travle-app-86161.firebaseapp.com",
  projectId: "travle-app-86161",
  storageBucket: "travle-app-86161.firebasestorage.app",
  messagingSenderId: "452740021413",
  appId: "1:452740021413:web:7e99075e2a71dc0c44214c",
  measurementId: "G-GPF541NNBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export the necessary objects
export { auth, googleProvider, signInWithPopup };
