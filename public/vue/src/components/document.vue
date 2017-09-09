<template>
  <div id="document" v-if="document">
    <h1>
      {{document.title}}
      <span class="tools">
        <a :href="tweetLink">
          <i class="twitter icon"></i>
        </a>
      </span>
    </h1>
    <markdown :source="document.contents"></markdown>
    <div class="footer-tools">
      <router-link :to="{name:'index'}">
        <i class="up arrow icon"></i>
        index
      </router-link>
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
  margin-top:1em;
  margin-bottom:1em;
  }
</style>

<script>
import moment from 'moment';
import axios from 'axios';
import Markdown from './markdown.vue';
import config from '../config/storage-config.js';

function load(key){
  const url = `${config.domain}/o/blog%2F${key}?alt=media`;
  return axios.get(url).then(d => d.data);
}

export default {
  data(){
    return {
      document:null,
      tweetLink:""
    }
  },
  beforeRouteEnter(route, redirect, next){
    load(route.params.id).then(document => {
      next(vm => {
        vm.setDocument(document);
      });
    });
  },
  methods:{
    setDocument(document){
      this.document = document;
      window.document.title = this.document.title + " - " + window.document.title;
      let status = encodeURIComponent(this.document.title + " / " + location.href);
      this.tweetLink = `http://twitter.com/?status=${status}`;
      return this.document;
    }
  },
  components:{
    Markdown
  }
}
</script>