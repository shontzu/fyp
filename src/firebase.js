import firebase from 'firebase/compat/app'
// do not remove manually import firestore DB because  
// firebase core library does not include firestore library
import 'firebase/compat/firestore'
// import '@firebase/auth';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
}

// connect to firebase 
firebase.initializeApp(firebaseConfig)
// connect to firestore and set up a reference point connection
const db = firebase.firestore();
// ignore timestamp warning in console that comes with Google Firebase update
db.settings({timestampsInSnapshots:true})

export const dbUsers = db.collection('user');
export default db;