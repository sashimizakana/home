<template>
  <div class="menu-container">
    <div class="menu">
      <div class="menu-item">
        <router-link :to="{name:'month-list',params:{ym:ym}}">
          <i class="calendar icon"></i>
          日記
        </router-link>
      </div>

      <div class="menu-item">
        <router-link :to="{name:'document-index'}">
          <i class="book icon"></i>
          文章
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container
{
  text-align: center;
  font-size: 100pt;
  line-height: 2em;
}
.menu {
  margin-top:calc(50vh - 2em);
}
</style>

<script>
import moment from 'moment';
export default {
  data(){
    return {
      ym:moment().format('YYYY-MM')
    }
  }
}
</script>