const s3 = require('s3');
const path = require('path');
const config = require('./aws.config.js');
const client = s3.createClient({
  s3Options: config.api
});
const params = {
  localDir: path.resolve(__dirname,"private","static"),
  deleteRemoved: true,
  s3Params: {
    Bucket: config.bucketName,
  },
};
const uploader = client.uploadDir(params);
uploader.on('error', function(err) {
  console.error("error",err);
});
uploader.on('progress', function() {
  console.log("progress", uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', function() {
  console.log("done");
});