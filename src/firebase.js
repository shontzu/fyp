import * as firebase from 'firebase/app'
import * as firestore from 'firebase/firestore'
// import { ref, onUnmounted } from 'vue'

const firebaseConfig = {
  // apiKey: process.env.VUE_APP_apiKey,
  // authDomain: process.env.VUE_APP_authDomain,
  // projectId: process.env.VUE_APP_projectId,
  // storageBucket: process.env.VUE_APP_storageBucket,
  // messagingSenderId: process.env.VUE_APP_messagingSenderId,
  // appId: process.env.VUE_APP_appId,
  // measurementId: process.env.VUE_APP_measurementId,

  //somehow need to hardcode the configs, otherwise a lot of errors -_- !!!!!!
  apiKey: 'AIzaSyD4yq1pQ04n6cWLEhXUbtdCKCvQMtQ8R68',
  authDomain: 'fyp-897147.firebaseapp.com',
  databaseURL:
    'https://fyp-897147-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'fyp-897147',
  storageBucket: 'fyp-897147.appspot.com',
  messagingSenderId: '1045657372241',
  appId: '1:1045657372241:web:b90930da4bb62312989a70',
  measurementId: 'G-Y0MN7F2ZKV',
}

// connect to firebase
export const app = firebase.initializeApp(firebaseConfig)
// connect to firestore and set up a reference point connection
const db = firestore.getFirestore()
// Initialize Collection
const _ptr = firestore.collection(db, 'user')

// ADD NEW USER WHEN REGISTER
export const dbUsers = {
  _ptr: _ptr,
  add: firestore.addDoc.bind(null, _ptr),
}

export function replicatedArray(ref, arr) {
  arr._push = function (item) {
    //WRITE BOOKMARKED ITEM
    //add the item async to the data base and dispatch
    const ptr = Object.assign(item, {})
    ptr.__idx = arr.length
    arr.push(ptr)
    console.log(`Writing using id=${ptr.__idx}`)
    firestore
    .updateDoc(ref, { items: firestore.arrayUnion(ptr) })
    .catch((e) => {
      if (e.toString().includes('No document to update')) {
        return firestore.setDoc(ref, { items: [ptr] })
      }
      throw e
    })
  }

  // DELETE BOOKMARKED ITEM
  arr._splice = function (idx) {
    firestore.updateDoc(ref, { items: firestore.arrayRemove(this[idx]) })
    arr.splice(idx, 1)
  }

  arr.sync = function () {
    const obj = this.map(function (e) {
      return Object.assign(e, {})
    }).map(function (e, idx) {
      e.__idx = idx
      return e
    })
    firestore.setDoc(ref, { items: obj })
  }

  //GET BOOKMARKED ITEMS
  arr.fromRemote = async function () {
    this.length > 0 && this.splice(0)
    const doc = await firestore.getDoc(ref)
    if (doc.exists()) {
      this.push(...(doc.data().items ?? []))
    }
  }
  return arr
}

// CREATE POST
export const createPost = ( post ) => {
  console.log('create post ' + JSON.stringify(post))
  return _ptr.update({post:post})
}

// READ POST
export const getPost = async (id) => {
  console.log('read post')
  const post = await _ptr.post(id).get()
  return post.exist ? post.data() : null
}

// UPDATE POST
export const updatePost = (id, postTitle, postMsg) => {
  console.log('update post ' + postTitle + " " + postMsg)
  return _ptr.post(id).update(postTitle, postMsg)
}

// DELETE POST
export const deletePost = (post, id) => {
  console.log('delete post' + JSON.stringify(post))
  return _ptr.post(id).delete()
}

export const dbPrototypes = firestore
export default _ptr
