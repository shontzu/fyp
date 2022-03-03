<template>
  <div>
    <h1>{{merchant}}</h1>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-warning" @click="back()">back</button>
      <button type="button" class="btn btn-warning" @click="byRating()">by rating</button>
      <button type="button" class="btn btn-warning" @click="byTime()">by time</button>
      <!-- <button type="button" class="btn btn-warning" @click="byDistance()">by distance</button> -->
      <button type="button" class="btn btn-warning" @click="byPrice()">by price</button>
    </div>
    <div>
      <div v-for="merchant in aggregatedFds" :key="merchant.id">
        <!-- <div v-if="fds.name.includes(merchant)"> -->
          <b>{{merchant.name}}</b>
          <div v-for="provider in merchant.providers" :key="provider.id">
            <span v-if="provider.name=='GrabFood'"><img src="../assets/grabfood.png" alt="grab food"></span>
            <span v-if="provider.name=='Food Panda'"><img src="../assets/foodpanda.png" alt="grab food"></span>
            <span v-if="provider.name=='Air Asia Eats'"><img src="../assets/airasia.png" alt="grab food"></span>
            {{provider.estimatedDeliveryTime}}mins 
            {{provider.distanceInKm}}km
            {{provider.rating}}✰
            RM{{provider.price.toFixed(2)}}
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="bookmark(merchant)">
              Bookmark
            </button>
          </div>
        <!-- </div> -->
      </div>
    </div>        
    
  </div>
</template>

<script>
import db, { replicatedArray, dbPrototypes } from "../firebase.js";
import * as authentication from "../auth-me.js";
import fdsData from "../data/FdsAggregated.json";

export default {
  name: "Compare",
  components: {},
  data() {
    return {
      aggregatedFds: fdsData,
      merchant: this.$route.params,
    };
  },
  created() {
    this.$http.get(this.merchant).then(function (data) {
      console.log(data.body);
    });
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    byRating() {
      console.log(this.$route.params);
    },
    byTime() {},
    byPrice() {},
    bookmark(merchant) {
      const self = this;
      if (!authentication.loggedIn()) {
        authentication.tryToAuth().then(async (e) => {
          replicatedArray(dbPrototypes.doc(db, e.uid), this.cart);
          await self.cart.fromRemote();
          self.dataUp = true;
        });
        return;
      }
      if (!this.cart._push) {
        replicatedArray(
          dbPrototypes.doc(db, authentication.getUID()),
          this.cart
        );
        this.cart.fromRemote().then(() => (self.dataUp = true));
      }
      if (!this.dataUp) {
        alert("Please wait until the data loaded");
        return;
      }
      this.cart._push(merchant);
      console.log(this.cart);
      console.log("added succesfully");
    },
  },
};
</script>

<style scoped>
p{
  box-shadow:1px 2px 3px grey;
  padding:10px;
  margin:10px;
}
img{
  width:100px;
  height:auto;
}
</style>