import Vue from 'vue'
import App from './App.vue'
import router from './router.js';
import store from './store/store.js';

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
