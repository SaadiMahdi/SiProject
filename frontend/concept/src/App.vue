<template>
  <v-app>
    <router-view class="background"/>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>


<style scoped>
.v-application {
  font-family: "Poppins", sans-serif;
}
.v-main {
  align-items: center;
}

.v-main__wrap {
  height: 100% !important;
}
</style>
