<template>
  <div>
    <h1>compare</h1>
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-outline-warning" @click="back()">back</button>
      <button type="button" class="btn btn-warning" @click="byRating()">by rating</button>
      <button type="button" class="btn btn-warning" @click="byTime()">by time</button>
      <button type="button" class="btn btn-warning" @click="byDistance()">by distance</button>
    </div>
    <div>
      <h1>{{merchant}}</h1>
      {{ merchant }}
    </div>        
    
  </div>
</template>

<script>
import fdsData from "../data/GrabFoodData.json";

export default {
  name: "Compare",
  // props: merchant,
  components: {},
  data() {
    return {
      aggregatedFds: fdsData,
      merchant: this.$route.params,
    };
  },
  created() {
    this.$http.get(this.merchant).then(function (data) {
      console.log(data.body);
    });
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    byRating() {
      console.log(this.$route.params);
    },
    byTime() {},
    byDistance() {},
  },
};
</script>

<style scoped>
</style>