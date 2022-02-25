<template>
  <div>
    <button v-on:click="NavigateTo('gallery')">continue shopping</button>
    <!-- <div class="cards" v-for="fds in cart" :key="fds.id"> -->
    <div class="cards" v-for="(merchant, index) in cart" :key="index">
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
              {{ merchant.distanceInKm.toFixed(2) }}km | {{ merchant.rating }}✰
            </p>
            <p v-if="merchant.halal == true" style="color: cadetblue">halal</p>
            <p v-else style="color: salmon">non-halal</p>
          </b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fdsData from "../data/GrabFoodData.json";

export default {
  data() {
    return {
      cart: [],
      aggregatedFds: fdsData,
    };
  },
};
</script>

<style>
</style>