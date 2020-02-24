import firebase from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyAPXg_dnf95gmpWqujeUrMpEWs9NaxujI0",
    authDomain: "education-7912f.firebaseapp.com",
    databaseURL: "https://education-7912f.firebaseio.com",
    projectId: "education-7912f",
    storageBucket: "education-7912f.appspot.com",
    messagingSenderId: "478062899715",
    appId: "1:478062899715:web:d0a793d65f0beedfdcd436"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);