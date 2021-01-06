<template>
  <v-row justify="center">
    <v-dialog v-model="value" persistent max-width="600px">
      <v-card>
        <v-card-title id="cardTitle">
          <h1 class="headline">LOGIN</h1>
        </v-card-title>
        <v-card-text>
          <v-container>
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
          </v-container>
          <small @click="close">
          <router-link  to="/login/register">Don't have an account? Sign in here</router-link>
          </small>
        </v-card-text>
      </v-card>
      <button
        @click.prevent="close"
        class="border-b border-teal font-semibold"
        id="close"
      >
        Close
      </button>
    </v-dialog>
  </v-row>
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
  name: "Modal",
  props: {
    value: {
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      error: 'auth/hasError',
      user: 'auth/userData'
    })
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    },
    ...mapActions({
      login: 'auth/login',
      insertCart: 'cart/fetchProducts'
    }),
    insertingShoppingCart(){
      if(this.user[0]){
        this.insertCart(this.user[0].idUser)
      }  
    },
    submit() {
      this.login(this.userData);
      setTimeout(() => (this.insertingShoppingCart()), 3000);
      //this.insertCart(this.user.idUser)
      if(localStorage.getItem('user')){
        this.$router.push({ path: '/' })
      }
      //VER COM ANTÓNIO  this.$emit("input", !this.value);
    },
    
  },
};
</script>


<style lang="css" scoped>

#cardTitle {
  justify-content: center;
}

.headline{
  font-weight: bold;
}

.headline, #close, .modal {
  color : rgba(0, 0, 0, 0.7);
}

 button {
  background-color:white;
  padding: 5px;
}


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