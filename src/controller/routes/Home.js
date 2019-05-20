var express = require('express');
var Task = require('../../dao/TaskCtrl')
var List = require('../../dao/ListCtrl')

var router = express.Router();
var controller = require('../../dao/UserCtrl');
const crypto = require('crypto');
var hash = crypto.createHash('sha256');

router.get('/', async (req, res) => {
    let userId = req.cookies.login
    var lists = [];

    if (req.cookies && req.cookies.login) {
        try {
            var list = await List.getByUser(userId);
        } catch (err) {
            console.log(err)
        }
        //spliting the tasks to the lists
        var aux = new Promise((resolve, reject) => {
            list.forEach(async(e, index) => {
                try {
                    var task = await Task.getByList(e._id)
                } catch (err) {
                    console.log(err)
                }
                lists.push({
                    id: e._id,
                    name: e.name,
                    task: task
                })
                if(index == list.length -1)
                    resolve()
            })
        })
        aux.then(()=>{
            console.log(lists);
            res.render('home', { list: lists })
            return        
        })
    }else{
        res.redirect('/login');
    }
})
module.exports = router;