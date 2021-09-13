<template>
  <v-app>
    <v-app-bar app>
      <v-btn
        to="/dashboard"
        color="blue-grey lighten-4"
        :ripple="false"
        class="mr-4"
        >Dashboard</v-btn
      >
      <v-btn to="/about" color="blue-grey lighten-4" :ripple="false"
        >About</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
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
