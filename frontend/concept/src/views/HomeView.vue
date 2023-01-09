<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="grid-page">
      <div>
        <v-card height="100">
          <h2>Test2</h2>
        </v-card>
        <v-card>
          <h2>Test2</h2>
        </v-card>
      </div>
      <div>
        <v-card>
          <h2>Test2</h2>
        </v-card>
        <v-card>
          <h2>Test2</h2>
        </v-card>
      </div>
      <div>
        <v-card>
          <h2>Test2</h2>
        </v-card>
        <v-card>
          <h2>Test2</h2>
        </v-card>
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
.flexed-page{
  height: 100%;
  display: flex;
}
.slider-container{
height: 100%;
}

.grid-page{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 10px;
  height: 100%;
  width: 100%;
}
</style>
