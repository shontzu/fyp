<template>
  <div>
    <!-- <div class="viewport"> -->
    <!-- <div class="container"> -->
    <div class="cards-wrapper">
      <!-- AOS (Animation on Scroll) is a library imported in main.js -->
      <div class="cards" v-for="fds in aggregatedFds" :key="fds.id">
        <div
          class="cards"
          v-for="merchant in fds.searchMerchants"
          :key="merchant.id"
        >
          <div
            class="cards"
            v-for="cuisines in merchant.cuisine"
            :key="cuisines.id"
          >
            <!-- the card is from bootstrap library with a touch of vue -->
            <div class="card" v-if="merchant.distanceInKm <= 2">
              <b class="card-title">{{
                merchant.name.toUpperCase().split("-")[0]
              }}</b>
              <img
                :src="merchant.photoHref"
                alt="food"
                style="width: 100%; height: auto"
              />
              <div class="card-body">
                <b class="card-text">
                  <b class="card-title">{{
                    merchant.name.toUpperCase().split("-")[1]
                  }}</b>
                  <h1>{{ merchant.distanceInKm.toFixed(2) }}km</h1>
                  <span style="color: gray; margin: 0"
                    >🕑{{ merchant.estimatedDeliveryTime }}min |
                    {{ merchant.rating }}✰</span
                  >
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
    </div>
    <!-- end of wrapper -->
  </div>
  <!-- end of template -->
</template>

<script>
import fdsData from "../data/GrabFoodData.json";

export default {
  name: "Test",
  data() {
    return {
      aggregatedFds: fdsData,
    };
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