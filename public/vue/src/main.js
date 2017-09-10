import Vue from 'vue'
import App from './App.vue'
import router from './router.js';
import VueAnalytics from 'vue-analytics'
import config from './config/ga-config.js';

Vue.use(VueAnalytics,{
  id:config.id
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
