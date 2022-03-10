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
    <div v-if="authenticated && ready">
      <!-- Bookmarks goes here -->
      <div v-for="entry in bookmarks" :key="entry.__idx" class="cards">
        <img :src="entry.photoHref" alt="restaurants" />
        {{ entry.merchantName }} <br />
        {{ entry.distanceInKm }}km {{ entry.rating }}✰ RM{{ entry.price.toFixed(2)}}
        <button
          class="btn btn-sm btn-outline-danger"
          @click="RemoveFromFav(entry)"
        >
          Remove
        </button>
      </div>
    </div>
    <div v-else-if="authenticated">Loading</div>
    <div v-else>
      <button @click="loginPage()" class="btn btn-outline-danger">
        Please log in first :)
      </button>
    </div>
  </div>
</template>

<script>
import db, { replicatedArray, dbPrototypes } from "../firebase.js";
import * as Authentication from "../auth-me.js";

export default {
  name: "Gallery",
  data: function () {
    return {
      authenticated: false,
      bookmarks: [],
      ready: false,
    };
  },
  created: function () {
    //try to perform authentication
    this.authenticated = Authentication.loggedIn();
    if (this.authenticated) {
      const self = this;
      //load the data
      replicatedArray(
        dbPrototypes.doc(db, Authentication.getUID()),
        this.bookmarks
      );
      this.bookmarks.fromRemote().then(() => (self.ready = true));
    }
  },
  methods: {
    loginPage() {
      this.$router.push('/account')
      // or code below to login on-the-spot without redirecting to account page
      // const self = this;
      // if (!Authentication.loggedIn()) {
      //   Authentication.tryToAuth().then(async (e) => {
      //     replicatedArray(dbPrototypes.doc(db, e.uid), this.cart);
      //     await self.cart.fromRemote();
      //     self.dataUp = true;
      //   });
      //   return;
      // }
    },
    RemoveFromFav(entry) {
      this.bookmarks._splice(this.bookmarks.indexOf(entry), 1);
      console.log(this.bookmarks);
      console.log("removed successfully");
    },
  },
};
</script>

<style scoped>
.cards {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 2px 3px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.6rem;
}
</style>
