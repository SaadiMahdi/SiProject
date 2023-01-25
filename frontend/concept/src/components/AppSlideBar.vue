<template>
  <!-- I added only two links for now -->
  <v-navigation-drawer permanent expand-on-hover class="rounded-lg">
    <v-img :src="newLogo" class="newLogo logo"></v-img>
    <v-img :src="oldLogo" class="oldLogo logo"></v-img>
    <v-divider></v-divider>

    <v-list nav>
      <v-list-item to="/" exact-active-class=" primary ">
        <v-list-item-icon>
          <v-icon>mdi-chart-bar</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item to="tables" active-class=" primary">
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Tables</v-list-item-title>
      </v-list-item>
      <v-list-item to="orders" active-class=" primary">
        <v-list-item-icon>
          <v-icon>mdi-cart</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Orders & Bills</v-list-item-title>
      </v-list-item>
      <v-list-item to="inventory" active-class=" primary">
        <v-list-item-icon>
          <v-icon>mdi-database</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Inventory</v-list-item-title>
      </v-list-item>
      <v-list-item to="sales" active-class=" primary">
        <v-list-item-icon>
          <v-icon>mdi-cash</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Sales & Payment</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
export default {
  name: "AppSlideBar",

  data: () => ({
    oldLogo: require("../assets/SmallLogo.png"),
    newLogo: require("../assets/ConceptLogo.png"),
    //
  }),
};
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
  height: 100%;
}

.logo {
  transition: display 0.2s ease;
}
.oldLogo {
  display: block;
}

.newLogo {
  display: none;
}

.v-navigation-drawer:hover .oldLogo {
  display: none;
}

.v-navigation-drawer:hover .newLogo {
  display: block;
}
</style>
