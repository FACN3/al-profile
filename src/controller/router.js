const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {title:'homepage', users:['amir', 'ghassan']},);
})

router.get('/:name', (req, res) => {
  const name = req.params.name;
  res.render('profile', {user:name, title:`profile of ${name}`})
})

router.get('*', (req, res) => {
  res.send('page not found');
})


module.exports = router;
