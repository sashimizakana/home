<template>
  <div v-if="currentLabel">
    <h1 class="huge">{{currentLabel}}</h1>
    <div class="mini">
      <router-link :to="{params:{ym:prevMonth}}" class="ui compact primary basic button" >
        <i class="arrow left icon"></i>
        prev
      </router-link>
      <router-link :to="{params:{ym:nextMonth}}" class="ui compact primary basic button">
          next
          <i class="arrow right icon"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.huge {
  font-size:40pt;
  margin-bottom:0;
}
</style>

<script>
import moment from 'moment';
export default {
  props:['date'],
  data(){
    return {
      currentLabel:null,
      prevMonth:null,
      nextMonth:null
    }
  },
  watch:{
    date(){
      this.update(this.date);
    }
  },
  mounted(){
    this.update(this.date);
  },
  methods:{
    update(date){
      const d = moment(date + "-01");
      this.currentLabel = d.format('YYYY年MM月');
      this.prevMonth = moment(d).subtract(1,'month').format('YYYY-MM');
      this.nextMonth = moment(d).add(1,'month').format('YYYY-MM');
    }
  }
}
</script>

<style>

</style>