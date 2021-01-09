<template>
<v-app>
    <horizontal-displayer URL = 'http://localhost:3000/api/tp2/show/type/Music And Festivals' />
    <vertical-displayer URL= 'http://localhost:3000/api/tp2/show/type/Music And Festivals' />
</v-app>
</template>

<script>
import HorizontalDisplayer from '../components/HorizontalDisplayer.vue'
import VerticalDisplayer from '../components/VerticalDisplayer.vue'
export default {
    components: {
        HorizontalDisplayer,
        VerticalDisplayer
    }
}
</script>

<style scoped>

</style>