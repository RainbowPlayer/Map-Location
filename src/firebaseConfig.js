import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaHfzqHcI_ZQ7aBxcfi9wstCYq1klLcCI",
  authDomain: "maplocation-24d9e.firebaseapp.com",
  databaseURL: "https://maplocation-24d9e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "maplocation-24d9e",
  storageBucket: "maplocation-24d9e.appspot.com",
  messagingSenderId: "593091066056",
  appId: "1:593091066056:web:dcd8326a67936968538dfd"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };