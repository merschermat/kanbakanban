const express = require('express')
const app = express();
const path = require('path')
var cookieParser = require('cookie-parser');
const data = require('./src/dao/connection');

data.connectionOpen();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static('.'));
app.use(cookieParser());

app.use(require('./src/controller/routes/User'));
app.use(require('./src/controller/routes/List'));
app.use(require('./src/controller/routes/Task'));
app.use(require('./src/controller/routes/Home'));
app.get('/login',(req,res)=>{
    res.render('signup')
})


app.listen(process.env.PORT || '4000',() => console.log(`Example app listening on port ${port}!`))