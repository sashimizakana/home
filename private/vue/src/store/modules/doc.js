import firebase from '../../lib/initialized-firebase.js';
import _ from 'lodash';
import moment from 'moment';
const db = firebase.database();
const storageRef = firebase.storage().ref();
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
      return new Promise(resolve => {
        documents.child(key).once('value',(snapshots) => {
          commit('load',snapshots.val());
          resolve(snapshots.val());
        });
      })
    },
    loadIndex({commit}){
      return new Promise(resolve => {
        documentIndex.once('value',(snapshots) => {
          commit('loadIndex',snapshots.val());
          resolve(snapshots.val());
        });
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
    },
    publish({dispatch,state},key){
      const file = storageRef.child(`blog/${key}`);
      let contents = JSON.stringify(state.document);
      const type = firebase.storage.StringFormat.RAW;
      const options = {contentType:'application/json'};
      return file.putString(contents,type,options).then(()=>{
        const index = storageRef.child("blog/index.json");
        contents = JSON.stringify(state.index);
        return index.putString(contents,type,options);
      });
    }
  }
};