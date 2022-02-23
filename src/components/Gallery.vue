<template>
  <div>
    <div class="viewport">
      <div class="container">
        <!-- AOS (Animation on Scroll) is a library imported in main.js -->
        <div
          data-aos="flip-left"
          data-aos-duration="1500"
          v-for="restaurant in restaurants"
          v-bind:key="restaurant._id"
        >
          <!-- <md-ripple> -->
            <!-- the card is from bootstrap library with a touch of vue -->
            <div class="card">
              <b class="card-title">{{
                restaurant.restaurant.toUpperCase()
              }}</b>
              <img
                src="../assets/sample.jpg"
                alt="food"
                style="width: 100%; height:auto"
              />
              <div class="card-body">
                <b class="card-text">{{ restaurant.location }}</b>
                <p>rating: {{ restaurant.rating }}</p>
              </div>
              <!-- <div
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-evenly;
                "
              >
                <div v-for="tag in restaurant.tags" v-bind:key="tag._id">
                  <a :href="tag.promo" target="blank">{{ promo }}</a>
                </div>
              </div> -->
            </div>
          <!-- </md-ripple> -->
        </div>
        <!-- end of card -->
      </div>
      <!-- end of container -->
    </div>
    <!-- end of viewport -->
  </div>
  <!-- end of template -->
</template>

<script>
import restaurantsData from "../data/restaurants.json";

export default {
  name: "Gallery",
  components: {},
  data() {
    return {
      restaurants: restaurantsData,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
::-webkit-scrollbar {
  display: none;
}
.viewport {
  width: 100%;
  overflow: scroll;
  padding: 5px;
}

#icon {
  width: 50px;
}
.card {
  max-height:100%;
  width: 20vw;
  margin-left: 10px;
  /* x y blur spread color */
  box-shadow: 1px 1px 3px gray;
}
@media screen and (max-width: 1000px) {
  .card {
    width: 30vw;
  }
}
</style>