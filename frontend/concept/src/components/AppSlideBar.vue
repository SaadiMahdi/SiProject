<template>
  <!-- I added only two links for now -->
  <v-navigation-drawer permanent expand-on-hover class="rounded-lg">
    <v-list>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Sandra Adams </v-list-item-title>
          <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

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
        <v-list-item-title>Sales</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
export default {
  name: "AppSlideBar",

  data: () => ({
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

.v-navigation-drawer {
  height: 100%;
}
</style>
