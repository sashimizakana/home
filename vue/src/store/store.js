import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '../lib/initialized-firebase.js'
import note from './modules/note.js';

Vue.use(Vuex);

//rootStateはtop.vue用の全体に通知したりするものを入れとく
const store = new Vuex.Store({
  state:{
    message:{},
    user:null,
  },
  actions:{
    login({commit}){
      firebase.auth().onAuthStateChanged(result => {
        if(result){
          commit('login',result);
          return Promise.resolve(result);
        }
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
      });
    },
    //メッセージ表示
    message({commit},message){
      commit('message',message);
    },
    //エラー
    error({dispatch},text){
      const message = {
        type:"error",
        text:text
      };
      dispatch('message',message);
      setTimeout(()=>{
        dispatch('clear');
      },5000);
    },
    //情報
    info({dispatch},text){
      const message = {
        type:"info",
        text:text
      };
      dispatch('message',message);
      setTimeout(()=>{
        dispatch('clear');
      },2000);
    },
    clear({commit}){
      commit('clear');
    }
  },
  mutations:{
    message(state,message){
      state.message = message;
    },
    clear(state){
      state.message = null;
    },
    login(state,result){
      state.user = result;
    }
  },
  modules:{
    note
  }
});

export default store;