<template>
  <div v-if="!loading">
    <div class="title">
      <h1 class="huge">
        <span v-if="$route.params.id != 'new'">{{document.title}}</span>
        <span v-else>(あたらしい文書)</span>
        <span class="button-tools">
          <router-link :to="{name:'document-index'}">
            <i class="up arrow icon"></i>
            index
          </router-link>
          &nbsp;&nbsp;
          <span v-if="!uploading && $route.params.id != 'new'">
            <a href="javascript:void(0)" @click="publish">
              <i class="upload icon"></i>
              publish
            </a>
            &nbsp;
            <a href="javascript:void(0)" @click="unpublish" v-if="document.published">
              <i class="download icon"></i>
              unpublish
            </a>
          </span>
          <span v-if="uploading">
            <i class="upload icon"></i>
            uploading...
          </span>
        </span>
      </h1>
    </div>

    <div class="editor-main">
      <div class="edit-tools" v-if="!edit">
        <a @click="toggleEdit()" href="javascript:void(0)">
          <i class="edit icon"></i>
        </a>
      </div>

      <div class="ui form" v-if="edit">
        <div class="field">
          <label>Title</label>
          <input type="text" v-model="editTitle">
        </div>
        <div class="field">
          <label>Contents</label>
          <textarea v-model="editContents" class="contents" rows="30"></textarea>
        </div>
      </div>

      <div v-if="!edit">
        <markdown :source="document.contents"></markdown>
      </div>
    </div>

    <div v-if="edit" class="save-tools">
      <button class="ui basic primary button" @click="save(editTitle,editContents)" :disabled="!editTitle || !editContents">
        <i class="save icon"></i>
        save
      </button>
      <button class="ui basic secondary button" @click="toggleEdit()" v-if="$route.params.id != 'new'">
          <i class="remove icon"></i>
          cancel
      </button>
    </div>

  </div>
</template>

<style scoped>
.editor-main {
  position: relative;
}
.edit-tools {
  position: absolute;
  right: 0;
}
.save-tools {
  margin-top:1em;
}
.huge {
  font-size:25pt;
  margin-bottom:12px;
}
textarea.contents {
  line-height: 1.7em;
}
.button-tools {
  font-size:11pt;
}
</style>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
import markdown from './markdown.vue';
export default {
  data () {
    return {
      edit:true,
      dateLabel:null,
      editContents:"",
      editTitle:"",
      loading:false,
      uploading:false
    }
  },
  watch:{
    document(d){
      this.initialize();
    },
    '$route.params'(){
      this.initialize();
    }
  },
  methods:{
    toggleEdit(){
      this.edit = !this.edit;
      if(!this.edit){
        this.initialize();
      }
    },
    save(title,contents,published){
      const key = this.$route.params.id == 'new' ? null : this.$route.params.id;
      this.$store.dispatch('doc/save',{
        title,
        contents,
        key,
        published:!!published
      }).then((newKey) => {
        this.editContents = this.document.contents;
        this.edit = false;
        if(!key){
          this.$router.push({name:'document-edit',params:{id:newKey}});
        }
      });
    },
    initialize(){
      this.editContents = this.document.contents;
      this.editTitle = this.document.title;
      this.edit = this.$route.params.id == "new";
    },
    publish(){
      this.uploading = true;
      this.$store.dispatch('doc/publish',this.$route.params.id).then(()=>{
        this.uploading = false;
      });
    },
    unpublish(){
      this.uploading = true;
      this.$store.dispatch('doc/unpublish',this.$route.params.id).then(()=>{
        this.uploading = false;
      });
    }
  },
  mounted(){
    if(this.$route.params.id == "new"){
      this.edit = true;
      this.editContents = "";
      this.editTitle = "";
    }else{
      this.loading = true;
      this.edit = false;
      const promise = [];
      promise.push(this.$store.dispatch('doc/load',this.$route.params.id));
      promise.push(this.$store.dispatch('doc/loadIndex',this.$route.params.id));
      Promise.all(promise).then(()=>{
        this.loading = false;
      });
    }
  },
  computed:mapState('doc',{
    document:'document'
  }),
  components:{
    markdown
  },
}
</script>