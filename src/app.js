const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const controller = require('./controller/router.js')
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'main',
  })
)







app.use(controller);
app.set('port', process.env.PORT || 3000);
module.exports = app;
