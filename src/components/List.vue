<template>
  <div>
    <div class="cards-wrapper">
      <div
        class="cards"
        v-for="merchant in effectiveFdsData"
        :key="merchant.id"
      >
        <div class="card" v-if="shouldRender(merchant.providers[0])">
          <h5 class="card-title">
            {{ merchant.name.toUpperCase().split("-")[0] }}
          </h5>
          <img
            :src="merchant.providers[0].photoHref"
            alt="food"
            style="width: 100%; height: auto"
          />
          <!-- <div class="card-body">
            <b class="card-text">
              <b class="card-title">{{
                merchant.providers[0].name.toUpperCase().split("-")[1]
              }}</b>
              <p style="color: gray; margin: 0">
                {{ merchant.providers[0].estimatedDeliveryTime }}mins |
                {{ merchant.providers[0].distanceInKm.toFixed(2) }}km |
                {{ merchant.providers[0].rating }}✰
              </p>
            </b>
          </div> -->
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            @click="findDeals(merchant)"
          >
            Find deals
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import db, { replicatedArray, dbPrototypes } from "../firebase.js";
// import * as authentication from "../auth-me.js";

export default {
  name: "List",
  props: {
    type: {
      default: function () {
        return "default";
      },
    },
    fdsData: {
      required: true,
    },
    query: {
      default: "",
    },
  },
  methods: {
    shouldRender(merchant) {
      if (this.type === "shortest_time") {
        return merchant.estimatedDeliveryTime < 40;
      } else if (this.type === "rating") {
        return merchant.rating > 4.5;
      } else if (this.type === "distance") {
        return merchant.distanceInKm <= 2;
      } else {
        return true;
      }
    },
    findDeals(merchant) {
      this.$router.push({
        path: "/compare/" + merchant.name.split("-")[0],
        params: {
          /* merchant: merchant */
        },
      });
    },
    // bookmark(merchant) {
    //   const self = this;
    //   if (!authentication.loggedIn()) {
    //     authentication.tryToAuth().then(async (e) => {
    //       replicatedArray(dbPrototypes.doc(db, e.uid), this.cart);
    //       await self.cart.fromRemote();
    //       self.dataUp = true;
    //     });
    //     return;
    //   }
    //   if (!this.cart._push) {
    //     replicatedArray(
    //       dbPrototypes.doc(db, authentication.getUID()),
    //       this.cart
    //     );
    //     this.cart.fromRemote().then(() => (self.dataUp = true));
    //   }
    //   if (!this.dataUp) {
    //     alert("Please wait until the data loaded");
    //     return;
    //   }
    //   this.cart._push(merchant);
    //   console.log(this.cart);
    //   console.log("added succesfully");
    // },
    RemoveFromFav(merchant) {
      this.cart._splice(this.cart.indexOf(merchant), 1);
      console.log(this.cart);
      console.log("removed successfully");
    },
    NavigateTo(page) {
      this.page = page;
    },
  },
  computed:{
    effectiveFdsData:function(){
      //construct the aggregated one with names merged
      //name
      let names=this.fdsData.map(y=>y.name.split("-")[0].trim()).reduce((p,v)=>{p.indexOf(v)==-1&&p.push(v);return p;},[]);
      names=names.filter(y=>!this.query||y.toUpperCase().includes(this.query.toUpperCase())).map(name=>{
        for(const data of this.fdsData){
          if(data.name.split("-")[0].trim()==name){
            return data;
          }
        }
      })
      return names;
      // return this.fdsData.filter(
      //     (y) => !this.query || y.name.toUpperCase().includes(this.query.toUpperCase())
      //   );
    }
  }
};
</script>

<style scoped>
.cards-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display:flex;
  align-items: center;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.cards-wrapper::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.cards-wrapper {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.cards {
  display: inline-block;
}
.card {
  max-height: 100%;
  width: 15vw;
  margin-left: 10px;
  box-shadow: 1px 1px 3px gray;
  overflow: hidden;
}
p,
button {
  font-size: 0.6rem;
}
@media screen and (max-width: 1000px) {
  .card {
    min-width: 30vw;
    font-size: 0.5rem;
  }
  div.card-body {
    padding: 0;
  }
}
</style>
