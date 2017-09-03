<template>
  <div class="month">
    <month-selector :date="$route.params.ym"></month-selector>
    <note-list :notes="notes" :ym="$route.params.ym"></note-list>
  </div>
</template>

<style>

</style>

<script>
import _ from 'lodash';
import {mapState} from 'vuex';
import monthSelector from './month-selector.vue';
import noteList from './note-list.vue';
export default {
  data(){
    return {}
  },
  mounted(){
    this.initialize();
  },
  watch:{
    '$route.params'(){
      this.initialize();
    }
  },
  methods:{
    initialize(){
      this.$store.dispatch('note/load',this.$route.params.ym);
    }
  },
  computed:Object.assign(
    mapState('note',{
      notes:'notes'
    })
  ),
  components:{
    monthSelector,
    noteList
  }
}
</script>