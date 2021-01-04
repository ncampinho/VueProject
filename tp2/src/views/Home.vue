<template>
  <v-app style="padding: 0px, 30px">
    <v-container id="slideShow">
      <v-carousel hide-delimiter-background show-arrows-on-hover>
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
      <v-card
    :loading="loading"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

<<<<<<< Updated upstream
      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>
=======
          <div>
            Limite Purchase: {{show[0].item.limitPurchaseDate}}
            <br />
            Show Date: {{show[0].item.date}}
          </div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>
>>>>>>> Stashed changes

    <v-divider class="mx-4"></v-divider>

<<<<<<< Updated upstream
    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    :loading="loading"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
  <v-card
    :loading="loading"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
=======
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
          <v-btn color="deep-purple lighten-2" text @click="purchase(index)">Buy Ticket</v-btn>
        </v-card-actions>
      </v-card>
>>>>>>> Stashed changes
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from 'vuex'
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: () => ({
<<<<<<< Updated upstream
    
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
=======
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
>>>>>>> Stashed changes
    loading: false,
    selection: [],
  }),
<<<<<<< Updated upstream
  methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
=======
  created() {
    this.getShows();
  },
  computed: {
    ...mapGetters({
      user: 'auth/userData'
    }),
    allShows() {
      return this.showItems;
    },
  },
  methods: {
    purchase(index) {
      if (localStorage.getItem('user')) {
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
        .post(`http://localhost:3000/api/tp2/user/purchase/newTempLine`, requestBody)
        .then((response) => response)
        .then((data) => {
          console.log(data)
        })
        .catch((error) => console.log(error));
        
        setTimeout(() => (this.loading = false), 2000);
      } else {
        this.loading = true;
        setTimeout(() => (this.loading = false), 2000);

        this.$router.push( { path: '/login' } )
      }
    },
    getShows() {
      this.$axios
        .get(`http://localhost:3000/api/tp2/shows`)
        .then((response) => response)
        .then((data) => {
          this.showItems = data.data;
        })
        .catch((error) => console.log(error));
    },
  },
>>>>>>> Stashed changes
};
</script>

<style scoped>

#slideShow{
  padding: 0px;
}

#showDisplay{
  background-color: red;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
}

.v-card{
  max-width: 345px;
  margin: auto;
}

</style>
