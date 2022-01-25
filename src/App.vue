<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import Home from "./views/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
/* CODE FOR SCROLLING GALLERY */
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
/* END CODE FOR SCROLLING GALLERY */
</style>
