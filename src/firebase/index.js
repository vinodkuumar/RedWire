import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAx3HQexDskPQ_pb_h2o2xMQ9Ea8u0tx9I",
    authDomain: "redwire-7d8a9.firebaseapp.com",
    projectId: "redwire-7d8a9",
    storageBucket: "redwire-7d8a9.appspot.com",
    messagingSenderId: "108502367731",
    appId: "1:108502367731:web:298231131b24e6567ee686",
    measurementId: "G-5ZG8M5WTX9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  const DB = firebase.firestore();
  const userCollection = DB.collection('users');

  export {
      firebase,
      userCollection
  }