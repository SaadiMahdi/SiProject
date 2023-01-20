<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Inventory" />
      <div class="header">
        <ul>
          <li>
            <v-btn :class="{active: inventory_data}" @click="getInventoryProducts" plain >Inventory Items</v-btn>
          </li>
        </ul>
      </div>
      <div class="grid-page">
        <v-card class="info-main">
          <InfoCard :icon="ordersIcon" :elements="inventoryInfo"></InfoCard>
        </v-card>
        <v-card class="info2">
          <InfoCard :icon="cartIcon" :elements="cartInfo"></InfoCard>
        </v-card>
        <div class="stats">
          <InventoryData v-if="inventory_data"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSlideBar from "../components/AppSlideBar";
import AppNavBar from "../components/AppNavBar";
import InfoCard from "../components/InfoCard.vue";
import InventoryData from "../components/InventoryData.vue";

export default {
  components: {
    AppSlideBar,
    AppNavBar,
    InfoCard,
    InventoryData,
  },
  data() {
    return {
      inventoryInfo: [
        {
          title: "All Products",
          inf: 0,
        },
        {
          title: "Out of Stick Products",
          inf: 0,
        },
      ],
      ordersIcon: "mdi-shopping-outline",
      cartInfo: [
        {
          title: "Total Bought",
          inf: 0,
        },
        {
          title: "Total Sold",
          inf: 0,
        },
        {
          title: "Benefits",
          inf: 0,
        },
      ],
      cartIcon: "mdi-cart",
      inventory_data : true,
    }
  },
  methods: {
    initialize(){
      this.inventory_data = true;
    },
    getInventoryProducts(){
      this.inventory_data = true;
    },
  },
  created() {
    this.initialize();
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
.active{
  color: red;
}
</style>
