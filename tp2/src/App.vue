<template>
  <v-app>
    <v-app-bar
      v-if="user === null || user[0].idUserType === 1"
      app
      color="white"
      flat
    >
      <router-link to="/">
        <v-img
          src="@/assets/logo.png"
          max-height="100"
          max-width="100"
          contain
        ></v-img>
      </router-link>
      <v-spacer></v-spacer>

      <v-tabs centered class="ml-n9" color="red darken-1">
        <v-tab to="/">Home</v-tab>
        <v-tab to="/cinema_and_arts">{{ tabItems[0].type }}</v-tab>
        <v-tab to="/musics_and_festivals">{{ tabItems[1].type }}</v-tab>
        <v-tab to="/sports">{{ tabItems[2].type }}</v-tab>
      </v-tabs>

      <!--<v-responsive max-width="300">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>-->

      <v-btn
        v-if="isAuthenticated && user[0].idUserType === 1"
        @click="changeCartDialog()"
        icon
      >
        <v-icon>mdi-cart-outline</v-icon>
        <span v-if="shoppingCart == null" class="btn-circle">0</span>
        <span v-else class="btn-circle">{{ shoppingCart.length }}</span>
      </v-btn>

      <span
        style="color: grey; font-size: 10px"
        v-if="user"
        class="btn-circle"
        >{{ user[0].name }}</span
      >
      <v-btn v-if="isAuthenticated" @click="submit()" href="#" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else @click="changeDialog()" icon>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar v-else app color="white" flat>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img
        src="@/assets/logo.png"
        max-height="100"
        max-width="100"
        contain
      ></v-img>
      <v-spacer></v-spacer>

      <span
        style="color: grey; font-size: 10px"
        v-if="user"
        class="btn-circle"
        >{{ user[0].name }}</span
      >
      <v-btn v-if="isAuthenticated" @click="submit()" href="#" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else @click="changeDialog()" icon>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <login v-model="dialog"></login>

    <popupcart v-model="cartdialog"></popupcart>
    <v-main>
      <router-view />
    </v-main>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item :key="1" to="/admin">
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :key="2" to="/new_show">
          <v-list-item-content>
            <v-list-item-title>New Show</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <br>

    <v-footer id="footer" dark padless>
      <v-card width=100% color=red class=" white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          21674 - António José Ribeiro Marques
        </v-card-text>
        <v-card-text class="white--text pt-0">
          21751 - Nelson Filipe Faria Campinho
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Institute Polytechnic of Viana do Castelo</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>


<style lang="scss">
@import "https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css";
figure {
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 10px;
  margin-inline-end: 0;
}
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Login from "@/components/Login.vue";
import Popupcart from "@/components/Popupcart.vue";
export default {
  components: {
    Login,
    Popupcart,
  },
  data() {
    return {
      dialog: false,
      cartdialog: false,
      snackbardialog: false,
      tabItems: [],
      drawer: false,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  beforeMount: function () {
    this.getTabItems();
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated",
      user: "auth/userData",
      shoppingCart: "cart/getPurchaseLine",
    }),
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
      clearCart: "cart/insertCart",
    }),
    submit() {
      if (this.user[0].idUserType === 1) {
        this.logout(null);
        this.clearCart(null);
      } else {
        this.logout(null);
        this.$router.push({ path: "/" });
      }
    },
    changeDialog() {
      this.dialog = !this.dialog;
    },
    changeCartDialog() {
      this.cartdialog = !this.cartdialog;
    },
    getTabItems() {
      this.$axios
        .get("http://localhost:3000/api/tp2/types")
        .then((response) => response)
        .then((data) => {
          this.tabItems = data.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
