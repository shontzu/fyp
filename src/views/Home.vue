<template>
  <div>
    <Header v-on:search_query_updated="onSearchQueryUpdated"/>
    <!-- <h1>Test Gallery</h1> -->
    <!-- <Test /> -->
    <List :fdsData="fdsData" :query="query" />
    <Carousel />
    <h1>Popular</h1>
    <List :fdsData="fdsData" :query="query" type="rating"/>
    <!--<Popular />-->
    <h1>Near Me</h1>
    <List :fdsData="fdsData" :query="query" type="distance"/>
    <!--<NearMe />-->
    <h1>Shortest Time</h1>
    <List :fdsData="fdsData" :query="query" type="shortest_time"/>
    <!--<ShortestTime />-->
    <Carousel />
    <h1>Cuisines</h1>
    <List :fdsData="fdsData" :query="query"/>
    <!--<Cuisine />-->
  </div>
</template>

<script>
/*
import Popular from "../components/Popular.vue"
import NearMe from "../components/NearMe.vue"
import ShortestTime from "../components/ShortestTime.vue"
import Cuisine from "../components/Cuisine.vue"
*/
import Header from "../components/Header.vue"
import Carousel from "../components/Carousel.vue";
import List from "../components/List.vue";
// import Test from "../components/Test.vue";
import fdsData from "../data/FdsAggregated.json";

export default {
  name: "Home",
  components: {
      Carousel,
      /*
      Popular,
      NearMe,
      ShortestTime,
      Cuisine,
      */
      Header,
      // Test,
      List
  },
  data(){
    return {
      query:null,
      fdsData:fdsData
    }
  },
  methods:{
    onSearchQueryUpdated(query){
      this.query=query;
    }
  }
}
</script>

<style scoped>
h1{
  margin-top:1rem;
  color:gray;
}
</style>
