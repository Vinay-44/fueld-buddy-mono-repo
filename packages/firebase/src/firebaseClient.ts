import dotenv from 'dotenv'
import path = require('path');
dotenv.config({path:path.join(__dirname,'../.env')});

import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,AuthError } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export {createUserWithEmailAndPassword,signInWithEmailAndPassword}

export type CustomAuthError = AuthError