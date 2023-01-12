<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Orders & Bills" />
      <div class="header">
        <ul>
          <li>
            <v-btn color="primary" plain>Purchase order</v-btn>
          </li>
          <li>
            <v-btn color="secondary" plain>Bills</v-btn>
          </li>
          <li>
            <v-btn color="secondary" plain>Settelments</v-btn>
          </li>
          <li>
            <v-btn color="primary" depressed>+ Add new Order</v-btn>
          </li>
        </ul>
      </div>
      <div class="grid-page">
        <v-card class="info-main">
          <InfoCard :icon="ordersIcon" :elements="ordersInfo"></InfoCard>
        </v-card>
        <v-card class="info2">
          <InfoCard :icon="cartIcon" :elements="cartInfo"></InfoCard>
        </v-card>
        <v-card class="stats">
          <h2>Test3</h2>
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
      ordersInfo: [
        {
          title: "All Orders",
          inf: 0,
        },
        {
          title: "All Bills",
          inf: 0,
        },
        {
          title: "All Settlements",
          inf: 0,
        },
      ],
      ordersIcon: "mdi-shopping-outline",
      cartInfo: [
        {
          title: "Abandoned Cart",
          inf: 0,
        },
        {
          title: "Customers",
          inf: 0,
        },
      ],
      cartIcon: "mdi-cart",
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

.header{
  margin: 0px 10px 0px 0px;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style: none;
}

.grid-page {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  margin: 10px;
}

.main-content {
  width: 100%;
  height: 100%;
}

.info-main {
  grid-column: 1/3;
  grid-row: 1 / 2;
}

.info2 {
  grid-column: 3 / 3;
  grid-row: 1 / 1;
}

.stats {
  grid-column: 1 / 4;
  grid-row: 2 / 6;
}
</style>
