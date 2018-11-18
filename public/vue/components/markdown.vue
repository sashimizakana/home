<template>
  <div class="markdown" v-html="encoded"></div>
</template>

<style>
.markdown p{
  font-size: 12pt;
  line-height: 1.7;
}
</style>

<script>
import MarkdownIt from 'markdown-it';
import video from 'markdown-it-video';
import prism from 'markdown-it-prism';
import 'prismjs/themes/prism-okaidia.css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks:true
});
md.use(prism);
md.use(video,{youtube: {width: 640, height: 360 }});
export default {
  props:['source'],
  data(){
    return {
    }
  },
  computed:{
    encoded(){
      if(!this.source){
        return;
      }
      return md.render(this.source);
    }
  }
}
</script>
