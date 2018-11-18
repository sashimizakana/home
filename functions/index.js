const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const bucket = gcs.bucket(functions.config().firebase.storageBucket);
exports.helloWorld = functions.https.onRequest((req,res) => {
  bucket.file("blog/index.json").download().then(function(data) {
    res.send(data[0]);
  });
});