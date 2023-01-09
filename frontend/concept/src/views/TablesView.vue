<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div>
      <v-card>
        <h2>Test2</h2>
      </v-card>
      <v-card>
        <h2>Test2</h2>
      </v-card>
    </div>
  </div>
</template>

<script>
import AppSlideBar from "../components/AppSlideBar";

export default {
  components: {
    AppSlideBar,
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
</style>