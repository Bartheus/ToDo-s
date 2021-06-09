<template>
  <v-app id="app">
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-3 my-3"
          fab
          dark
          large
          color="success"
          v-bind="attrs"
          v-on="on"
          to="/"
        >
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </template>
      <span>Home</span>
    </v-tooltip>
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-3 my-3"
          fab
          dark
          large
          color="purple"
          v-bind="attrs"
          v-on="on"
          to="/todos"
        >
          <v-icon>
            mdi-format-list-checks
          </v-icon>
        </v-btn>
      </template>
      <span>Todo's</span>
    </v-tooltip>

    <v-container fill-height fluid>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null
  })
};
</script>

<style>
#app {
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
