<template>
    <div class="subtitle_area">
        <div class="subtitle_area_float"><h3 class="subtitle">{{Subtitle}}</h3></div>
    </div>
</template>
<script>
export default {
    name: 'subtitle',
    props: {
        Subtitle: String
    }
}
</script>
<style scoped>
.subtitle_area{
    margin: 2.5% 11% 2% 11%;
    border-bottom: solid 4px red;
}
.subtitle{
    background: black;
    color: white;
    padding: 0.5rem;
}
.subtitle_area_float{
     float: left;
}
</style>