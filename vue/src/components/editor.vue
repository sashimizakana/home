<template>
  <div>
    <div class="day-selector">
      <day-selector :date="$route.params.date"></day-selector>
    </div>

    <div class="editor-main">
      <div class="edit-tools" v-if="!edit">
        <a @click="toggleEdit()" href="javascript:void(0)">
          <i class="edit icon"></i>
        </a>
      </div>

      <div class="ui form" v-if="edit">
        <div class="field">
          <textarea v-model="editNote" class="contents" rows="30"></textarea>
        </div>
      </div>

      <div v-if="!edit">
        <markdown :source="editNote"></markdown>
      </div>
    </div>

    <div v-if="edit" class="save-tools">
      <button class="ui basic primary button" @click="save(editNote)">
        <i class="save icon"></i>
        save
      </button>
      <button class="ui basic secondary button" @click="toggleEdit()">
          <i class="remove icon"></i>
          cancel
      </button>
    </div>

  </div>
</template>

<style scoped>
.day-selector {
  margin-bottom:2em;
}
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
</style>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
import markdown from './markdown.vue';
import daySelector from './day-selector.vue';
export default {
  data () {
    const note = this.getNote();
    return {
      edit:!note,
      dateLabel:null,
      editNote:note
    }
  },
  watch:{
    notes(notes){
      this.initialize();
    },
    '$route.params'(params){
      this.initialize();
    }
  },
  methods:{
    toggleEdit(){
      this.edit = !this.edit;
      if(!this.edit){
        this.editNote = this.getNote();
      }
    },
    save(note){
      this.$store.dispatch('note/save',{
        note,
        date:this.$route.params.date
      }).then(() => {
        this.editNote = this.getNote();
        this.edit = false;
      });
    },
    getNote(){
      const d = this.$route.params.date;
      const note = this.$store.state.note.notes[d];
      return note ? note.note : "";
    },
    initialize(){
      this.editNote = this.getNote();
      this.edit = !this.editNote;
    }
  },
  mounted(){
    const d = moment(this.$route.params.date);
    const ym = d.format('YYYY-MM');
    this.dateLabel = d.format('YYYY年MM月DD日');

    if(this.$store.state.note.cursor != ym){
      this.$store.dispatch('note/load',ym);
    }
  },
  computed:mapState('note',{
    notes:'notes',
  }),
  components:{
    markdown,
    daySelector
  },
}
</script>