const express = require('express');
const port = 8000;
const app = express();
//EXPRESS EJS LAYOUTS
const expressLayout = require('express-ejs-layouts');
const cookies = require('cookie-parser');
app.use(cookies());
//middleware
app.use(express.urlencoded());
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
app.use(expressLayout);
//VIEW
app.set('view engine','ejs');
app.set('views','views');

//express session
app.use(session({
    name:'authUser',
    secret:"charnyaMeraJan",
    saveUninitialized:false,
    resave : false,
    cookie : {
      maxAge :(1000*60*100),
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017",
      autoRemove: "disabled",
    }),
  
}))
;
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//sass
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
// Corrected static assets setup
app.use(express.static( 'assets'));
//database
const db = require('./config/mongoose');
//router
app.use('/',require('./router'));
app.listen(port , function(err){
    if(err){
        console.log('Server not started');
        return;
    }
    console.log(`server upon port:${port}`);
})