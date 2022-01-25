<template>
  <div>
    <Carousel /> 
    <Gallery />
    <Carousel /> 
    <Gallery />
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import Gallery from "../components/Gallery.vue";

export default {
  components: {
      Carousel,
      Gallery
  },

}
</script>

<style>

</style>