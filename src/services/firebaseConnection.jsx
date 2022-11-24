import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBWyTLAdIPqNV4mNVqcuWhFr5RocovK-OQ",
  authDomain: "devlinks-6c601.firebaseapp.com",
  projectId: "devlinks-6c601",
  storageBucket: "devlinks-6c601.appspot.com",
  messagingSenderId: "559662987846",
  appId: "1:559662987846:web:982aa07e7cdf2003ece847",
  measurementId: "G-SRE23WVJVH"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export{db, auth}