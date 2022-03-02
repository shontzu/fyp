<template>
  <div>
    <div class="cards-wrapper">
      <button v-if="page === 'gallery'" v-on:click="NavigateTo('cart')">
        view favorited ({{ cart.length }})
      </button>
      <!-- AOS (Animation on Scroll) is a library imported in main.js -->
      <div v-if="page === 'gallery'">
        <div class="cards" v-for="fds in aggregatedFds" :key="fds.id">
          <div
            class="cards"
            v-for="(merchant, index) in fds.searchMerchants"
            :key="index"
          >
            <!-- the card is from bootstrap library with a touch of vue -->
            <div class="card">
              <b class="card-title">{{
                merchant.name.toUpperCase().split("-")[0]
              }}</b>
              <img
                :src="merchant.photoHref"
                alt="food"
                style="width: 100%; height: auto; object-fit: cover"
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
                  <b class="card-title"
                    >📍{{ merchant.name.toUpperCase().split("-")[1] }}</b
                  >
                  <p style="color: gray; margin: 0">
                    {{ merchant.estimatedDeliveryTime }}min |
                    {{ merchant.distanceInKm.toFixed(2) }}km |
                    {{ merchant.rating }}✰
                  </p>
                  <p v-if="merchant.halal == true" style="color: cadetblue">
                    halal
                  </p>
                  <p v-else style="color: salmon">non-halal</p>
                </b>
              </div>
            </div>
          </div>
        </div>
        <!-- end of card -->
      </div>

      <div v-if="page === 'cart'">
        <button v-on:click="NavigateTo('gallery')">continue shopping</button>
        <!-- <div class="cards" v-for="fds in cart" :key="fds.id"> -->
        <div class="cards" v-for="merchant in cart" :key="merchant.id">
          <!-- the card is from bootstrap library with a touch of vue -->
          <div class="card">
            <b class="card-title">{{
              merchant.name.toUpperCase().split("-")[0]
            }}</b>
            <img
              :src="merchant.photoHref"
              alt="food"
              style="width: 100%; height: auto; object-fit: cover"
            />

            <button v-on:click="RemoveFromFav(merchant)">
              Remove from favourites
            </button>
            <div class="card-body">
              <b class="card-text">
                <b class="card-title"
                  >📍{{ merchant.name.toUpperCase().split("-")[1] }}</b
                >
                <p style="color: gray; margin: 0">
                  {{ merchant.estimatedDeliveryTime }}min |
                  {{ merchant.distanceInKm.toFixed(2) }}km |
                  {{ merchant.rating }}✰
                </p>
                <p v-if="merchant.halal == true" style="color: cadetblue">
                  halal
                </p>
                <p v-else style="color: salmon">non-halal</p>
              </b>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- end of wrapper -->
  </div>
  <!-- end of template -->
</template>

<script>
import fdsData from "../data/GrabFoodData.json";
import db, { replicatedArray, dbPrototypes } from "../firebase.js";
import * as authentication from "../auth-me.js";
export default {
  name: "Test",
  components: {},
  data() {
    return {
      page: "gallery",
      cart: [],
      aggregatedFds: fdsData,
      cartLength: 0,
      dataUp: false,
    };
  },
  methods: {
    findDeals(merchant) {
      this.$router.push({ path: "/compare/" + merchant.name.split("-")[0], params: { /* merchant: merchant */ } });
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

button {
  font-size: 0.5rem;
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
