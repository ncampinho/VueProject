<template>
  <v-container>
      <h1>{{Text}}</h1>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="userData.username"
        label="Username"
        :rules="rules.require"
        outlined
        rounded
      ></v-text-field>

      <v-text-field
        v-model="userData.password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.minPassword]"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        hint="At least 8 characters"
        @click:append="showPassword = !showPassword"
        outlined
        rounded
      ></v-text-field>
    </v-form>
    <p id="error" v-if="error">{{ error }}</p>
    <v-btn rounded color="primary" dark @click="submit()">Login</v-btn>
    <router-link to="/login/register">Don't have an account? Sign in here</router-link>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default { 
  props: {
    Text: String,
  },
  data: () => ({
    userData: {
      username: "",
      password: "",
      idUserType: 1,
    },
    showPassword: false,
    rules: {
      required: (value) => !!value || "Required.",
      minPassword: (value) =>
        value.length >= 8 || "Minimum 8 characters for the password",
      minUser: (value) =>
        value.length >= 4 || "Minimum 4 characters for the username",
    },
  }),
  computed: {
    ...mapGetters({
      error: 'auth/hasError'

    })
  },
  methods: {
    ...mapActions({
      login: 'auth/login'
    }),
    submit() {
      this.login(this.userData);
      if(localStorage.getItem('user')){
        this.$router.push({ path: '/' })
      } 
    },
  },
};
</script>

<style scoped>
.container{
    padding: 0px;
}

.container > h1{
    margin-bottom: 15px;
}

.container > a{
    display: block;
    margin-top: 15px;
    color: grey;
}
#error{
  margin-bottom: 10px;
  color: red;
}
</style>