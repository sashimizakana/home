<template>
  <div v-if="user" class="ui container top">
    <router-view></router-view>
  </div>
</template>

<style>
.top{
  padding-top:8px;
}
</style>

<script>
export default {
  mounted(){
    this.$store.dispatch('login');
  },
  computed:{
    user(){
      return this.$store.state.user;
    }
  }
}
</script>