const axios = require('axios');
const config = require('./config/storage-config.js');

module.exports = {
  css:[
    "semantic-ui-css/semantic.min.css"
  ],
  build:{
    vendor:['moment','axios']
  },
  generate:{
    routes(){
      const url = `${config.domain}/o/blog%2Findex.json?alt=media`;
      return axios.get(url).then(d => {
        return d.data.map(doc => doc.key);
      });        
    }
  }
}