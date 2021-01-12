<template>
  <v-stepper id="stepper" v-model="e1">
    <v-stepper-header id="header">
      <v-stepper-step color="red" dark :complete="e1 > 1" step="1">Products</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step color="red" dark :complete="e1 > 2" step="2">Shipping</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step color="red" dark step="3">Payment</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content  step="1">
        <template >
          <v-container>
            <v-list  v-if="shoppingCart != null" two-line>
              <v-list-item v-for="(line, index) in shoppingCart" :key="index">
                <v-avatar tile size="35%">
                  <img contain :src="imageSource(index)" alt="" />
                </v-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    >Show: {{ line.showName }}</v-list-item-title
                  >
                  <v-list-item-title>Date: {{ line.date }}</v-list-item-title>
                </v-list-item-content>

                <v-list-tile
                  >{{ line.price }} x {{ line.quantity }} =
                  {{ line.subtotal }} €</v-list-tile
                >

                <v-list-tile-action>
                  <v-btn class="item-close" @click="remove(index)" icon>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>
            <v-list v-else>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>No products</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-list-item v-if="shoppingCart != null">
              <v-list-item-content>
                <v-list-item-title>Total: </v-list-item-title>
                <v-list-item-subtitle
                  >{{ shoppingCartTotal }} €</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

          </v-container>
        </template>

        <v-btn color="secundary" dark @click="e1 = 2">Go to Shipping</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <template>
          <v-container>
            <v-row>
              <v-col>
                <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }">
                <v-card-item>
                  <v-card-title>
                    Add adress
                  </v-card-title>
                  <v-divider></v-divider>
                <v-card-subtitle>
                  <v-text-field style="padding:0"  color="red" label="Nif">
                  </v-text-field>
                </v-card-subtitle>
                <v-card-subtitle>
                  <v-text-field style="padding:0" color="red" label="Street">
                  </v-text-field>
                </v-card-subtitle>
                <v-autocomplete
                style="padding:0"
                color="red"
            ref="country"
            label="Country"
            placeholder="Select..."
          ></v-autocomplete>
                </v-card-item>
              </v-card>
              </v-hover>
              </v-col>
              <v-col>
              <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }">
                <v-card-item>
                  <v-card-title>
                    Adress 1
                  </v-card-title>
                  <v-divider></v-divider>
                <v-card-subtitle>
                  Nif: {{user[0].nif}}
                </v-card-subtitle>
                <v-card-subtitle>
                  Street: Rua do Chouriço
                </v-card-subtitle>
                <v-card-subtitle>
                  ZipCode: {{user[0].idZipCode}} | {{user[0].city}}
                </v-card-subtitle>
                </v-card-item>
              </v-card>
              </v-hover>
              </v-col>
              <v-col>
              <v-hover v-slot="{ hover }">
              <v-card :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }">
                <v-card-item>
                  <v-card-title>
                    Adress 2
                  </v-card-title>
                  <v-divider></v-divider>
                <v-card-subtitle>
                  Nif: {{user[0].nif}}
                </v-card-subtitle>
                <v-card-subtitle>
                  Street: Rua do Chouriço
                </v-card-subtitle>
                <v-card-subtitle>
                  ZipCode: {{user[0].idZipCode}} | {{user[0].city}}
                </v-card-subtitle>
                </v-card-item>
              </v-card>
              </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </template>

        <v-btn color="secundary" dark @click="e1 = 3">Go to Payment</v-btn>

        <v-btn @click="e1 = 1" text>Back</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn color="secundary" dark >Confirm</v-btn>

        <v-btn @click="e1 = 2" text>Back</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      e1: 1,
    };
  },
  props: {
    Text: String,
  },
  name: "Modal",
  props: {
    value: {
      required: true,
    },
  },
  components: {},
  methods: {
    close() {
      this.$emit("input", !this.value);
    },
    remove(index) {
      const requestBody = {
        idUser: this.shoppingCart[index].idUser,
        idShow: this.shoppingCart[index].idShow,
        idDate: this.shoppingCart[index].idDate,
      };
      this.$axios
        .post(
          `http://localhost:3000/api/tp2/user/purchase/deleteTempLine`,
          requestBody
        )
        .then((response) => response)
        .then((data) => {})
        .catch((error) => console.log(error));
    },
    imageSource(index) {
      return require("../../public/images/" +
        this.shoppingCart[index].image +
        ".png");
    },
  },
  computed: {
    ...mapGetters({
      user: 'auth/userData',
      shoppingCart: "cart/getPurchaseLine",
      shoppingCartTotal: "cart/getTotal",
    }),
  },
};
</script>


<style scoped>
#header {
    height: 72px;
    align-items: stretch;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
}

#stepper{
    margin:2%;
    padding:2%;
}
</style>
