<template>
  <div>
    <Header />
    <!-- <h1>Test Gallery</h1> -->
    <Test />
    <Carousel /> 
    <h1>Popular</h1>
    <Popular />
    <h1>Near Me</h1>
    <NearMe />
    <h1>Shortest Time</h1>
    <ShortestTime />
    <Carousel /> 
    <h1>Cuisines</h1>
    <Cuisine />
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Carousel from "../components/Carousel.vue";
import Popular from "../components/Popular.vue"
import NearMe from "../components/NearMe.vue"
import ShortestTime from "../components/ShortestTime.vue"
import Cuisine from "../components/Cuisine.vue"
import Test from "../components/Test.vue"

export default {
  name: "Home",
  components: {
      Carousel,
      Popular,
      NearMe,
      ShortestTime,
      Header,
      Cuisine,
      Test,
  },
}
</script>

<style scoped>
h1{
  margin-top:1rem;
}
</style>