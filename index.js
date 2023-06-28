const express = require('express');
const cookies = require('cookie-parser');
const port = 8000;
const app = express();
//env 
const env = require('./config/environment')
const logger = require('morgan');

//EXPRESS EJS LAYOUTS
const expressLayout = require('express-ejs-layouts');
//database
const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const googleStrategy = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const path = require('path');
app.use(expressLayout);
app.use(cookies());
//middleware
app.use(express.urlencoded());
//VIEW
app.set('view engine','ejs');
app.set('views','views');

//express session
app.use(session({
    name:'authUser',
    secret:env.secretKey,
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
app.use(flash());
app.use(customMiddleware.setFlash);
//sass
const sassMiddleware = require('node-sass-middleware');

app.use(
  sassMiddleware({
    src : path.join(__dirname,env.assets_path,'scss'),
    dest : path.join(__dirname,env.assets_path,'css'),
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
//logger use
app.use(logger(env.morgan.mode,env.morgan.options));
//router
app.use('/',require('./router'));
app.listen(port , function(err){
    if(err){
        console.log('Server not started');
        return;
    }
    console.log(`server upon port:${port}`);
})