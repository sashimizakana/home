<template>
  <div v-if="ym">
    <h1 class="huge">
      {{dateLabel}}
    </h1>
    <div class="mini">
      <router-link :to="{params:{date:prevDate}}" class="ui compact primary basic button" >
        <i class="arrow left icon"></i>
        prev
      </router-link>
      <router-link :to="{name:'month-list',params:{ym:ym}}" class="ui compact primary basic button" >
        <i class="arrow up icon"></i>
        month
      </router-link>
      <router-link :to="{params:{date:nextDate}}" class="ui compact primary basic button">
        next
        <i class="arrow right icon"></i>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.huge {
  font-size:35pt;
  margin-bottom:0;
}
</style>

<script>
import moment from 'moment';
export default {
  props:['date'],
  data(){
    return {
      prevDate:null,
      nextDate:null,
      dateLabel:null,
      ym:null
    }
  },
  mounted(){
    this.setDates();
  },
  watch:{
    date(){
      this.setDates();
    }
  },
  methods:{
    setDates(){
      const cursor = moment(this.date);
      this.dateLabel = cursor.format('YYYY年MM月DD日');
      this.ym = cursor.format('YYYY-MM');
      this.prevDate = moment(cursor).subtract(1,'day').format('YYYY-MM-DD');
      this.nextDate = moment(cursor).add(1,'day').format('YYYY-MM-DD');
    }
  }
}
</script>