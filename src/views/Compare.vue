<template>
  <div>
    <h1>{{merchant}}</h1>
    <!-- <div v-for="merchant in effectiveFdsData.splice(0,1)" :key="merchant.id">
      <img :src="merchant.providers[0].photoHref" alt="restaurants" style="width:100%; height:auto;" />
    </div> -->
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-outline-warning" @click="back()">back</button>
      <button type="button" class="btn btn-warning" @click="byRating()">rating</button>
      <button type="button" class="btn btn-warning" @click="byTime()">time</button>
      <button type="button" class="btn btn-warning" @click="byPrice()">price</button>
      <button type="button" class="btn btn-warning" @click="feedThis(merchant)">feed</button>
    </div>
    <div>


      <div v-for="merchant in effectiveFdsData" :key="merchant.id" class="card">
          <img :src="merchant.providers[0].photoHref" alt="restaurants" style="width:100%; height:auto;" />
          <h3 class="card-title">{{merchant.name.split("-")[1]}}</h3>
          <div v-for="provider in merchant.providers" :key="provider.id"  class="card-body">
            <span v-if="provider.name=='GrabFood'"><img src="../assets/grabfood.png" alt="grab food"></span>
            <span v-else-if="provider.name=='Food Panda'"><img src="../assets/foodpanda.png" alt="food panda"></span>
            <span v-else-if="provider.name=='Air Asia Eats'"><img src="../assets/airasia.png" alt="air asia"></span>
            <div>
              {{provider.estimatedDeliveryTime}}mins
              {{provider.distanceInKm}}km
              {{provider.rating}}✰
              RM{{provider.price.toFixed(2)}}
            </div>
            <button type="button" class="btn btn-sm btn-outline-secondary" @click="bookmark(provider,merchant.name, merchant.providers[0].photoHref)">
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
      sortFunc:0
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    byRating() {
       this.sortFunc=1;
   },
    byTime() {
      this.sortFunc=3;
    },
    byPrice() {
      this.sortFunc=2;
    },
    feedThis() {
       this.$router.push({
        path: "/feed/" + this.merchant});
        console.log("post in feed about " + this.merchant);
    },
    bookmark(merchant,merchantName, merchantPhotoHref) {
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
      merchant.photoHref=merchantPhotoHref;
      this.cart._push(merchant);
      console.log(this.cart);
      console.log("added succesfully");
    },
  },
    computed:{
    effectiveFdsData:function(){
      let tmp= this.fdsData.filter(
          (y) => y.name.split("-")[0].toUpperCase().includes(this.merchant.toUpperCase())
        );
        switch(this.sortFunc){
          case 1:
            tmp.forEach(y=>y.providers=y.providers.sort((a,b)=>{
              console.log("sorted by rating " + JSON.stringify(a,b))
              return b.rating - a.rating
            }));
            break;
            case 2:
              tmp.forEach(y=>y.providers=y.providers.sort((a,b)=>{
                console.log("sorted by price " + JSON.stringify(a,b))
                return a.price-b.price
                }));
            break;
            case 3:
              tmp.forEach(y=>y.providers=y.providers.sort((a,b)=>{
                console.log("sorted by time " + JSON.stringify(a,b))
                return a.estimatedDeliveryTime - b.estimatedDeliveryTime
              }));
            break;
        }
        return tmp;
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
