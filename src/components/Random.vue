<template>
  <div id="random">
    <h1 id="alert"><img src="../assets/hmm.gif" alt="hmm" /></h1>
    <div id="random-result"></div>
    <button @click="findSomething()" class="btn btn-warning btn-lg">
      Find something for me
    </button>
  </div>
</template>

<script>

export default {
  name: "random",
  components: {
  },
  data: function () {
    return {
      mycolor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      merchant: "", //todo: random pick one merchant from DB
    };
  },
  created() {
    document.getElementById("random").style.background = this.mycolor;
  },
  methods: {
    findSomething: function () {
      // UPDATE DOM COLOR
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      document.getElementById("random").style.background = this.mycolor;
      document.getElementById("alert").innerHTML =
        "We found something for you!";
      console.log("mycolor: " + this.mycolor);
      // RANDOM PICK MERCHANT APPEND TO #random-result DIV
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 39px;
  font-weight: bold;
  color: #fff;
}

button {
  position: relative;
  display: block;
  border-radius: 30px;
  background: #fff;
  cursor: pointer;
  outline: none;
}
img {
  width: 100%;
  height: auto;
  margin: 0;
}
body {
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}
#random {
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>