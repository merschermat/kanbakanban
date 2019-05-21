const express = require('express')
const app = express();
const path = require('path')
var cookieParser = require('cookie-parser');

const port = 3000;

var port = normalizePort(process.env.PORT || '3000');

const data = require('./dao/connection');

data.connectionOpen();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static('.'));
app.use(cookieParser());

app.use(require('./controller/routes/User'));
app.use(require('./controller/routes/List'));
app.use(require('./controller/routes/Task'));
app.use(require('./controller/routes/Home'));
app.get('/login',(req,res)=>{
    res.render('signup')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))