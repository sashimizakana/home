<template>
  <div id="index">
    <h1>ばかおもちゃ文章</h1>
    <div class="ui list" v-for="i in index">
      <div class="item">
        <div class="header">
          <router-link :to="{name:'document',params:{id:i.key}}">{{i.title}}</router-link>
        </div>
        <div class="content">{{i.modifiedAt|date}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#index {
  padding-top:12px;
}
</style>

<script>
import moment from 'moment';
import axios from 'axios';
import config from '../config/storage-config.js';

function loadIndex(){
  const url = `${config.domain}/o/blog%2Findex.json?alt=media`;
  return axios.get(url).then(d => d.data);
}

export default {
  mounted(){
    window.document.title = "目次 - ばかおもちゃ文章"
    this.$ga.page({
      page: '/index',
      title: "目次",
      location: window.location.href
    });
  },
  data(){
    return {
      index:[]
    }
  },
  beforeRouteEnter(route, redirect, next){
    loadIndex().then(index => {
      next(vm => {
        vm.index = index;
      });
    });
  },
  filters:{
    date:(d) => moment(d).format('YYYY-MM-DD(ddd) HH:mm')
  }
}
</script>