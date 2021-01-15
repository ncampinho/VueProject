<!--Component for a register form to create a new user-->
<template>
  <v-container>
    <h1>{{Text}}</h1>
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="userData.name"
        label="Name"
        :rules="rules.require"
        hint="Example: Jonh Doe"
        outlined
        rounded
      ></v-text-field>
      <v-combobox v-model="selection" :items="items" label="City" outlined rounded></v-combobox>
      <v-text-field
        v-model="userData.email"
        label="Email"
        :rules="[rules.require, rules.emailValidation]"
        hint="Example: example@gmail.com"
        outlined
        rounded
      ></v-text-field>
      <v-text-field
        v-model="userData.nif"
        label="NIF"
        :rules="[rules.require, rules.nifValidation]"
        hint="Example: 000000000"
        outlined
        rounded
      ></v-text-field>
      <v-text-field
        v-model="userData.username"
        label="Username"
        :rules="[rules.require, rules.minUser]"
        hint="Example: username_example"
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
    <v-btn rounded color="primary" dark @click="register()">Submit</v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    Text: String,
  },
  data: () => ({
    userData: {
      username: "",
      password: "",
      name: "",
      nif: null,
      email: "",
      idZipCode: "",
      idUserType: 1,
    },
    error: "",
    items: [],
    selection: [],
    showPassword: false,
    //Rules for each field of the form -> helps validate and warn the users input before submiting
    rules: {
      required: (value) => !!value || "Required.",
      minPassword: (value) =>
        value.length >= 8 || "Minimum 8 characters for the password",
      minUser: (value) =>
        value.length >= 4 || "Minimum 4 characters for the username",
      nifValidation: (value) => {
        if (!parseInt(value)) {
          return "NIF needs to be numeric.";
        } else {
          if (value < 100000000 || value > 999999999) {
            return "Invalid NIF.";
          }
        }
      },
      emailValidation: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),
  //When component is mounted -> Fetches all zipcodes to insert into a combobox
  mounted() {
    this.$axios
      .get(`http://localhost:3000/api/tp2/zipcode`)
      .then((response) => {
        response.data.forEach((element) => {
          var string = element.idZipCode + " - " + element.city;
          this.items.push(string);
        });
      })
      .catch((error) => console.log(error));
  },
  methods: {
    //Executes the register -> uses api to register a new user
    register() {
      const zipcode = this.selection.split(" - ");
      this.userData.idZipCode = zipcode[0];
      this.$axios
        .post(`http://localhost:3000/api/tp2/user/registration`, this.userData)
        .then((response) => {
          if (typeof response.data === "string") {
            this.error = response.data;
          } else {
            this.$router.push({ path: "/login" });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.container {
  padding: 0px;
}

.container > h1 {
  margin-bottom: 15px;
}

#error {
  margin-bottom: 10px;
  color: red;
}
</style>