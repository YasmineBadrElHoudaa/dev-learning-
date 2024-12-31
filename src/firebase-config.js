// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore" ;
import {getStorage} from "firebase/storage" ;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHaNL5Ynmwxk1gvMdFKhEir0m2IUFkjl0",
  authDomain: "monprojet-f328e.firebaseapp.com",
  projectId: "monprojet-f328e",
  storageBucket: "monprojet-f328e.appspot.com",
  messagingSenderId: "649226369169",
  appId: "1:649226369169:web:8c8ff1a143cd3614a3e730"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app) ;
const db = getFirestore(app);
const storage = getStorage(app) ;
export { auth , db, storage} ;
