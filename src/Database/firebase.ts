// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSFsU1miRN6gHpWclmad7I8_hdhAHo8aM",
  authDomain: "coding-contest-64d6b.firebaseapp.com",
  databaseURL: "https://coding-contest-64d6b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "coding-contest-64d6b",
  storageBucket: "coding-contest-64d6b.appspot.com",
  messagingSenderId: "32502145830",
  appId: "1:32502145830:web:b4e8991d6a0616928097e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app,db};