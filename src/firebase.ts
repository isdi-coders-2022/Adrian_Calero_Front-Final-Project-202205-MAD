import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB6PYvojYI0dHrkDv32MFZQO75RbsC9sdc",
    authDomain: "proyect-files.firebaseapp.com",
    projectId: "proyect-files",
    storageBucket: "proyect-files.appspot.com",
    messagingSenderId: "774219032703",
    appId: "1:774219032703:web:6a3cfad0a470c3c04eb74a",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
