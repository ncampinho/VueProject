<template>
  <div id="app" data-app>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <a v-if="isAuthenticated" @click="submit()" href="#">Logout</a>
      <router-link v-else to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body{
  background: bisque;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: bisque;
}

#nav {
  padding: 30px;
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
export default {
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
    }
  }
}
</script>
