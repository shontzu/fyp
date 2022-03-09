<template>
  <header class="navbar navbar-light bg-warning">
    <img src="../assets/Foodio.png" alt="Foodio Logo">
    <input type="text" placeholder="search" role="searchbar" @keyup="onKeyup" v-model="query"/>
  </header>
</template>

<script>
export default {
  name: "Header",
  data(){
    return {
      query:""
    }
  },
  methods:{
    onKeyup(){
      this.$emit('search_query_updated', this.query);
    }
  }
};
</script>

<style scoped>
img{
  margin-left:auto;
  margin-right: auto;
  width:40%;
  height:auto;
}
input {
  border: 0;
  background-color: white;
  border-radius: 10px;
  text-align: center;
  padding:5px;
}
input[role=searchbar]{
  width:100%;
}
</style>
