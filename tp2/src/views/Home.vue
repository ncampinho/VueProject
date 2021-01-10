<!--Component about the Home page (first page that a user is going to have access too)-->
<template>
  <v-app style="padding: 0px, 30px">
    <v-container id="slideShow">
      <v-carousel
        :continuous="false"
        :cycle="true"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
    </v-container>
    <subtitle Subtitle="Spotlight"/>
    <horizontal-displayer URL = 'http://localhost:3000/api/tp2/shows_spotlight' Color = 'border: solid 2px black'/>
    <subtitle Subtitle="Available Shows"/>
    <vertical-displayer URL= 'http://localhost:3000/api/tp2/shows' Color = 'border: solid 2px black'/>
    
  </v-app>
</template>

<script>
// @ is an alias to /src
import HorizontalDisplayer from '../components/HorizontalDisplayer.vue'
import Subtitle from '../components/Subtitle.vue'
import VerticalDisplayer from '../components/VerticalDisplayer.vue'


export default {
  name: "Home",
  components: {
    HorizontalDisplayer,
    VerticalDisplayer,
    Subtitle
  },
  data: () => ({
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
  }),
}
</script>

<style scoped>
#slideShow {
  padding: 5px;
}
</style>