<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12" md="4">
        <v-sheet :elevation="6" class="mx-auto" @click="toUserData()">
          <v-icon large>mdi-account-group</v-icon>
          <h1>Users</h1>
        </v-sheet>
        <v-sheet :elevation="6" class="mx-auto" @click="toSalesData()">
          <v-icon large>mdi-cart</v-icon>
          <h1>Sales</h1>
        </v-sheet>
        <v-sheet :elevation="6" class="mx-auto" @click="toGeneralData()">
          <v-icon large>mdi-chart-line-variant</v-icon>
          <h1>General Data</h1>
        </v-sheet>
        <v-sheet :elevation="6" class="mx-auto" @click="toAddNewAdmin()">
          <v-icon large>mdi-account-plus</v-icon>
          <h1>Add new admin</h1>
        </v-sheet>
        <v-sheet :elevation="6" class="mx-auto" @click="logout()">
          <v-icon large>mdi-logout</v-icon>
          <h1>Logout</h1>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  methods: {
     ...mapActions({
      loggingOut: "auth/logout",
    }),
    toUserData() {
      this.$router.push({ path: "/admin/user_chart_data" });
    },
    toSalesData() {
      this.$router.push({ path: "/admin/sales_chart_data" });
    },
    toGeneralData() {
      this.$router.push({ path: "/admin/general_chart_data" });
    },
    toAddNewAdmin(){
      this.$router.push({ path: "/login/register" })
    },
    logout(){
      this.loggingOut(null)
      this.$router.push({ path: "/" });
    }
  },
};
</script>

<style scoped>
.row {
  display: inline-flex !important;
  float: left;
}
.v-application .mx-auto {
  margin: 3% 1% !important;
  width: 19rem;
  height: 15rem;
  border-radius: 20px;
}
.col-12 {
  display: contents;
}
.v-icon.v-icon {
  font-size: 200px !important;
}
h1 {
  padding-bottom: 100%;
}
</style>