<template>
  <div>
    <div class="cards-wrapper">
      <!-- AOS (Animation on Scroll) is a library imported in main.js -->
        <div
          class="cards"
          v-for="merchant in fdsData.filter(y=>!query||y.name.toUpperCase().split('-')[0].includes(query.toUpperCase()))"
          :key="merchant.id"
        >
          <div
            class="cards"
            v-for="provider in merchant.providers"
            :key="`${provider.name}#${merchant.name}#${type}`"
          >
            <!-- the card is from bootstrap library with a touch of vue -->
            <div class="card" v-if="shouldRender(provider)">
              <b class="card-title">{{
                merchant.name.toUpperCase().split("-")[0]
              }}</b>
              <img
                :src="provider.photoHref"
                alt="food"
                style="width: 100%; height: auto"
              />
              <div class="card-body">
                <b class="card-text">
                  <b class="card-title">{{
                    merchant.name.toUpperCase().split("-")[1]
                  }}</b>
                  <h1>{{ provider.estimatedDeliveryTime }}mins</h1>
                  <span style="color: gray; margin: 0"
                    >{{ provider.distanceInKm.toFixed(2) }}km |
                    {{ provider.rating }}✰
                  </span>
                  <p>{{provider.name}}</p>
                </b>
              </div>
            </div>
          </div>
        </div>
        <!-- end of card -->
      </div>
    </div>
  <!-- end of template -->
</template>

<script>
export default {
  name: "List",
  props:{
    type:{
      default:function(){return "default";}
    },
    fdsData:{
      required: true
    },
    query:{
      default:""
    }
  },
  methods:{
    shouldRender(merchant){
      if(this.type==="shortest_time"){
        return merchant.estimatedDeliveryTime < 40;
      }
      else if(this.type==="rating"){
        return merchant.rating > 4.5;
      }
      else if(this.type==="distance"){
        return merchant.distanceInKm <= 2;
      }
      else{
        return true;
      }
    }
  }
};
</script>

<style scoped>
.cards-wrapper {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.cards-wrapper::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.cards-wrapper {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.cards {
  display: inline-block;
}
.card {
  max-height: 100%;
  width: 15vw;
  margin-left: 10px;
  box-shadow: 1px 1px 3px gray;
  overflow: hidden;
}
@media screen and (max-width: 1000px) {
  .card {
    min-width: 30vw;
    font-size: 0.5rem;
  }
  div.card-body {
    padding: 0;
  }
}
</style>
