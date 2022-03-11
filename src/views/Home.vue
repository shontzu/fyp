<template>
  <section>
    <Header v-on:search_query_updated="onSearchQueryUpdated"/>
    <List :fdsData="fdsData" :query="query" />

    <Carousel />
    
    <h1>Popular</h1>
    <List :fdsData="fdsData" :query="query" type="rating"/>

    <h1>Near Me</h1>
    <List :fdsData="fdsData" :query="query" type="distance"/>

    <h1>Shortest Time</h1>
    <List :fdsData="fdsData" :query="query" type="shortest_time"/>

    <Carousel />

    <h1>Cuisines</h1>
    <List :fdsData="fdsData" :query="query"/>
  </section>
</template>

<script>
import Header from "../components/Header.vue"
import Carousel from "../components/Carousel.vue";
import List from "../components/List.vue";
import fdsData from "../data/FdsAggregated.json";

export default {
  name: "Home",
  components: {
      Carousel,
      Header,
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
  color:gray;
}

div{
  margin-top: 1rem;
  margin-bottom:1rem;
}
</style>
