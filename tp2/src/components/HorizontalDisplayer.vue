<template>
  <v-container id="horizontalDisplay">
    <v-sheet class="mx-auto" elevation="0">
      <v-slide-group class="pa-4" multiple show-arrows>
        <v-slide-item v-for="(show, index) in showItems" :key="index" :loading="loading">
          <v-card>
            <template slot="progress">
              <v-progress-linear color="red" height="2" indeterminate></v-progress-linear>
            </template>

            <v-img height="140" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

            <v-card-title>{{show[0].item.showName}}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

                <div class="grey--text ml-6">4.5 (413)</div>
              </v-row>

              <div class="my-8 subtitle-1">{{show[0].item.type}} - {{show[0].item.rating}}</div>

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
                active-class="deep-purple accent-4 white--text"
                column
              >
                <v-chip v-for="(hour, index) in show" :key="index">{{hour.item.showTime}}PM</v-chip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions>
              <v-btn color="lighten-2" text @click="purchase(index)">Buy Ticket</v-btn>
            </v-card-actions>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <login v-model="dialog"></login>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import Login from "@/components/Login.vue";
export default {
  name: "HorizontalDisplayer",
  components: {
    Login,
  },
  props: {
    URL: String,
  },
  name: "Horizontal Displayer",
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
  },
  methods: {
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
            console.log(data);
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
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
#horizontalDisplay {
  margin-bottom: 20px;
  display: block;
}
.v-card {
  max-width: 350px;
  float: left;
  margin: 0px 10px 10px 0px;
}
</style>