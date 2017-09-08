import Vue from 'vue';
import VueRouter from 'vue-router';
import Top from './components/top.vue';
import Editor from './components/editor.vue';
import Month from './components/month.vue';
import DocumentIndex from './components/document-index.vue'
import DocumentEdit from './components/document-edit.vue'
import moment from 'moment';

Vue.use(VueRouter);

const routes = [
  {//トップページ（共通ルート）
    path:'',
    name:'top',
    component:Top,
    redirect:'month/' + moment().startOf('month').format('YYYY-MM'),
    children:[
      {
        name:"month-list",
        path:'month/:ym',
        component:Month
      },
      {
        name:"edit",
        path:'edit/:date',
        component:Editor
      },
      {
        name:'document-index',
        path:"doc",
        component:DocumentIndex
      },
      {
        name:'document-edit',
        path:"doc-edit/:id",
        component:DocumentEdit
      },
    ]
  },
];

const router =  new VueRouter({
  routes
});

export default router;