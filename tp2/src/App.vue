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
      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab>Theme I</v-tab>
        <v-tab>Theme II</v-tab>
        <v-tab>Theme III</v-tab>
        <v-tab to="/about">About</v-tab>
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

      
       <v-btn icon>
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      
      <v-btn v-if="isAuthenticated" @click="submit()" href="#" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-else @click="changeDialog()" icon>
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <login v-model="dialog"></login>
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
export default {
  components: {
    Login
  },
  data() {
        return {
            dialog: false
        }
    },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      user: 'auth/userData'

    })
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout'
    }),
    submit(){
      this.logout(null)
    },
    changeDialog(){
      this.dialog = !this.dialog;
    },
  }
}
</script>
