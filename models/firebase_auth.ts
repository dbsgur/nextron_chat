import { initializeApp, getApps, getApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD-jt_VueUd1VoBZ1Aw5HLdbhlYRMWzxr0",
  authDomain: "maum-nextron.firebaseapp.com",
  projectId: "maum-nextron",
  storageBucket: "maum-nextron.appspot.com",
  messagingSenderId: "135080859887",
  appId: "1:135080859887:web:5fb4b936897b64da9aa31a",
  measurementId: "G-CZS9CGCJ2V",
  databaseURL: "https://maum-nextron-default-rtdb.firebaseio.com",
  // apiKey: process.env.FIREBASE_APIKEY,
  // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.FIREBASE_PROJECT_ID,
  // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.FIREBASE_APP_ID,
  // measurementId: process.env.FIREBASE_MEASURE_MENTID,
};

// export const fbApp = initializeApp(firebaseConfig);
const fbApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// auth 설정 필수!!
// const auth = getAuth();

export const fbAuth = getAuth(fbApp);

//Email 회원가입
export const signupEmail = (email, password) => {
  return createUserWithEmailAndPassword(fbAuth, email, password);
};

//Email 로그인
export const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(fbAuth, email, password);
};

export const dataBase = getDatabase(fbApp);

export function getChats() {
  let chats = [];
  return chats;
}
