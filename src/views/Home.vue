<template>
  <div>
    <Header />
    <Carousel /> 
    <h1>Category 1</h1>
    <Gallery />
    <h1>Category 2</h1>
    <Gallery />
    <Carousel /> 
    <h1>Category 3</h1>
    <Gallery />
  </div>
</template>

<script>
import Header from "../components/Header.vue"
import Carousel from "../components/Carousel.vue";
import Gallery from "../components/Gallery.vue";

export default {
  name: "Home",
  components: {
      Carousel,
      Gallery,
      Header,
  },
}
</script>

<style scoped>
h1{
  margin-top:1rem;
}
</style>