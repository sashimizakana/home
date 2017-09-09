<template>
  <div id="document" v-if="!loading">
    <h1>
      {{document.title}}
      <span class="tools">
        <router-link :to="{name:'index'}">
          <i class="up arrow icon"></i>
          index
        </router-link>
      </span>
    </h1>
    <markdown :source="document.contents"></markdown>
  </div>
</template>

<style scoped>
#document {
  padding-top:12px;
}
.tools {
  font-size: 11pt;
}
</style>

<script>
import moment from 'moment';
import axios from 'axios';
import Markdown from './markdown.vue';
export default {
  mounted(){
    this.loading = true;
    this.load(this.$route.params.id).then(()=>{
      this.loading = false;
    });
  },
  data(){
    return {
      document:{},
      loading:false
    }
  },
  methods:{
    load(key){
      const url = `https://firebasestorage.googleapis.com/v0/b/homework-58843.appspot.com/o/blog%2F${key}?alt=media`;
      return axios.get(url).then(d => {
        this.document = d.data;
        window.document.title = this.document.title + " - " + window.document.title;
        return this.document;
      });
    }
  },
  components:{
    Markdown
  }
}
</script>