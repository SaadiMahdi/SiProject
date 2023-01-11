<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Inventory"/>
      <div class="grid-page">
        <div>
          <v-card height="100">
            <h2>Inventory</h2>
          </v-card>
          <v-card>
            <h2>Test2</h2>
          </v-card>
        </div>
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
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
}
.main-content{
  width: 100%;
  height: 100%;
}
</style>
