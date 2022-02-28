<template>
  <div>
    <h1>compare</h1>
    <p></p>
  </div>
</template>

<script>
export default {
  name: "Compare",
  components: {},
  data() {
    return {
        merchant: this.$route.params.merchant,
    };
  },
  created(){
      this.$http.get(this.merchant)
      .then(function(data){
          console.log(data.body)
      });
  }
};
</script>

<style scoped>
</style>