<template>
  <div id="app">
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/footer.vue";

export default {
  name: "App",
  components: {
    Footer,
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
  margin-bottom: 90px;
}
header {
  display:flex;
  flex-direction:column;
  padding: 15px;
  box-shadow: 1px 2px 3px gray;
}
@media only screen and (min-width: 1000px) {
  body {
    padding-left: 20%;
    padding-right: 20%;
  }
}
</style>
