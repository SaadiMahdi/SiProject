<template>
  <div class="flexed-page">
    <div class="slider-container">
      <AppSlideBar />
    </div>
    <div class="main-content">
      <AppNavBar title="Tables" />
      <div class="header">
        <ul>
          <li>
            <v-btn :class="{active: products}" plain @click="getProducts">Products</v-btn>
          </li>
          <li>
            <v-btn :class="{active: vendors}" plain @click="getVendors">Vendors</v-btn>
          </li>
          <li>
            <v-btn :class="{active: productTypes}" plain @click="getProductTypes">Product Types</v-btn>
          </li>
          <li>
            <v-btn :class="{active: customers}" plain @click="getCustomers">Customers</v-btn>
          </li>
        </ul>
      </div>
      <div class="grid-page">
        <v-card class="info-main rounded-lg" flat>
          <InfoCard :icon="ordersIcon" :elements="ordersInfo"></InfoCard>
        </v-card>
        <v-card class="info2 rounded-lg" flat>
          <InfoCard :icon="cartIcon" :elements="cartInfo"></InfoCard>
        </v-card>
        <div class="stats rounded-lg">
          <ProductsData v-if="products"/>
          <VendorsData v-if="vendors"/>
          <ProductTypesData v-if="productTypes"/>
          <CustomersData v-if="customers"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppSlideBar from "../components/AppSlideBar";
import AppNavBar from "../components/AppNavBar";
import InfoCard from "../components/InfoCard.vue";
import ProductsData from "../components/ProductsData.vue";
import VendorsData from "../components/VendorsData.vue";
import ProductTypesData from "../components/ProductTypesData.vue";
import CustomersData from "../components/CustomersData.vue";
export default {
  components: {
    AppSlideBar,
    AppNavBar,
    InfoCard,
    ProductsData,
    VendorsData,
    ProductTypesData,
    CustomersData,
  },
  data() {
    return {
      ordersInfo: [
        {
          title: "Total Products",
          inf: 0,
        },
        {
          title: "Total Customers",
          inf: 0,
        },
        {
          title: "Total Vendors",
          inf: 0,
        },
      ],
      ordersIcon: "mdi-shopping-outline",
      cartInfo: [
        {
          title: "Discarded Products",
          inf: 0,
        },
        {
          title: "Added Products",
          inf: 0,
        },
      ],
      cartIcon: "mdi-cart",
      products : true,
      vendors: false,
      productTypes: false,
      customers: false,
    };
  },
  methods: {
    initialize() {
      this.products = true;
      this.vendors = false;
      this.productTypes = false;
      this.customers = false;
    },

    getProducts() {
      this.products = true;
      this.vendors = false;
      this.productTypes = false;
      this.customers = false;
    },

    getVendors() {
      this.products = false;
      this.vendors = true;
      this.productTypes = false;
      this.customers = false;
    },

    getProductTypes() {
      this.products = false;
      this.vendors = false;
      this.productTypes = true;
      this.customers = false;
    },

    getCustomers() {
      this.products = false;
      this.vendors = false;
      this.productTypes = false;
      this.customers = true;
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

.header {
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
