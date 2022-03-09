<template>
  <div>
    <button type="button" class="btn btn-outline-warning" @click="back()">
      back
    </button>
    <section id="grid" class="card-group">
      <div v-for="fds in effectiveFdsData" :key="fds.id" class="card">
        <p class="card-title ">{{ fds.name.split("-")[0] }}</p>
        <div class="card-body">
          <img :src="fds.providers[0].photoHref" alt="restaurants" style="width:100%;" />
        </div>
          <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            @click="findDeals(fds)"
          >
            Find deals
          </button>
      </div>
    </section>
  </div>
</template>

<script>
import fdsData from "../data/FdsAggregated.json";

export default {
  name: "SeeAll",
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
  computed: {
    effectiveFdsData: function () {
      //construct the aggregated one with names merged
      //name
      let names = fdsData
        .map((y) => y.name.split("-")[0].trim())
        .reduce((p, v) => {
          p.indexOf(v) == -1 && p.push(v);
          return p;
        }, []);
      console.log(names);
      names = names.map((name) => {
        for (const data of fdsData) {
          if (data.name.split("-")[0].trim() == name) {
            return data;
          }
        }
      });
      return names;
      // return this.fdsData.filter(
      //     (y) => !this.query || y.name.toUpperCase().includes(this.query.toUpperCase())
      //   );
    },
  },
};
</script>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(3, 30vw);
  column-gap: 5vw;
  justify-content: center;
}
</style>
