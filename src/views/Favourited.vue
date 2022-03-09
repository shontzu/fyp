<template>
  <div>
    <header class="navbar navbar-light bg-warning">
      <img
        src="../assets/Bookmark.png"
        alt="Bookmark"
        style="width: 50%; height: auto"
      />
      RM0.00
    </header>
    <div v-for="index in 10" :key="index">
      <div class="card">
        <div class="card-body">
          <img src="" alt="" />
          <div class="card-title">
            <p class="card-text">MERCHANT: Lorem ipsum dolor sit amet.</p>
            <p class="card-text">FDS</p>
            <p class="card-text">RM0.00</p>
          </div>
          <button class="btn btn-outline-danger">remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { QuerySnapshot } from '@firebase/firestore';
import { firebase, db } from "../firebase.js";
// import * as authentication from "../auth-me.js";

export default {
  name: "Gallery",
  created() {
    db.collection("user")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(function (doc) {
        console.log(doc.id + " : " + doc.data());
      });
  },
};
</script>

<style scoped>
.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-body > div,
.card-body > img {
  width: 40%;
}
</style>