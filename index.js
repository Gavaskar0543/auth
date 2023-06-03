const express = require('express');

const app = express();
app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded());
//layout
const expresLayouts = require('express-ejs-layouts');
app.use(expresLayouts);

const sassMiddleware = require('node-sass-middleware');

app.use(
  sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
  })
)

app.set("layout extractStyles", true)

//extract script 
app.set("layout extractScripts", true)
//db
const db = require('./config/mongoose');
//static webpage
const path = require('path');

// Corrected static assets setup
app.use(express.static( 'assets'));
//sass


app.use('/',require('./router'));
app.listen(8000, () => {
  console.log('server started');
});
