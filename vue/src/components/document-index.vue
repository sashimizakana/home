<template>
  <div class="document-index">
    <h1 class="huge">
      Documents
    </h1>
    <router-link class="ui basic small primary button" :to="{name:'document-edit',params:{id:'new'}}">+ Add</router-link>
    <div class="ui list">
      <div class="item" v-for="i in index">
        <i class="file text icon"></i>
        <div class="content">
          <div class="header">
            <router-link :to="{name:'document-edit',params:{id:i.key}}">
              {{i.title}}
            </router-link>
          </div>
          <div class="description">{{date(i.modifiedAt)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.huge {
  font-size:40pt;
  margin-bottom:0;
}
</style>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
export default {
  mounted(){
    this.$store.dispatch('doc/loadIndex');
  },
  computed:mapState('doc',{
    index:'index'
  }),
  methods:{
    date:(d)=>moment(d).format('YYYY-MM-DD(ddd) hh:mm')
  }
}
</script>