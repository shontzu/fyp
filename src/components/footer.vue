<template>
  <footer>
    <router-link to="/isFavourited"><img src="../assets/icon-bookmark.png" alt="isFavourited"></router-link>
    <router-link to="/"><img src="../assets/icon-home.png" alt="Home"></router-link>
    <router-link to="/Account"><img src="../assets/icon-acc.png" alt="Account"></router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left:0;
  background-color: white;
  box-shadow: 1px 1px 10px black;
  height: 6vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
 a.router-link-exact-active {
  position:relative;
  bottom:20px;
  padding: 10px;
  border-radius: 50%;
  background-color: white;
  box-shadow: -1px -3px 5px grey;
}

img{
  /* width:2rem;
  height:2rem; */
  width:40px;
  height:40px;
}
</style>