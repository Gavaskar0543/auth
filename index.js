const express = require('express');

const app = express();
app.set('view engine','ejs');
app.set('views','views');
app.use(express.urlencoded());
//db
const db = require('./config/mongoose');
app.get('/', (req, res) => {
return res.render('home',{
  title : 'welcome',
})
});
app.use('/',require('./router'));
app.listen(8000, () => {
  console.log('server started');
});
