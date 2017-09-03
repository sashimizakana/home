<template>
  <div class="note-list">
    <div class="edit-latest">
      <button class="ui basic primary button" @click="editLatest">
        <i class="edit icon"></i>
        Edit latest
      </button>
    </div>

    <div class="note" v-for="d in dates" v-if="notes">
      <h2 class="header" :class="d.class">
        <router-link :class="{empty:!(d.date in notes)}" :to="{name:'edit',params:{date:d.date}}">{{d.label}}</router-link>
      </h2>
      <div v-if="d.date in notes">
        <markdown :source="notes[d.date].note"></markdown>
      </div>
      <div v-else class="empty-container">

      </div>
    </div>
  </div>
</template>

<style scoped>
.note .header {
  margin-bottom:0;
  font-size: 15pt;
  border-bottom:dotted 1px #777;
  margin-top:4em;
}

.note .header a {
  color:#777;
}

.note .header.w0 a{
  color:#f77;
}

.note .header.w6 a{
  color:#77f;
}

.empty {
  opacity: 0.5;
}

.empty-container {
  height: 3em;
}
.edit-latest{
  margin-top:1em;
}
</style>

<script>
import markdown from './markdown.vue';
import moment from 'moment';
export default {
  props:['notes','ym'],
  components:{
    markdown
  },
  methods:{
    editLatest(){
      const notes = _.values(this.notes);
      const latest = _.maxBy(notes,n => n.date);
      let next = false;
      for(const d of this.dates){
        if(next){
          this.$router.push({name:'edit',params:{date:d.date}})
          return;
        }
        console.log(d,latest);
        next = d.date == latest.date;
      }
    }
  },
  computed:{
    dates(){
      const date = moment(this.ym + "-01");
      const month = date.month();
      const dates = [];
      while(date.month() == month){
        dates.push({
          label:date.format('M月DD日(ddd)'),
          date:date.format('YYYY-MM-DD'),
          class:"w" + date.format('d')
        });
        date.add(1,'day');
      }
      return dates;
    }
  }
}
</script>