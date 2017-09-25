import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './components/index.vue'
import Document from './components/document.vue'
import moment from 'moment';

Vue.use(VueRouter);

const routes = [
  {
    path:'',
    name:'index',
    component:Index,
  },
  {
    path:'/:id',
    name:'document',
    component:Document,
  },
];

const router =  new VueRouter({
  mode:'history',
  routes
});

export default router;