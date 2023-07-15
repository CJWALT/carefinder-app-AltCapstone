//@ts-ignore;

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';


const firebaseConfig = { 
    apiKey: "AIzaSyDNuU6p8rnYN3PklrZs9lJ7UrmXsGOUp10",
    authDomain: "carefinder-alt.firebaseapp.com",
    projectId: "carefinder-alt",
    storageBucket: "carefinder-alt.appspot.com",
    messagingSenderId: "786589492821",
    appId: "1:786589492821:web:5ffce84fbc6465e2a5d6dc",
    measurementId: "G-JKT9H44RJ7"
}; 


const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 

export {auth};