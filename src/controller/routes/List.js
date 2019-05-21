var express = require('express');
var router = express.Router();
var controller = require('../../dao/ListCtrl');


router.post('/list', (req, res) => {
    let obj = req.body;
    let list = controller.create(obj, req.cookies.login, (data)=>{
        if (data) {
            res.redirect('back');
            return
        };
        res.redirect('/error')
    })});

module.exports = router;