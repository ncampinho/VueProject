<template>
    <horizontal-card :ID="this.showId"/>
</template>

<script>
import HorizontalCard from '../components/HorizontalCard.vue'

export default {
  components: { HorizontalCard },
  props: ["showId"],
    
}
</script>

<style scoped>

</style>