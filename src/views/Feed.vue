<template>
  <div>
    <header class="navbar navbar-light bg-warning">
      <img
        src="../assets/Feed.png"
        alt="Account"
        style="width: 40%; height: auto"
      />
    </header>
    <post-something />
  </div>
</template>

<script>
import PostSomething from "../components/PostSomething.vue";

export default {
  name: "Feed",
  components: {
    PostSomething,
  },
};
</script>

<style>
</style>