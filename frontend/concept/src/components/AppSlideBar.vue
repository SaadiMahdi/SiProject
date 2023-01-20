<template>
  <!-- I added only two links for now -->
  <v-navigation-drawer permanent expand-on-hover class="rounded-lg" v-model="drawer">
    <v-img v-if="drawer" :src=newLogo class=" "></v-img>
    <v-img v-else :src=oldLogo class=" "></v-img>
    <v-divider></v-divider>

    <v-list nav>
      <v-list-item to="/" exact-active-class=" primary ">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
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
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Orders & Bills</v-list-item-title>
      </v-list-item>
      <v-list-item to="inventory" active-class=" primary">
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Inventory</v-list-item-title>
      </v-list-item>
      <v-list-item to="sales" active-class=" primary">
        <v-list-item-icon>
          <v-icon>mdi-star</v-icon>
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
    drawer: false,
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


</style>
