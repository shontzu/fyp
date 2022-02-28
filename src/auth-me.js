import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export async function tryToAuth(){
  let result=auth.currentUser??await signInWithPopup(auth, provider);
  return {
    uid:result.uid
  }
}
export function logout(){
  return auth.signOut();
}
export function loggedIn(){
  return !(!auth.currentUser);
}
export function getUID(){
  return auth.currentUser?.uid;
}
