import Vue from 'vue'
import App from './App.vue'
import router from './router.js';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics,{
  id:"UA-38415195-4"
});

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
