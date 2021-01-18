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
        src: "https://images.impresa.pt/postal/2020-03-16-Cinemas-NOS-encerram-salas-em-todo-o-pais.jpg",
      },
      {
        src: "https://informacoeseservicos.lisboa.pt/fileadmin/espacos/imagens/ALA_4256.jpg",
      },
      {
        src: "https://thumbs.web.sapo.io/?W=775&H=0&delay_optim=1&webp=1&epic=MmVj2y09/K4jhR0RsFXkTumVBgVCNBRpZk/9Yfu/GdvrHEamZOjCY298oZYRWMmUXZxfT0tl097DVVKLnGCExufdVOXrVKrQxl2m5y1fR5mW0fo=",
      },
      {
        src: "https://www.internetdj.com/assets/images/6a825cf4aece5045c8d589abfe636267.png",
      },
    ],
  }),
}
</script>

<style scoped>
#slideShow {
  padding: 5px;
  margin-top:3%;
  max-width: 87%;
}
</style>