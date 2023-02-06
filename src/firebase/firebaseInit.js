import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsQa99zRvSO9p_mbe4i6_Alm4TWdX8YLs",
    authDomain: "invoice-app-4cc9f.firebaseapp.com",
    projectId: "invoice-app-4cc9f",
    storageBucket: "invoice-app-4cc9f.appspot.com",
    messagingSenderId: "567352701382",
    appId: "1:567352701382:web:c9a5412829dd8203e1c2c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;