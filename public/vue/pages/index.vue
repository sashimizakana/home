<template>
  <div id="index">
    <h1>ばかおもちゃ文章</h1>
    <div class="ui list" v-for="i in index">
      <div class="item">
        <div class="header">
          <a :href="'/' + i.key" target="_self">{{i.title}}</a>
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

export default {
  head(){
    return {
      title:"目次 - ばかおもちゃ文章"
    }
  },
  asyncData(){
    const url = `${config.domain}/o/blog%2Findex.json?alt=media`;
    return axios.get(url).then(d => {
      return {
        index:d.data
      }
    });
  },
  filters:{
    date:(d) => moment(d).format('YYYY-MM-DD(ddd) HH:mm')
  }
}
</script>