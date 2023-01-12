<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Dashboard" />
      <div class="grid-page">
        <v-card height="120" class="fifty-grid1">
          <InfoCard :icon="salesIcon" :elements="salesInfo"></InfoCard>
        </v-card>
        <v-card height="120" class="fifty-grid2">
          <InfoCard :icon="costumerIcon" :elements="costumersInfo"></InfoCard>
        </v-card>
        <v-card class="stats1">
          <h2>Stats</h2>
        </v-card>
        <v-card class="endcard">
          <InfoCard :icon="baughtIcon" :elements="boughtInfo"></InfoCard>
        </v-card>
        <v-card class="stats2">
          <h2>Stats</h2>
        </v-card>
        <v-card class="endcard">
          <InfoCard :icon="vendorIcon" :elements="vendorsInfo"></InfoCard>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import AppSlideBar from "../components/AppSlideBar";
import AppNavBar from "../components/AppNavBar";
import InfoCard from "../components/InfoCard.vue";

export default {
  components: {
    AppSlideBar,
    AppNavBar,
    InfoCard,
  },
  data() {
    return {
      salesInfo: [
        {
          title: "Solde Products",
          inf: "1.000.000",
        },
        {
          title: "Best Selling",
          inf: "1.000.000",
        },
        
      ],
      salesIcon: "mdi-shopping-outline",
      costumersInfo: [
        {
          title: " Costumers",
          inf: "1",
        },
        {
          title: "Best Costumers",
          inf: "1",
        },
      ],
      costumerIcon: "mdi-account-outline",
      boughtInfo: [
        {
          title: "Bought Products",
          inf: "1.000.000",
        },
        {
          title: "Best Selling",
          inf: "1.000.000",
        },
      ],
      baughtIcon: "mdi-chart-donut",
      vendorsInfo: [
        {
          title: "Vendors",
          inf: "1.000.000",
        },
        {
          title: "Best Selling",
          inf: "1.000.000",
        },
      ],
      vendorIcon: "mdi-account-outline",
    }
  },
};
</script>

<style scoped>
.flexed-page {
  height: 100%;
  display: flex;
}
.slider-container {
  height: 100%;
}

.grid-page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 10px;
}
.fifty-grid1 {
  grid-column: 1 / 4;
}
.fifty-grid2 {
  grid-column: 4 / 7;
}
.stats1 {
  grid-column: 1 / 5;
  grid-row: 2 / 4;
}
.stats2 {
  grid-column: 1 / 5;
  grid-row: 4 / 6;
}
.endcard {
  grid-column: 5 / 7;
}
.main-content {
  width: 100%;
  height: 100%;
}
</style>
