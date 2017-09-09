<template>
  <div id="app" class="ui container">
    <router-view></router-view>
  </div>
</template>

<script>
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';
moment.locale('ja');
export default {
  name: 'app',
  data () {
    return {}
  }
}
</script>

<style>
</style>
