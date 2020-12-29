<template>
    <div>
        <v-btn rounded dark>
            {{Text}}
        </v-btn>
    </div>
</template>

<script>
export default{
    props: {
        Text: String,
    },
}
</script>

<style scoped>
</style>