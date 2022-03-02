<template>
  <div>
    <header>
      <h1>AppName</h1>
      <input type="text" placeholder="search" />
    </header>
    <Test />
  </div>
</template>

<script>
import Test from "../components/Test.vue";
export default {
  name: "Header",
  components: {
    Test,
  },
};
</script>

<style scoped>
header {
  background-color: darkorange;
  padding: 10px;
  box-shadow: -1px -5px 5px black;
}
input {
  border: 0;
  background-color: white;
  border-radius: 10px;
}
</style>