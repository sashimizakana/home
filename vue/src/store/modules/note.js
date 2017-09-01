import firebase from '../../lib/initialized-firebase.js';
import _ from 'lodash';
import moment from 'moment';
const db = firebase.database();
const ref = db.ref('notes');
const notes = ref.orderByKey();


export default {
  namespaced:true,
  state:{
    notes:{},
    cursor:null
  },
  mutations:{
    load(state,data){
      state.notes = data || {};
    },
    cursor(state,ym){
      state.ym = ym;
    },
    save(state,data){
      state.notes[data.date] = data;
    }
  },
  actions:{
    load({commit},ym){
      commit('cursor',ym);
      const end = moment(ym + "-01").endOf('month').format('YYYY-MM-DD');
      notes.startAt(ym).endAt(end).once('value',(snapshots) => {
        commit('load',snapshots.val());
      });
    },
    save({commit},data){
      return db.ref('notes/' + data.date).set(data).then(()=>{
        commit('save',data);
      });
    }
  }
};