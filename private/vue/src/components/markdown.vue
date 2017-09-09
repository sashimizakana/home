<template>
  <div v-html="encoded"></div>
</template>
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
      return md.render(this.source);
    }
  }
}
</script>
