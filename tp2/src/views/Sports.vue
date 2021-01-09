<template>
<v-app>
    <horizontal-displayer URL = 'http://localhost:3000/api/tp2/show/type/Sports' />
    <vertical-displayer URL= 'http://localhost:3000/api/tp2/show/type/Sports' />
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