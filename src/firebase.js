//import firebase from 'firebase/compat/app'
// do not remove manually import firestore DB because
// firebase core library does not include firestore library
//import 'firebase/compat/firestore'
// import '@firebase/auth';
import * as firebase from "firebase/app";
import * as firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket,
  messagingSenderId: process.env.VUE_APP_messagingSenderId,
  appId: process.env.VUE_APP_appId,
  measurementId: process.env.VUE_APP_measurementId,
}

// connect to firebase
firebase.initializeApp(firebaseConfig)
// connect to firestore and set up a reference point connection
const db = firestore.getFirestore();
// ignore timestamp warning in console that comes with Google Firebase update
//db.settings({timestampsInSnapshots:true})
const _ptr=firestore.collection(db,'user');
export const dbUsers = {
  _ptr:_ptr,
  add:firestore.addDoc.bind(null,_ptr),
};
export function replicatedArray(ref,arr){
  arr._push=function(item){
    //overwite push
    //add the item async to the data base and dispatch
    const ptr=Object.assign(item,{});
    ptr.__idx=arr.length;
    arr.push(ptr);
    console.log(`Writing using id=${ptr.__idx}`);
    firestore.updateDoc(ref,{items:firestore.arrayUnion(ptr)}).catch(e=>{
      if(e.toString().includes("No document to update")){
        return firestore.setDoc(ref,{items:[ptr]});
      }
      throw e;
    });
  };
  arr._splice=function(idx){
    firestore.updateDoc(ref,{items:firestore.arrayRemove(this[idx])});
    arr.splice(idx,1);
  }
  arr.sync=function(){
    const obj=this.map(function(e){
      return Object.assign(e,{});
    }).map(function(e,idx){
    e.__idx=idx;
    return e;
  });
    firestore.setDoc(ref,{items:obj});
  }
  arr.fromRemote=async function(){
    (this.length>0&&this.splice(0));
    const doc=await firestore.getDoc(ref);
    if(doc.exists()){
      this.push(...(doc.data().items??[]))
    }
  }
  return arr;
}
export const dbPrototypes=firestore;
export default _ptr;
