<template>
  <div class="signin">
    <v-container class="d-flex flex-column align-center align-lg-center">
      <v-card class="rounded-xl card pa-5" flat>
        <v-card-text>
          <img src="../assets/ConceptLogo.png" width="250" />
          <h2 class="secondary--text mt-10">Welcome back!</h2>
          <p class="grey--text mb-10 mt-5">Login to your account</p>
          <v-form>
            <v-text-field
              prepend-icon="mdi-account"
              name="login"
              label="Username"
              type="text"
              class="rounded-lg"
              background-color="background"
              height="45"
              outlined
            ></v-text-field>
            <v-text-field
              id="password"
              prepend-icon="mdi-lock"
              name="password"
              label="Password"
              type="password"
              background-color="background"
              class="rounded-lg"
              height="45"
              outlined
            ></v-text-field>
          </v-form>
          <v-btn text block>Forgot Password?</v-btn>
          <!--login button-->
          <v-btn color="primary" class="mt-8 rounded-lg" width="150" height="45"
            >Login</v-btn
          >
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>


<style scoped>
.signin {
  width: 100%;
  height: 100%;
}
.card {
  width: 500px;
  text-align: center;
}
h2 {
  font-size: 25px;
}
p {
  font-size: 15px;
}
.v-container{
  height: 100%;
}
.v-text-field{
  border: none;
}
</style>
