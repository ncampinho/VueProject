<template>
  <v-app>
    <v-app-bar app color="white" flat>
       <!--<v-app-bar-nav-icon></v-app-bar-nav-icon>-->
       <router-link to="/">
       <v-img
        src="@/assets/logo.png"
        max-height="100"
        max-width="100"
        contain
      ></v-img>
      </router-link>
      <v-spacer></v-spacer>

      <v-container v-if="user === null || user[0].idUserType === 1">
      <v-tabs centered class="ml-n9" color="red darken-1">
        <v-tab to="/">Home</v-tab>
        <v-tab to="/cinema_and_arts">{{tabItems[0].type}}</v-tab>
        <v-tab to="/musics_and_festivals">{{tabItems[1].type}}</v-tab>
        <v-tab to="/sports">{{tabItems[2].type}}</v-tab>
      </v-tabs>
      </v-container>
      <v-container v-else>
      <v-tabs centered class="ml-n9" color="red darken-1">
        <v-tab to="/admin">Home</v-tab>
        <v-tab to="/new_show">New Show</v-tab>
      </v-tabs>
      </v-container>

      <!--<v-responsive max-width="300">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>-->

      
       <v-btn v-if="isAuthenticated && user[0].idUserType === 1" @click="changeCartDialog()" icon >
        <v-icon>mdi-cart-outline</v-icon>
        <span v-if="(shoppingCart) == null" class="btn-circle" >0</span>
        <span v-else class="btn-circle" >{{shoppingCart.length}}</span>
      </v-btn>
      
      <span style="color:grey; font-size: 10px" v-if="user" class="btn-circle" >{{user[0].name}}</span>
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
     <router-view/>
    </v-main>
    
  </v-app>
</template>


<style lang="scss">
@import 'https://unpkg.com/ionicons@4.2.2/dist/css/ionicons.min.css';
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
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
            tabItems: []
        }
    },
  beforeMount: function() {
    this.getTabItems()
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      user: 'auth/userData',
      shoppingCart: 'cart/getPurchaseLine'
    }),
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
      clearCart: 'cart/insertCart'
    }),
    submit(){
      if(this.user[0].idUserType === 1){
        this.logout(null)
      this.clearCart(null)
      }else{
        this.logout(null)
this.$router.push({ path: "/" }) 
      }
    },
    changeDialog(){
      this.dialog = !this.dialog;
    },
    changeCartDialog(){
      this.cartdialog = !this.cartdialog;
    },
    getTabItems(){
      this.$axios
        .get('http://localhost:3000/api/tp2/types')
        .then((response) => response)
        .then((data) => {
          this.tabItems = data.data;
        })
        .catch((error) => console.log(error));
    }
  }
}
</script>
