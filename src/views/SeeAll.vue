<template>
  <div>
    <button type="button" class="btn btn-outline-warning" @click="back()">
      back
    </button>
    <section id="grid">
      <div v-for="fds in aggregatedFds" :key="fds.id">
        <div v-for="provider in fds.providers" :key="provider.id" class="card">
            <h5 class="card-title">{{ fds.name }}</h5>
            <div class="card-body">
              <img :src="provider.photoHref" alt="" />
              <button
                type="button"
                class="btn btn-sm btn-outline-secondary"
                @click="findDeals(merchant)"
              >
                Find deals
              </button>
            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import fdsData from "../data/FdsAggregated.json";

export default {
  name: "SeeAll",
  data() {
    return {
      aggregatedFds: fdsData,
    };
  },
  props: {
    type: {
      default: function () {
        return "default";
      },
    },
    fdsData: {
      required: true,
    },
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    findDeals(merchant) {
      this.$router.push({
        path: "/compare/" + merchant.name.split("-")[0],
      });
    },
  },
};
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(3, 30vw);
  column-gap: 5vw;
  row-gap: 30px;
  justify-content: center;
}
img{
  width:100%;
  height:auto;
}
</style>
