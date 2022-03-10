<template>
  <div>
    <h1>{{merchant}}</h1>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-warning" @click="back()">back</button>
      <button type="button" class="btn btn-warning" @click="byRating()">by rating</button>
      <button type="button" class="btn btn-warning" @click="byTime()">by time</button>
      <button type="button" class="btn btn-warning" @click="byPrice()">by price</button>
    </div>
    <div>
      <div v-for="merchant in effectiveFdsData" :key="merchant.id" class="card">
          <h3 class="card-title">{{merchant.name.split("-")[1]}}</h3>
          <div v-for="provider in merchant.providers" :key="provider.id"  class="card-body">
            <span v-if="provider.name=='GrabFood'"><img src="../assets/grabfood.png" alt="grab food"></span>
            <span v-else-if="provider.name=='Food Panda'"><img src="../assets/foodpanda.png" alt="grab food"></span>
            <span v-else-if="provider.name=='Air Asia Eats'"><img src="../assets/airasia.png" alt="grab food"></span>
            <div>
              {{provider.estimatedDeliveryTime}}mins
              {{provider.distanceInKm}}km
              {{provider.rating}}✰
              RM{{provider.price.toFixed(2)}}
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="bookmark(provider,merchant.name)">
              Bookmark
            </button>
          </div>
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
      cart: [],
      fdsData: fdsData,
      merchant: this.$route.params.merchant,
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    byRating() {
      console.log(this.effectiveFdsData);
   },
    byTime() {
      console.log(this.effectiveFdsData);
    },
    byPrice() {
      console.log(this.effectiveFdsData);
      },
    bookmark(merchant,merchantName) {
      const self = this;
      console.log(merchant);
      if (!authentication.loggedIn()) {
        authentication.tryToAuth().then(async (e) => {
          replicatedArray(dbPrototypes.doc(db, e.uid), this.cart);
          await self.cart.fromRemote();
          self.dataUp = true;
        });
        return;
      }
      if (!this.dataUp) {
        alert("Please wait until the data loaded");
        return;
      }
      merchant.merchantName=merchantName;
      this.cart._push(merchant);
      console.log(this.cart);
      console.log("added succesfully");
    },
  },
    computed:{
    effectiveFdsData:function(){
      return this.fdsData.filter(
          (y) => y.name.split("-")[0].toUpperCase().includes(this.merchant.toUpperCase())
        );
    }
  },
  created:function(){
    const self=this;
    replicatedArray(
      dbPrototypes.doc(db, authentication.getUID()),
      this.cart
    );
    this.cart.fromRemote().then(() => (self.dataUp = true));
  }
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

.card-body{
  display:flex;
  align-items: center;
  justify-content: space-around;
}
</style>
