<template>
  <div id="random">
    <h1 id="alert"><img src="../assets/hmm.gif" alt="hmm" /></h1>
    <p id="random-result" @click="findDeals()"></p>
    <button id="button" @click="findSomething()" class="btn btn-warning btn-lg">
      Find something for me
    </button>
  </div>
</template>

<script>
import fdsData from "../data/FdsAggregated.json";

export default {
  name: "random",
  components: {},
  data: function () {
    return {
      mycolor: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
      merchantId: '', //todo: random pick one merchant from DB
    };
  },
  created() {
    document.getElementById("random").style.background = this.mycolor;
  },
  methods: {
    findSomething: function () {
      // RANDOM DOM COLOR
      this.mycolor = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
      document.getElementById("random").style.background = this.mycolor;
      document.getElementById("alert").innerHTML = ""
      console.log("mycolor: " + this.mycolor);
      
      // RANDOM PICK MERCHANT APPEND TO #random-result DIV
      this.merchantId = Math.floor((Math.random() * 100000000) % fdsData.length); //todo: random pick one merchant from DB
      console.log("merchantId: " + this.merchantId);
      
      document.getElementById("random-result").innerHTML= fdsData[this.merchantId].name

      var img = document.createElement("img");
      img.style.width = '100%';
      img.style.height = '30vh'
      img.src = fdsData[this.merchantId].providers[0].photoHref;
      var src = document.getElementById("random-result");
      src.appendChild(img);
      console.log(img)
      console.log(fdsData[this.merchantId])
      // CHANGE BUTTON TEXT
      var buttonText= ["suggest something else", "next", "not interested", "next restaurant", "try again", "look some more", "hmm...no", "more suggestions"]
      document.getElementById("button").innerHTML = buttonText[Math.floor((Math.random() * 8))]
    },
    findDeals(){
      // alert(this.merchantId);
      this.$router.push({
        path: "/compare/" + fdsData[this.merchantId].name.split("-")[0],
      });
    }
  },
};
</script>

<style scoped>
h1, p{
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
#random-result {
  width:50vw;
  cursor: pointer;
}
</style>
