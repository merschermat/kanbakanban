const express = require('express')
const app = express();
const port = 3000;
const data = require('./dal/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

data.connectionOpen();

app.use(require('./controller/routes/User'));
app.use(require('./controller/routes/Panel'));
app.use(require('./controller/routes/List'));
app.use(require('./controller/routes/Task'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))