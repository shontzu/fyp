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
    <div v-if="(authenticated && ready)">
      Bookmarks goes here <br>
      <div v-for="(entry) in bookmarks" :key="entry.__idx">
        <b style="color:pink;background:blue">{{entry.name}}</b>
      </div>
    </div>
    <div v-else-if="authenticated">
      Loading
    </div>
    <div v-else>
      Login first suckers
    </div>
  </div>
</template>

<script>
// import { QuerySnapshot } from '@firebase/firestore';
import db,{ replicatedArray,dbPrototypes} from "../firebase.js";
import * as Authentication from "../auth-me.js";
// import * as authentication from "../auth-me.js";

export default {
  name: "Gallery",
  data:function(){
    return {
      authenticated:false,
      bookmarks:[],
      ready:false
    }
  },
  created:function(){
    //try to perform authentication
    this.authenticated=Authentication.loggedIn();
    if(this.authenticated){
      const self=this;
      //load the data
      replicatedArray(
        dbPrototypes.doc(db, Authentication.getUID()),
        this.bookmarks
      );
      this.bookmarks.fromRemote().then(()=>self.ready=true);
    }
  }
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
