<template>
  <div>
    <div class="cards-wrapper">
      <!-- AOS (Animation on Scroll) is a library imported in main.js -->
      <div
        class="cards"
        v-for="merchant in fdsData.filter(
          (y) => !query || y.name.toUpperCase().includes(query.toUpperCase())
        )"
        :key="merchant.id"
      >
        <!-- <div
          class="cards"
          v-for="provider in merchant.providers"
          :key="`${provider.name}#${merchant.name}#${type}`"
        > -->
        <!-- the card is from bootstrap library with a touch of vue -->
        <div class="card" v-if="shouldRender(merchant.providers[0])">
          <h5 class="card-title">
            <!-- {{ merchant.name.toUpperCase().split("-")[0] }} -->
          </h5>
          <img
            :src="merchant.providers[0].photoHref"
            alt="food"
            style="width: 100%; height: auto"
          />
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="findDeals(merchant)"
            >
              Find deals
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-secondary"
              @click="bookmark(merchant)"
            >
              Bookmark
            </button>
          </div>
          <div class="card-body">
            <b class="card-text">
              <b class="card-title">{{
                merchant.providers[0].name.toUpperCase().split("-")[1]
              }}</b>
              <p style="color: gray; margin: 0">
                {{ merchant.providers[0].estimatedDeliveryTime }}mins |
                {{ merchant.providers[0].distanceInKm.toFixed(2) }}km |
                {{ merchant.providers[0].rating }}✰
              </p>
              <!-- <p v-if="merchant.halal == true" style="color: cadetblue">halal</p>
                <p v-else style="color: salmon">non-halal</p> -->
              <!-- <p v-if="provider.name=='GrabFood'" style="color: darkgreen">{{ provider.name }}</p>
                <p v-if="provider.name=='Food Panda'" style="color: hotpink">{{ provider.name }}</p>
                <p v-if="provider.name=='Air Asia Eats'" style="color: red">{{ provider.name }}</p> -->
            </b>
          </div>
        </div>
      </div>
    </div>
    <!-- end of card -->
  </div>
  <!-- </div> -->
  <!-- end of template -->
</template>

<script>
import db, { replicatedArray, dbPrototypes } from "../firebase.js";
import * as authentication from "../auth-me.js";

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
    RemoveFromFav(merchant) {
      this.cart._splice(this.cart.indexOf(merchant), 1);
      console.log(this.cart);
      console.log("removed successfully");
    },
    NavigateTo(page) {
      this.page = page;
    },
  },
};
</script>

<style scoped>
.cards-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
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
