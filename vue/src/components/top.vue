<template>
  <div v-if="user" class="ui container">
    <router-view></router-view>
  </div>
</template>

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