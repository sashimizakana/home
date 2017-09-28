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
    document:{title:"",contents:"",isNew:true,published:false},
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
      state.index = _.orderBy(state.index,i => i.modifiedAt).reverse();
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
      const params = {title:data.title,contents:data.contents,published:data.published};
      const promise = data.key ? documents.child(data.key).set(params) : documents.push(params);
      let key;
      return promise.then((snapshot)=>{
        key = data.key || snapshot.key;
        commit('save',params);
        return dispatch('saveIndex',{key,title:data.title,published:data.published})
      }).then(()=>{
        return key;
      });
    },
    saveIndex({dispatch},information){
      information.modifiedAt = firebase.database.ServerValue.TIMESTAMP;
      return documentIndex.child(information.key).set(information).then(() => {
        return dispatch('loadIndex');
      });
    },
    publish({commit,dispatch,state},key){
      return dispatch('save',{
        key,
        title:state.document.title,
        contents:state.document.contents,
        published:true
      }).then(()=>{
        return dispatch('writeFile',key);
      });
    },
    unpublish({commit,dispatch,state},key){
      return dispatch('save',{
        key,
        title:state.document.title,
        contents:state.document.contents,
        published:false
      }).then(()=>{
        return dispatch('writeFile',key);
      });
    },
    writeFile({dispatch,state},key){
      const file = storageRef.child(`blog/${key}`);
      let contents = JSON.stringify(state.document);
      const type = firebase.storage.StringFormat.RAW;
      const options = {contentType:'application/json'};
      return file.putString(contents,type,options).then(()=>{
        const index = storageRef.child("blog/index.json");
        contents = JSON.stringify(_.filter(state.index,'published'));
        console.log(_.filter(state.index,'published'));
        return index.putString(contents,type,options);
      });
    }
  }
};