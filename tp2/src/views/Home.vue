<!--Component about the Home page (first page that a user is going to have access too)-->
<template>
  <v-app style="padding: 0px, 30px">
    <v-container id="slideShow">
      <v-carousel 
      :continuous="false"
      :cycle="true"
      hide-delimiter-background
      delimiter-icon="mdi-minus" 
      show-arrows-on-hover>
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-container>

    <v-container id="showDisplay">
    <v-sheet
    class="mx-auto"
    elevation="0"
  ><v-slide-group
      v-model="model"
      class="pa-4"
      multiple
      show-arrows
    >
    <v-slide-item
        v-for="(show, index) in showItems" :key="index" :loading="loading"
      >
      <v-card >
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
            active-class="accent-4 white--text"
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
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {},
  data: () => ({
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
        setTimeout(() => (this.loading = false), 2000);
        this.$router.push({ path: "/login" });
      }
    },
    //Uses API to get all shows on the database
    getShows() {
      this.$axios
        .get(`http://localhost:3000/api/tp2/shows`)
        .then((response) => response)
        .then((data) => {
          console.log(data.data)
          this.showItems = data.data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
#slideShow {
  padding: 5px;
}
#showDisplay {
  margin-bottom: 20px;
  display: block;
}
.v-card {
  max-width: 350px;
  float: left;
  margin: 0px 10px 10px 0px;
}
</style>