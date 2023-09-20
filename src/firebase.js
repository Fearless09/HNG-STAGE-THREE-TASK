// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDIzAbHtMSizLb9HkG4ZKvDlu-3bOJ59wo",
    authDomain: "hngx-stage-three.firebaseapp.com",
    projectId: "hngx-stage-three",
    storageBucket: "hngx-stage-three.appspot.com",
    messagingSenderId: "654012203951",
    appId: "1:654012203951:web:1e6465e0adf3dfed23a55a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);