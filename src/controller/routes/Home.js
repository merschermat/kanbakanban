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
            var task = await Task.getByUser(userId)
        } catch (err) {
            console.log(err)
        }
        list.forEach(async (e) => {
            lists.push({
                id: e._id,
                name: e.name,
                task: task.filter(m => m.listId == e._id)
            })
        })
        res.render('home', { list: lists })
        return
    }else {
    res.redirect('/login');
}
})
module.exports = router;