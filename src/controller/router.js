const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {title:'homepage', users:['amir', 'ghassan']},);
})

router.get('*', (req, res) => {
  res.send('page not found');
})


module.exports = router;
