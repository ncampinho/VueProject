<template>
  <v-container v-if="showItems!==null" style="max-width: 87%;">
    <v-row>
      <template>
        <v-col v-for="(show, index) in showItems" :key="index" :loading="loading" cols="10" md="3">
          <v-sheet max-width="350px" elevation="2">
            <template slot="progress">
              <v-progress-linear color="red" height="10" indeterminate></v-progress-linear>
            </template>

            <v-img contain max-height="200" :src="imageSource(index)"></v-img>

            <v-card-title>{{show[0].item.showName}}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="show[0].item.ratingValue"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <!--VER RATING-->

                <div class="grey--text ml-6">{{show[0].item.ratingValue}}</div>
              </v-row>

              <div align="left" class="my-4">Price: {{show[0].item.price}} €</div>
              <div class="my-2 subtitle-1">{{show[0].item.type}} - {{show[0].item.rating}}</div>

              <div>
                Limite Purchase: {{show[0].item.limitPurchaseDate}}
                <br />
                Show Date: {{show[0].item.date}}
              </div>
            </v-card-text>
            <v-divider class="mx-12"></v-divider>

            <v-divider class="mx-12"></v-divider>

            <v-card-text>
              <v-chip-group
                v-model="selection[index]"
                active-class="red accent-4 white--text"
                column
              >
                <v-chip v-for="(hour, index) in show" :key="index">{{hour.item.showTime}}PM</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="red lighten-2" text @click="purchase(index)">Add To Cart</v-btn>
              <v-btn
                class="detail"
                color="red lighten-2"
                text
                :to="'/show/'+ show[0].item.idShow +'/show_info'"
              >Details</v-btn>
            </v-card-actions>
          </v-sheet>
        </v-col>
      </template>
    </v-row>
    <login v-model="dialog"></login>
  </v-container>
  <v-container v-else>No data to show</v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import Login from "@/components/Login.vue";
export default {
  name: "VerticalDisplayer",
  components: {
    Login,
  },
  props: {
    URL: String,
    Color: String,
  },
  data: () => ({
    dialog: false,
    showItems: [],
    purchaseItem: {},
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
      },
    ],
    loading: false,
    selection: [],
  }),
  created() {
    this.getShows();
  },
  computed: {
    ...mapGetters({
      user: "auth/userData",
      shoppingCart: "cart/getPurchaseLine",
    }),
    allShows() {
      return this.showItems;
    },
    style() {
      return this.Color;
    },
  },
  methods: {
    ...mapActions({
      insertCart: "cart/fetchProducts",
    }),
    //Inserts ticket into a shopping cart
    purchase(index) {
      if (localStorage.getItem("user")) {
        this.loading = true;
        const selectedItem = this.showItems[index][this.selection[index]];
        const requestBody = {
          idShow: selectedItem.item.idShow,
          idUser: this.user[0].idUser,
          quantity: 1,
          subtotal: selectedItem.item.price,
          idDate: selectedItem.item.idDate,
        };
        this.$axios
          .post(
            `http://localhost:3000/api/tp2/user/purchase/newTempLine`,
            requestBody
          )
          .then((response) => response)
          .then((data) => {
            if (data.statusText === "OK") {
              this.insertCart(this.user[0].idUser);
            }
          })
          .catch((error) => console.log(error));

        setTimeout(() => (this.loading = false), 2000);
      } else {
        this.loading = true;
        this.dialog = !this.dialog;
        setTimeout(() => (this.loading = false), 2000);
      }
    },
    //Uses API to get all shows on the database
    getShows() {
      this.$axios
        .get(this.URL)
        .then((response) => response)
        .then((data) => {
          this.showItems = data.data;
          console.log(this.showItems);
        })
        .catch((error) => console.log(error));
    },
    imageSource(index) {
      return require("../../public/images/" +
        this.showItems[index][0].item.image +
        ".png");
    },
  },
};
</script>

<style scoped>
.v-card {
  max-width: 350px;
  float: left;
  margin: 0px 4.21rem 2rem 0px;
}

.v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
  margin-left: auto;
}

#showDisplay {
  margin-bottom: 20px;
  padding: 0px;
  display: block;
}
</style>