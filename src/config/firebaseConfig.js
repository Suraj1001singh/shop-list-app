// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURE_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


//secrete keys

// REACT_APP_API_KEY=AIzaSyCCbYxiXTxRkiZehoFLY6CTZlOJ13_hMRA
// REACT_APP_AUTH_DOMAIN=shop-list-app-5406c.firebaseapp.com
// REACT_APP_DB_URL=https://shop-list-app-5406c-default-rtdb.firebaseio.com
// REACT_APP_PROJECT_ID=shop-list-app-5406c
// REACT_APP_STORAGE_BUCKET=shop-list-app-5406c.appspot.com
// REACT_APP_MSG_ID=183298806749
// REACT_APP_APP_ID=1:183298806749:web:1d0332610a750604b1dc34
// REACT_APP_MEASURE_ID=G-CCHBE9J9ES
