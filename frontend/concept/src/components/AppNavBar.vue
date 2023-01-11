<template>
  <!-- This is a navbar -->
  <v-app-bar color="white mb-2" flat>
    <v-toolbar-title>{{title}}</v-toolbar-title>
    <v-spacer></v-spacer>
    Magasinier 011
    <v-avatar class="ml-4">
      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>
  </v-app-bar>
</template>

<script>

export default {
  name: "AppNavBar",
  props: {
    title: {
      type: String,
      default: "Concept",
    },
  },
  data: () => ({
    //
  }),
};

</script>