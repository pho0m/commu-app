import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH,
  databaseURL: process.env.REACT_APP_PROJECT_ID,
  projectId: process.env.REACT_APP_STORAGE_BUCKET,
  storageBucket: process.env.REACT_APP_MESSAGING_ID,
  messagingSenderId: process.env.REACT_APP_APPID,
  appId: process.env.REACT_APP_DB,
};

console.log(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
