import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA_r0EfXEpm_6bHAdqUs0toA0hSn7zAC9k",
    authDomain: "your-solution-cd707.firebaseapp.com",
    projectId: "your-solution-cd707",
    storageBucket: "your-solution-cd707.appspot.com",
    messagingSenderId: "840110284623",
    appId: "1:840110284623:web:eb98e706063b07bac7af3a",
    measurementId: "G-J18Y12HXRM",
};

export const appStorage = initializeApp(firebaseConfig);
const analytics = getAnalytics(appStorage);
