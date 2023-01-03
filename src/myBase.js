import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN_,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    // appId:process.env.REACT_APP_APP_ID
    apiKey: "AIzaSyCkc5LHNEQVf1DDBuMjEkquhxBe2n6Iea8",
    authDomain: "chanwitter-ff835.firebaseapp.com",
    projectId: "chanwitter-ff835",
    storageBucket: "chanwitter-ff835.appspot.com",
    messagingSenderId: "680926974603",
    appId: "1:680926974603:web:1ef2e3b0df41600ac4fa8e"
};

// eslint-disable-next-line no-unused-vars
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
