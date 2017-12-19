const express = require('express');
const aws = require('aws-sdk');
require('env2')('config.env');

const router = express.Router();

const S3_BUCKET = process.env.S3_BUCKET;

router.get('/', (req, res) => {
  res.render('home', {title:'homepage', users:['amir', 'ghassan']},);
})


router.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});


router.get('/:name', (req, res) => {
  const name = req.params.name;
  res.render('profile', {user:name, title:`profile of ${name}`})
})



router.get('*', (req, res) => {
  console.log(req.url);
  res.send('page not found');
})


module.exports = router;
