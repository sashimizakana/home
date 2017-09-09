import firebase from '../../lib/initialized-firebase.js';
import _ from 'lodash';
import moment from 'moment';
const db = firebase.database();
const documents = db.ref('documents');
const documentIndex = db.ref('documentIndex');

export default {
  namespaced:true,
  state:{
    document:{title:"",contents:"",isNew:true},
    index:[]
  },
  mutations:{
    load(state,data){
      state.document = data;
    },
    cursor(state,ym){
      state.ym = ym;
    },
    save(state,document){
      state.document = document;
    },
    loadIndex(state,index){
      state.index = _.map(index,i => i);
    }
  },
  actions:{
    load({commit},key){
      return documents.child(key).once('value',(snapshots) => {
        return commit('load',snapshots.val());
      });
    },
    loadIndex({commit}){
      documentIndex.once('value',(snapshots) => {
        commit('loadIndex',snapshots.val());
      });
    },
    save({commit,dispatch},data){
      const params = {title:data.title,contents:data.contents};
      const promise = data.key ? documents.child(data.key).set(params) : documents.push(params);
      return promise.then((snapshot)=>{
        const key = data.key || snapshot.key;
        commit('save',params);
        dispatch('saveIndex',{key,title:data.title})
        return key;
      });
    },
    saveIndex({dispatch},information){
      information.modifiedAt = firebase.database.ServerValue.TIMESTAMP;
      return documentIndex.child(information.key).set(information).then(() => {
        dispatch('loadIndex');
      });
    }
  }
};