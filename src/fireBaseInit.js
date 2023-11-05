import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANrt8tRPtOBrlea6K5d5ZAxuDYXGUPH9k",
  authDomain: "blogging-app-1508.firebaseapp.com",
  projectId: "blogging-app-1508",
  storageBucket: "blogging-app-1508.appspot.com",
  messagingSenderId: "746398703058",
  appId: "1:746398703058:web:77161da6c5b65e38353c0b"
};


const app = initializeApp(firebaseConfig);  
export const db = getFirestore(app);