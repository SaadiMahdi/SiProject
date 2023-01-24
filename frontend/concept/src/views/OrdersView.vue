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
            <v-btn :class="{active: orders}" @click="getOrders"  plain >Purchase Order</v-btn>
          </li>
          <li>
            <v-btn :class="{active: bills}" @click="getBills" plain >Bills</v-btn>
          </li>
          <li>
            <v-btn :class="{active: settlements}" @click="getSettlements" plain >Settlements</v-btn>
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
        <div class="stats">
          <OrdersData v-if="orders"/>
        </div>
        <div class="stats">
          <BillsData @totalBills="getTotalBill" v-if="bills"/>
        </div>
        <div class="stats">
          <SettlementData v-if="settlements"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSlideBar from "../components/AppSlideBar";
import AppNavBar from "../components/AppNavBar";
import InfoCard from "../components/InfoCard.vue";
import OrdersData from "../components/OrdersData.vue";
import BillsData from "../components/BillsData.vue";
import SettlementData from "../components/SettlementData.vue";

export default {
  components: {
    AppSlideBar,
    AppNavBar,
    InfoCard,
    OrdersData,
    BillsData,
    SettlementData,
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
          inf: this.totalBills,
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
      orders : true,
      bills: false,
      settlements: false,
      totalBills:0,
    }
  },
  methods: {
    getTotalBill(count){
      this.totalBills = count;
    },
    initialize(){
      this.Orders = true;
      this.Bills = false;
      this.Settlements = false;
    },
    getOrders(){
      this.orders = true;
      this.bills = false;
      this.settlements = false;
    },
    getBills(){
      this.orders = false;
      this.bills = true;
      this.settlements = false;
    },
    getSettlements(){
      this.orders = false;
      this.bills = false;
      this.settlements = true;
    }
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
