var express = require('express');
var Task = require('../../dao/TaskCtrl')
var router = express.Router();
var controller = require('../../dao/UserCtrl');


router.post('/user'||'/error/user', async (req, res) => {
    try {
        var user = await controller.getByEmail(req.body.email);
    } catch (error) {
        res.redirect('/error')
    }
    if(user){         
        res.redirect('/error/user')
    }else{
        controller.create(req.body, (data) => {
            if (data) {
                res.cookie('login', data._id);
                res.redirect('/');
                return
            }
            else {
                res.redirect('/error')
            }
        })    
    }
});
router.get('/logout', (req, res) => {
    res.clearCookie('login');
    res.redirect('/login');
    return
})
router.post('/login', async (req, res) => {
    
    try {
        var user = await controller.getByEmail(req.body.email)
        var pass = await require('crypto').createHash('sha256').update(req.body.password).digest("hex")

    } catch (error) {
        res.redirect('/error')
    }

    if (user && user.password == pass) {
        res.cookie('login', user._id);
        res.redirect('/');
    }
    else {
        res.render('signup', { messageLogin: 'Usuário ou senha incorretos :(!' });
    }
})
module.exports = router;