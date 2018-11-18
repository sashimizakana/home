<template>
  <div id="document" v-if="document">
    <h1 class="title">
      {{document.title}}
      <span class="tools">
        <a :href="tweetLink">
          <i class="twitter icon"></i>
        </a>
      </span>
    </h1>
    <div class="modified-at">最終更新：{{document.modifiedAt|date}}</div>
    <markdown :source="document.contents"></markdown>
    <div class="footer-tools">
      <a href="/" target="_self">
        <i class="up arrow icon"></i>
        index
      </a>
    </div>
  </div>
</template>

<style scoped>
#document {
  padding-top:12px;
}
.tools {
  font-size: 11pt;
}
.footer-tools {
  margin-top:3em;
  margin-bottom:2em;
}
.modified-at {
  opacity: 0.5;
  margin-bottom:2em;
}
.title {
  font-size:25pt;
  margin-bottom:0;
}
</style>

<script>
import moment from 'moment';
import axios from 'axios';
import Markdown from '../components/markdown.vue';
import config from '../config/storage-config.js';

export default {
  mounted(){
    let status = encodeURIComponent(this.document.title + " / " + location.href);
    this.tweetLink = `http://twitter.com/?status=${status}`;
  },
  data(){
    return {
      tweetLink:""
    }
  },
  asyncData({params}){
    const url = `${config.domain}/o/blog%2F${params.id}?alt=media`;
    return axios.get(url).then(d => {
      return {
        document:d.data
      }
    });
  },
  head(){
    return {
      title:this.document.title + " - ばかおもちゃ文章"
    }
  },
  filters:{
    date:d => moment(d).format('YYYY年MM月DD日(ddd) HH:mm:ss')
  },
  components:{
    Markdown
  }
}
</script>