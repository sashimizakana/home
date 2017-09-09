<template>
  <div id="index" v-if="!loading">
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
export default {
  mounted(){
    window.document.title = "目次 - ばかおもちゃ文章"
    this.loading = true;
    this.loadIndex().then(()=>{
      this.loading = false;
    });
  },
  data(){
    return {
      index:[],
      loading:false
    }
  },
  methods:{
    loadIndex(){
      const url = 'https://firebasestorage.googleapis.com/v0/b/homework-58843.appspot.com/o/blog%2Findex.json?alt=media';
      return axios.get(url).then(d => {
        this.index = d.data;
        return this.index;
      });
    }
  },
  filters:{
    date:(d) => moment(d).format('YYYY-MM-DD(ddd)')
  }
}
</script>