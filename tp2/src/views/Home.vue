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
      <v-card v-for="(show, index) in showItems" :key="index" :loading="loading">
        <template slot="progress">
          <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
        </template>

        <v-img height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

        <v-card-title>{{show[0].item.showName}}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating :value="4.5" color="amber" dense half-increments readonly size="14"></v-rating>

            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>

          <div class="my-4 subtitle-1">{{show[0].item.type}} - {{show[0].item.rating}}</div>

          <div>Limite Purchase: {{show[0].item.limitPurchaseDate}}<br>Show Date: {{show[0].item.date}}</div>
        </v-card-text>
        <v-divider class="mx-4"></v-divider>

        <v-card-title>Availability</v-card-title>

        <v-card-text>
          <v-chip-group v-model="selection" active-class="deep-purple accent-4 white--text" column>
            <v-chip v-for="(hour, index) in show" :key="index">{{hour.item.showTime}}PM</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">Reserve</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data: () => ({
    showItems: [],
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
    selection: 1,
  }),
  created() {
    this.getShows()
  },
  computed: {
    allShows(){
      return this.showItems
    }
  },
  methods: {
    reserve() {
      this.loading = true;
      console.log(this.showItems)
      setTimeout(() => (this.loading = false), 2000);
    },
    getShows(){
      this.$axios
      .get(`http://localhost:3000/api/tp2/shows`)
      .then(response => response)
      .then(data => {this.showItems = data.data})
      .catch(error => console.log(error))
    }
  },
};
</script>

<style scoped>
#slideShow {
  padding: 0px;
}

#showDisplay {
  background-color: red;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0px;
  display: block;
}

.v-card {
  max-width: 345px;
  float: left;
  margin: 10px 10px 10px 0px;
}
</style>