const mongoose = require('mongoose')
const uri = 'mongodb+srv://master:master_kanban@kanban-8fgdw.mongodb.net/test?retryWrites=true'


function connectionOpen() {
    mongoose.connect(uri, { useNewUrlParser: true });
}
function connectionClose(){
    mongoose.connection.close()
}

module.exports = {
    connectionOpen,
    connectionClose
}