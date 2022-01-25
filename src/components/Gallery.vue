<template>
  <div>
    <div class="viewport">
      <div class="container">
        <!-- AOS (Animation on Scroll) is a library imported in main.js -->
        <div  data-aos="flip-left"  data-aos-duration="1500" v-for="restaurant in restaurants" v-bind:key="restaurant._id" >
          <md-ripple>
            <!-- the card is from bootstrap library with a touch of vue -->
            <div class="card">
              <b class="card-title">{{ restaurant.restaurant.toUpperCase() }}</b>
              <img  src="https://picsum.photos/600/300/?image=25" alt="member"  style="width: 100%; min-height: 120px" />
              <div class="card-body">
                <b class="card-text">{{ restaurant.street }}</b>
                <p>rating: {{ restaurant.rating }}</p>
              </div>
              <div style="display:flex; flex-direction:row; justify-content:space-evenly;">
                <div v-for="tag in restaurant.tags" v-bind:key="tag._id">
                  <a :href="tag.promo" target="blank" >{{promo}}</a>
                </div>
              </div>
            </div>
          </md-ripple>
        </div>
      </div>
      <!-- end of container -->
    </div>
    <!-- end of viewport -->
    <br /><br /><br />
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
#icon {
  width: 50px;
}
.card {
  height: 50vh;
  width: 20vw;
  margin-left:10px;
}
@media screen and (max-width: 1000px) {
  .card {
    height: 44vh;
    width: 45vw;
  }
}
</style>