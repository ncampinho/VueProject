<template>
  <v-container>

    <v-card v-model="show" class="mx-auto" max-width="344" outlined>
      <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
      <v-container>
        <v-card-title>
          {{show[this.ID][0].item.showName }}
          <div>{{show[this.ID][0].item.type}} - {{show[this.ID][0].item.rating}}</div>
        </v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>
            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>
        </v-card-text>
        <v-card-text class="my-4 subtitle-1 sinopse">Sinopse</v-card-text>
        <v-card-text>{{show[this.ID][0].item.showDescription}}</v-card-text>
      </v-container>
    </v-card>

    <v-card class="availibility">
      <v-card-text>Availability</v-card-text>
      <v-card-text>
        <v-chip-group v-model="selection[0]" active-class="red accent-4 white--text" column>
          <v-chip v-for="(hour, index) in show[this.ID]" :key="index">{{ hour.item.showTime }}PM</v-chip>
        </v-chip-group>
        <v-card-actions>
          <v-btn color="red lighten-2" text @click="purchase()">Add To Cart</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>

    <login v-model="dialog"></login>
  </v-container>
</template>

<script>
import Login from "@/components/Login.vue";
import { mapGetters } from "vuex";
export default {
  name: "horizontal card",
  props: {
    ID: String,
  },
  components: {
    Login,
  },
  data: () => ({
    show: [],
    selection: [],
    dialog: false,
  }),
  created() {
    this.getSingleShow();
  },
  computed: {
       ...mapGetters({
      user: "auth/userData",
      shoppingCart: "cart/getPurchaseLine",
    }),
    singleShow() {
      console.log(this.show);
      return this.show;
    },
  },
  methods: {
    getSingleShow() {
      this.$axios
        .get("http://localhost:3000/api/tp2/show/" + this.ID)
        .then((response) => response)
        .then((data) => {
            console.log(data.data)
          this.show = data.data;
        })
        .catch((error) => console.log(error));
    },
     purchase() {
      if (localStorage.getItem("user")) {
        this.loading = true;
        const selectedItem = this.show[this.ID][this.selection[0]];
        const requestBody = {
          idShow: selectedItem.item.idShow,
          idUser: this.user[0].idUser,
          quantity: 1,
          subtotal: selectedItem.item.price,
          idDate: selectedItem.item.idDate,
        };
        console.log(requestBody)
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
  },
};
</script>

<style scoped>
.v-card {
  min-width: 100% !important;
  max-width: 100% !important;
  display: inline-flex;
  min-height: 35rem;
}

.v-card__title {
  display: flex;
  word-break: break-all;
}
.v-card__title > div {
  margin-left: auto;
  font-size: small;
}
.v-card__text {
  display: flex;
  margin: 3% 0px 1% 0px;
  padding: 1%;
}
.v-card__text .sinopse {
  float: left;
}
.availibility {
  display: block;
  min-height: 0rem !important;
  min-width: 58.8% !important;
  margin-left: 41.3%;
  font-size: large !important;
}

.availibility > .v-card__text {
  margin-top: 0px !important;
}

.v-application--is-ltr .v-card__actions > .v-btn.v-btn + .v-btn {
    margin-left: auto;
}
</style>