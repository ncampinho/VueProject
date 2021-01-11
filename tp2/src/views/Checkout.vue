<template>
  <v-container>
    <v-card>
        <v-list v-if="shoppingCart != null"  two-line>
          <v-list-item  v-for="(line,index) in shoppingCart" :key="index">
            <v-avatar tile size="35%">
              <img :src="imageSource(index)" alt="">
            </v-avatar>

            <v-list-item-content>
              <v-list-item-title>Show: {{line.showName}}</v-list-item-title>
              <v-list-item-title>Date: {{line.date}}</v-list-item-title>
            </v-list-item-content>

            
            <v-list-tile>{{line.price}} x  {{line.quantity}} = {{ line.subtotal }} €</v-list-tile>

            <v-list-tile-action>
              <v-btn class="item-close" @click="remove(index)"  icon >
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
              <v-list-item-subtitle>Add products to shopping cart</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    <v-list-item v-if="shoppingCart != null">
      <v-list-item-content>
              <v-list-item-title>Total: </v-list-item-title>
              <v-list-item-subtitle>{{shoppingCartTotal}} €</v-list-item-subtitle>
            </v-list-item-content>
    </v-list-item>

    <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="shoppingCart != null" color="secundary" dark to="/checkout" @click="close()">Go to Payment</v-btn>
    </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
  export default {props: {
    Text: String,
  },
  name: "Modal",
  props: {
    value: {
      required: true,
    },
  },
  components: {
    
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    },
    remove(index) {
      const requestBody = {
        idUser: this.shoppingCart[index].idUser,
        idShow: this.shoppingCart[index].idShow,
        idDate: this.shoppingCart[index].idDate
    }
      this.$axios
        .post(`http://localhost:3000/api/tp2/user/purchase/deleteTempLine`, requestBody)
        .then((response) => response)
        .then((data) => {
        })
        .catch((error) => console.log(error));
    },
    imageSource(index){
      return require("../../public/images/" + this.shoppingCart[index].image + ".png")
    },
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'cart/getPurchaseLine',
      shoppingCartTotal: 'cart/getTotal'
    }),
  },
  }
</script>

<style scoped>
</style>