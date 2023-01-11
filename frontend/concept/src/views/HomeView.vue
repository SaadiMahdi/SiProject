<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Dashboard" />
      <div class="grid-page">
        <v-card height="100" class="fifty-grid1">
          <h2>info card1</h2>
        </v-card>
        <v-card class="fifty-grid2">
          <h2>infocard 2</h2>
        </v-card>
        <v-card class="stats1">
          <h2>Stats</h2>
        </v-card>
        <v-card class="endcard">
          <h2>inforcard</h2>
        </v-card>
        <v-card class="stats2">
          <h2>infocard</h2>
        </v-card>
        <v-card class="endcard">
          <h2>Stats</h2>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import AppSlideBar from "../components/AppSlideBar";
import AppNavBar from "../components/AppNavBar";

export default {
  components: {
    AppSlideBar,
    AppNavBar,
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
