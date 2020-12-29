<template>
  <div id="form-container">
    <UserForm Text="Login"/>
  </div>
</template>

<script>
export default {
    components: {
        UserForm: () => import('@/components/UserFormLogin')
    }
}
</script>

<style scoped>
  #form-container{
    background: rgba(255, 255, 255, 0.363);
    padding: 25px;
    width: 40%;
    display: inline-grid;
  }
</style>